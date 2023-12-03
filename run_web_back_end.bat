@echo off
cd .\web_backend\

if not exist "venv" (
    python -m venv venv
)

call venv\Scripts\activate
python -m pip install -r requirements.txt
python main.py
call venv\Scripts\deactivate
cd ..