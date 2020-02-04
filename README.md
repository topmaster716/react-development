# React-development
* open terminal
* Ensure you have NPM installed by entering the line below in a terminal
	> npm -v
* Don't have NPM?
    > Download and Install : https://nodejs.org/en/download 
* Don't have React App ? (after NPM install)
	sudo npm install -g create-react-app
* for create new Project 
 	create-react-app PROJECT_NAME

# Run
* install dependencies 
    npm install
* Take Api Url and set it in to config/constants.js file in API_URL variable
* npm run start

# Deployment 
* Install pm2 
    npm install -g pm2
* Install Static Server 
    npm install -g serve
* Create app.config.json file and put below code
    {
    apps : [
        {
        name      : "To-do",
        script    : "serve -s build -l 6001",
        interpreter: "none",
        args: ""
        }
    ]
    }
* execute below code to current 
    pm2 start app.config.json