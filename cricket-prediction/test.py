from ultralytics import YOLO
import cv2

model = YOLO('./model/best.pt')

print(model.names)