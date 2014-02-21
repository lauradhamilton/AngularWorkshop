echo off

rem Install node dependencies locally
call npm install

rem Bootstrap the database if it doesn't exist
if not exist node_modules/workshop-server/data/restaurants.db (
    call reset.bat
)

rem startup the node server
call node node_modules/workshop-server/main --port 9000 --webappdir ./webapp

rem startup the node server in secure mode
rem call node node_modules/workshop-server/main --port 9000 -s --webappdir ./webapp
