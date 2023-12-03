@echo off
start cmd /k call run_data_producer_app.bat
start cmd /k call run_data_persistence_app.bat
start cmd /k call run_web_back_end.bat
start cmd /k call run_web_front_end.batt
