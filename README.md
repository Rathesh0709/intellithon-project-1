# Intellithon — Sports Analytics Suite

A combined collection of computer-vision and machine-learning sports projects,
grouped into one repository for the Intellithon project.

> **Provenance note:** This repository mixes **original work** with **third-party
> reference projects**. Every third-party folder contains a `CREDITS.md` naming the
> original author, source repo, and license. Please respect those attributions.

## Original work (by Rathesh0709)

| Folder | Description |
|--------|-------------|
| `football-analysis/`  | Football match video analysis (player/ball tracking, team assignment, speed & distance). |
| `basketball-injury/`  | Flask app predicting NBA player injury risk from a trained Keras model (`injury_keras_nba_best.h5`). |
| `football-injury/`    | Flask app predicting football player injury risk from a trained Keras model (`injury_model_best.h5`). |

## Third-party reference projects (see each folder's `CREDITS.md`)

| Folder | Original author | Source | License |
|--------|-----------------|--------|---------|
| `football-tracking/`   | abdullahtarek | [football_analysis](https://github.com/abdullahtarek/football_analysis) | none stated |
| `basketball-tracking/` | abdullahtarek | [basketball_analysis](https://github.com/abdullahtarek/basketball_analysis) | none stated |
| `cricket-prediction/`  | Ali Hassan    | [Cricket-Prediction-Yolov8](https://github.com/alihassanml/Cricket-Prediction-Yolov8) | MIT |
| `smartcoach/`          | Kira182005     | [smartcoach](https://github.com/Kira182005/smartcoach) | none stated |

## Excluded assets

To stay within GitHub's 100 MB file limit, large model weights (`*.pt`), datasets,
sample/output videos, cached `*.pkl` stubs, and `node_modules/` are **not** committed.
Each folder's `CREDITS.md` / `put_models_here.txt` explains where to download them.

## Setup

Each subfolder is self-contained — `cd` into it and follow its own `README.md`.
Python projects: `pip install -r requirements.txt`. Node projects: `npm install`.
