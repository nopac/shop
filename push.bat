@echo off
echo "start push"
:push
for /F %%i in ('git push') do ( set result=%%i)
echo result=%result%
if /i "%result%"=="Already" goto finish2
else /i "%result%"=="fatal:" goto push
:finish2
echo "push finish"