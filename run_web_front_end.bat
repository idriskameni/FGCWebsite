@echo off
cd .\web_frontend\

if not exist "node_modules" (
    npm install
)

npm start

cd ..
