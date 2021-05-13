# ExpressJS server boilerplate

<img src="https://buttercms.com/static/images/tech_banners/webp/ExpressJS.b7bdb4190ea4.webp" alt="ExpressJS" width="500"/>

<hr>

ExpressJS backend boilerplate including:
- **Views Template**: Handlebars
- **CSS Engine**: SCSS - Node-sass-middleware
- **ODM**: Mongoose
- **UI Framework**: Bootstrap 


Prepopulated with Express middlewares:
- **Logger**: morgan
- **HTTP POST Params**: body-parser
- **Cookies**: cookie-parser

Facilities:
- Gitignore file
- Seeds file
- Error handling

## Directory structure

````

express-generator/
├── app.js
├── package.json
├── .gitignoe
├── routes
│   │── index.js
│   └── base.routes.js
├── models
│   └── user.model.js
├── utils
│   └── index.js
├── middlewares
│   └── index.js
├── views
│   │── layout.hbs
│   │── errors
│   │   │── not-found.hbs
│   │   └── server-error.hbs
│   │── pages
│   │   └── index.hbs
│   └── partials
├── public
│   ├── img
│   ├── js
│   │   └── script.js
│   └── css
│       └── styles.sass
├── config
│   │── db.config.js
│   │── debug.config.js
│   │── hbs.config.js
│   │── locals.config.js
│   │── middleware.config.js
│   │── sass.config.js
│   └── views.config.js
└── bin
    ├── seeds.js
    └── www

````

## Install

- Run `npm i` on the root directory

## Run

- Create a `.env` file on the root directory to link the MongoDB URI (`MONGODB_URI`) and port (`PORT`)
- Run `npm run dev` command on the root directory


### Auth Routes
|HTTP Method| URL Path  |Description|   JSON    |
|-----------|-----------|-----------|-----------|
|POST|auth/signup|Will create a new user (username, password, name) in the ddbb|The new user's data for login|
|POST|auth/login |Will check if inputted data matches and if it does, opens a new user session.|The user's data.|
|POST|auth/logout|Executes the closure of the user session both in the front and backends|Success message|
|GET|auth/isUser|Checks wether the user is a Citizen User or an Admin User|Confirmation of role|
|GET|auth/isAgent|Checks mainly during sign in wether the user signing in is a user(citizen, admin) or an Agent|Confirmation|

### Planner/Citizen only Routes
|HTTP Method| URL Path  |Description|   JSON    |
|-----------|-----------|-----------|-----------|
|POST|planner/:userId/nameChange|Changes the user's name|The user's updated data|
|POST|planner/:userId/addFriend|Add a new friend|The user's updated data|
|POST|planner/:userId/removeFriend|Remove a friend|The user's updated data|
|POST|planner/:userId/addPlan|Create a new ddbb planBlock object (who, what, where) and store it in the 'who' users' ddbb object(s)|The user's updated data|
|GET|planner/:planBlockId/delete|Delete the planBlock object specified|Succes message|

### Admin only Routes
|HTTP Method| URL Path  |Description|   JSON    |
|-----------|-----------|-----------|-----------|
|POST|planner/newAgent|Creates a new Agent object in the ddbb (codename, codeword)|The admin's updated data|
|POST|planner/newMission|Creates a new Mission object in the ddbb (targets, metthod, isCompleted: false, status: 'unassigned')|The admin's updated data|
|GET|planner/assign?miss=:missionId&to=:agentId|Assigns a created mission to a created agent mission=>(status: 'pending'|The admin's updated data|
|GET|planner/:missionId?status=:choice|Approves or rejects the agent's posted mission and changes the mission object's status to 'approved' or 'rejected'. If approved, a medal is added to the agent's medal count. If rejected, the agent is asked to make a different plan.|The admin's updated data|

### Agent only routes
|HTTP Method| URL Path  |Description|   JSON    |
|-----------|-----------|-----------|-----------|
|POST|agent/login|When signing a normal user in, it checks if codeword already exists and is of an agent, if it does, it signs the agent in|The agent's data|
|POST|agent/mission/addPlan|Create a new ddbb missionPlanBlock object (who, what, where) and store it in the agent's ddbb object (from, with, how, where)|The agent's updated data|
|GET|agent/mission/post|Sends the mission to the director and awaits approval or rejection of it, updates the mission object| The agent's updated data|
