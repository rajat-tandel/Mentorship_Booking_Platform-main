<h1><strong>How To Run :-</strong></h1>
<h2><strong>Backend</strong></h2>
<div>Step 1 :- Before setting backend first you have to set the Database.To do so first make sure you have downloaded Mysql for database.To download follow this link <strong>https://dev.mysql.com/downloads/installer/</strong> </div>
<div>Step 2 :- Open Mysql command line client and put your Mysql password . After that create a database name workcohol using command <strong>( CREATE DATABASE workcohol; )</strong> .</div>
<div>Step 3 :- Now download <strong>auth_backend</strong> and open it with visual code.</div>
<div>Step 4 :- Inside the <strong>auth_backend</strong> folder there will be another <strong>auth_backend</strong> folder and inside it you will find the settings.py . Inside the settings.py search <strong># Database settings</strong> and in User section replace root with your mysql username . To check username of mysql run this command in your mysql <strong>( SELECT USER(); )</strong> you will see username@localhost and put only username in the settings but don't include localhost in the username and in password section replace your_password with your mysql password. </div>
<div>Step 5 :- Once password is changed open terminal in visual studio by selecting terminal at the top of the visual studio or by pressing (ctrl + shift + ~) buttons together. </div>
<div>Step 6 :- Run this command <strong>( python -m venv venv )</strong> in the terminal to create virtual enviroment. And to run virtual enviroment run this command <strong>( .\venv\scripts\activate )</strong> in the terminal. To run the backend you should always run backend in virtual enviroment.</div>
<div>Step 7 :- Then to download packages run this command <strong>( pip install -r requirements.txt )</strong> in the terminal.</div>
<div>Step 8 :- Then to create tables write command <strong>( python manage.py makemigrations )</strong> first in the terminal and after that write this command <strong>( python manage.py migrate )</strong> .</div>
<div>Step 9 :- Now you are set to go . To run the backend type this command in the terminal <strong>( python manage.py runserver )</strong> but make sure before running this command in the terminal the virtual enviroment should be enabled . If you dont know how to enable the virtual enviroment check step 6 .</div>
<div>Step 10 :- Once the code runs you will see these command<strong><div>Watching for file changes with StatReloader</div>
<div>Performing system checks...</div>

<div>System check identified no issues (0 silenced).</div>
<div>Date - Time</div>
<div>Django version 5.1.7, using settings 'auth_backend.settings'</div>
<div>Starting development server at http://127.0.0.1:8000/</div>
<div>Quit the server with CTRL-BREAK.</strong> </div>
<div>in the terminal. If this shows then your backend is set properly else you have to do all the steps again from the start.</div></div>
<br>
<br>
<h2><strong>Frontend</strong></h2>
<div>Step 1 :- Download <strong>My-app</strong>.</div>
<div>Step 2 :- Make sure you have Visual Studio and Nodejs.</div>
<div>Step 3 :- Open my-app using visual code and then open terminal in visual studio by selecting terminal at the top of the visual studio or by pressing (ctrl + shift + ~) buttons together.</div>
<div>Step 4 :- Inside the terminal write this command <strong>( npm install )</strong> to download packages. If any error occurs write this command <strong>( npm install --force )</strong> inplace of  npm install. </div>
<div>Step 5 :- After downloading packages type <strong>( npm start )</strong> to run the frontend.</div>
 
