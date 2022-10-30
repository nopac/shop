@echo off
echo "pull start"
:pull
for /F %%i in ('git pull') do ( set result=%%i)
echo %result%
if /i "%result%"=="Already" goto finish
if /i "%result%"=="fatal:" goto pull
:finish
echo pull finish