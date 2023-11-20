# AcentosPage Web Application 👓📚

Welcome to the **AcentosPage** project! 🚀📖

## Purpose 🎯

Ever wanted to explore the fantastic world of books at EAFIT University's Acentos Library? 📚 But wait, there's no online platform to make your book-hunting easier! 😩 Fret not! We're here to save the day with a brilliant web application. 🌐💻 With **AcentosPage**, you can dive into the treasure trove of discounted books and materials, browse, buy, and have them delivered right to your doorstep! 🚚📦

## Scope 📋

Say goodbye to the old ways of searching for books! 😎📖 **AcentosPage** is your virtual bookshop companion. Students, professors, and book enthusiasts alike, this app is tailored just for you! Explore categories spanning music 🎵, art 🎨, technology 💻, and more. Create an account, add books to your cart 🛒, choose pickup or delivery, and experience a seamless shopping journey. Not only does it make your life easier, but it also helps admins manage inventory like a pro! 📈📊

For all the nitty-gritty details, usability magic, and performance goals, take a peek at our repository's full documentation. Get ready to embark on a delightful book-shopping adventure with **AcentosPage**! 📚🛍️🌟

## How ot use it 🤷‍♂️

1. Check if your computer has a version of Python greater than or equal to 3.6. This is accomplished by typing in Terminal: python --version. If not, you can download and install Python from https://www.python.org/.

2.  Install Node.js: Installation 'https://nodejs.org/en'

3.	Verify that pip (a tool to install, reinstall, and uninstall Python packages) is installed. This is accomplished by typing in Terminal: "pip".

4.	Install Django, by running in the terminal: "pip install django".

5.	Verify that Django was installed correctly by running in Terminal: "python -m django".

6.  Clone the project that is in github https://github.com/Manuel220104/Integrative-Project-1.

7.  Access the project folder you just cloned, where you should run the following commands in order:
    -   Run command "pip install -r requirements.txt" (This command will install all the dependencies needed by the backend of the project).
    -   Use the "cd frontend" command to navigate to the frontend folder.
    -   Inside the frontend folder execute the command: "npm install" (This command will install all the dependencies that the frontend of the project needs).
    -   Use the "cd .." command to exit the frontend folder.
    -   Use the "cd Backend" command to navigate to the Backend folder.
    -   Run inside the backend folder using the "python manage.py runserver" command.
    -   Open another terminal and navigate to the frontend folder with the "cd frontend" command.
    -   Run inside the frontend folder with the "npm run dev" command.
    -   You must enter the address "http://localhost:3000/" where you can view the project.

## How to launch the application on a server🖥️

### Server Configuration 

1. Install Basic Dependencies:

    -    Install Git: sudo apt-get install git
    -    Install Docker: Docker Installation 'https://docs.docker.com/get-docker/'
    -    Install Node.js: Node.js Installation 'https://nodejs.org/en'
    -    Install Django: pip install django
    
2. Clone the Repository 'git clone https://github.com/Manuel220104/Integrative-Project-1'

### Backend Configuration
1. Install Backend Dependecies:
    -    cd Integrative-Project-1\Backend
    -    pip install -r requirements.txt
2. Creat and activate the virtual enviroment
    -    python3 -m venv nombre_del_entorno
    -    nombre_del_entorno\Scripts\activate

4. Run the Backend:
    -   python manage.py makemigrations
    -   python manage.py migrate  (Apply database migrations)
    -   python manage.py runserver  (Start the Django server)

### Frontend Configuration

1. Install frontend Dependencies:
    -    cd Integrative-Project-1\front
    -    npm install

2. Build and Run the frontend Container:
    -    sudo docker build -t front .
    -    sudo docker run -d -p 4000:3000 front
   
## Web Server Configuration (nginx)

1. Nginx
    -    Install Nginx
    -    Configurate Nginx
           Like this:
         
                       events{
                            }
                        http {
                            # Configuration specific to HTTP and affecting all virtual servers
                        
                            server {
                            listen 3000;
                            listen [::]:3000;
                            # server_name ${host};
                            location / {
                                proxy_pass http://192.168.10.78:4000/;
                           }
                        }
                        }
                            
                        
                        
                        
                         
                           
