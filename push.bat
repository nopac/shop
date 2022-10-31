@echo off
echo "start push"
:push
for /F %%i in ('git push') do ( set result=%%i)
echo result=%result%
if /i "%result%"=="Everything" goto finish2
goto push
:finish2
echo "push finish"