import os
import numpy as np
import cv2
from utils import read_video, save_video
from trackers import Tracker
from team_assigner import TeamAssigner
from player_ball_assigner import PlayerBallAssigner
from camera_movement_estimator import CameraMovementEstimator
from view_transformer import ViewTransformer
from speed_and_distance_estimator import SpeedAndDistance_Estimator


def main(input_video_path, output_video_path='output_videos/output_video.avi'):
    """
    Main function to process a football match video.

    Args:
        input_video_path (str): Path to the input video file.
        output_video_path (str): Path to save the processed output video.

    Returns:
        str: Path to the saved output video.
    """

    # --- Step 1: Read video ---
    print(f"[INFO] Reading video from: {input_video_path}")
    video_frames = read_video(input_video_path)
    if len(video_frames) == 0:
        raise ValueError("No frames found in the input video!")

    # --- Step 2: Initialize YOLO Tracker ---
    print("[INFO] Initializing tracker and loading model weights...")
    tracker = Tracker(
        r"C:\Users\Rathesh\Downloads\Compressed\football-players-detection.v1i.yolov11\runs\detect\train2\weights\best.pt"
    )

    print("[INFO] Generating object tracks...")
    tracks = tracker.get_object_tracks(
        video_frames,
        read_from_stub=True,
        stub_path="stubs/track_stubs.pkl"
    )

    # --- Step 3: Add object positions ---
    tracker.add_position_to_tracks(tracks)

    # --- Step 4: Estimate camera movement ---
    print("[INFO] Estimating camera movement...")
    camera_movement_estimator = CameraMovementEstimator(video_frames[0])
    camera_movement_per_frame = camera_movement_estimator.get_camera_movement(
        video_frames,
        read_from_stub=True,
        stub_path="stubs/camera_movement_stub.pkl"
    )
    camera_movement_estimator.add_adjust_positions_to_tracks(
        tracks, camera_movement_per_frame
    )

    # --- Step 5: Apply view transformation ---
    print("[INFO] Applying view transformation...")
    view_transformer = ViewTransformer()
    view_transformer.add_transformed_position_to_tracks(tracks)

    # --- Step 6: Interpolate ball positions ---
    print("[INFO] Interpolating ball positions...")
    tracks["ball"] = tracker.interpolate_ball_positions(tracks["ball"])

    # --- Step 7: Estimate player speed and distance ---
    print("[INFO] Calculating speed and distance...")
    speed_and_distance_estimator = SpeedAndDistance_Estimator()
    speed_and_distance_estimator.add_speed_and_distance_to_tracks(tracks)

    # --- Step 8: Assign player teams ---
    print("[INFO] Assigning player teams...")
    team_assigner = TeamAssigner()
    team_assigner.assign_team_color(video_frames[0], tracks["players"][0])

    for frame_num, player_track in enumerate(tracks["players"]):
        for player_id, track in player_track.items():
            team = team_assigner.get_player_team(
                video_frames[frame_num], track["bbox"], player_id
            )
            tracks["players"][frame_num][player_id]["team"] = team
            tracks["players"][frame_num][player_id]["team_color"] = team_assigner.team_colors[team]

    # --- Step 9: Assign ball possession ---
    print("[INFO] Assigning ball possession...")
    player_assigner = PlayerBallAssigner()
    team_ball_control = []

    for frame_num, player_track in enumerate(tracks["players"]):
        ball_bbox = tracks["ball"][frame_num][1]["bbox"]
        assigned_player = player_assigner.assign_ball_to_player(player_track, ball_bbox)

        if assigned_player != -1:
            tracks["players"][frame_num][assigned_player]["has_ball"] = True
            team_ball_control.append(tracks["players"][frame_num][assigned_player]["team"])
        else:
            team_ball_control.append(team_ball_control[-1] if team_ball_control else None)

    team_ball_control = np.array(team_ball_control)

    # --- Step 10: Draw annotations ---
    print("[INFO] Drawing annotations and statistics...")
    output_video_frames = tracker.draw_annotations(video_frames, tracks, team_ball_control)

    # Draw camera movement
    output_video_frames = camera_movement_estimator.draw_camera_movement(
        output_video_frames, camera_movement_per_frame
    )

    # Draw speed and distance labels
    speed_and_distance_estimator.draw_speed_and_distance(output_video_frames, tracks)

    # --- Step 11: Save processed video ---
    os.makedirs(os.path.dirname(output_video_path), exist_ok=True)
    save_video(output_video_frames, output_video_path)

    print(f"[INFO] Video processing complete! Saved to: {output_video_path}")
    return output_video_path


# --- Run as script ---
#if __name__ == "__main__":
#   input_path = r"C:\Users\Rathesh\Downloads\Video\08fd33_4.mp4"
#  output_path = "output_videos/output_video.avi"
#   main(input_path, output_path)