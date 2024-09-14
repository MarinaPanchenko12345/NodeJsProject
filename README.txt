Backend for NodeJsProject

***Description***
NodeJsProject is a server-side application built with Node.js using Express.js and MongoDB/MongoDB Atlas for managing user and card data. The project implements user authentication, cards and users management,and uses JWT to secure routes and perform authorization.


***Technology Stack***
    Node.js – A server platform for executing JavaScript code.
    Express.js – A minimalist framework for building server-side applications.
    MongoDB and Mongoose – A NoSQL database and an ODM for working with MongoDB.
    JWT (JSON Web Tokens) – Used for user authentication and authorization.
    Passport.js – For authentication via Google OAuth.
    bcrypt – For hashing passwords.
    Morgan – For logging HTTP requests.
    Dotenv – For managing environment variables.
    CORS – For handling cross-origin requests.
    Country-list – For working with country lists.
    Express-session – For managing user sessions.
    FS (File System) – A module for working with the file system.
    Joi – For data validation.
    JWT-decode – For decoding JWT tokens.
    Moment.js – For working with dates and times.
    Chalk – For coloring console messages.

***Installation***
Follow these steps to set up and run the project:
1. **Clone the repository:**
      Create a folder and open the terminal ,use Git to clone the repository to your local machine: git clone https://github.com/MarinaPanchenko12345/NodeJsProject
     
      Alternatively, you can download the repository as a ZIP file directly from GitHub: https://github.com/MarinaPanchenko12345/NodeJsProject
        On the repository's GitHub page, click the Code button, then select Download ZIP.
        After downloading, extract the ZIP file to your local machine.
       

2. **Add the folder .env**
      Add the .env file I provided separately and include the environment variables. Use NODE_ENV="development" for the local MongoDB Compass database or NODE_ENV="production" for connecting to MongoDB Atlas.

3. **Install dependencies:**
      Install all the necessary dependencies using npm :npm install
      This command will download all the required Node modules based.
      
4. **npm start**
   Once the installation is complete, start the project in the terminal with:`npm start`
       *It will run the app with node
       *The page will not reload if you make edits.
       *You must have a MongoDB Atlas Cluster and MongoDB Compass
       *Runs the app with nodemon
       *The page will reload if you make edits
       *The print at the terminal will be blue with the message:"listening on port 9898"
       *And if there are no login errors you should see the message painted in yellow: "Connected to Local database" or "Connected to Atlas database".

***Main Features
1. **User Management:
     *User registration and authentication (standard registration and login via JWT).
     *Creation, editing, deletion of users, and status change.
     *Password lockout for 24 hours after three incorrect login attempts.

2. **Google OAuth Authentication:
**Note:**
To test user registration via Google OAuth, navigate to http://localhost:9898. This will take you to the Google authentication page.
When a user successfully registers via Google, a new entry for the user will automatically be created in the MongoDB database.
After a successful registration, the user's JWT token will be generated and displayed in the terminal console. This token can be used for further API testing in Postman.
You can use this token to make authenticated requests, such as like/unlike a card.

3. **Card Management:
      Creation, editing, deletion of cards, likes, and bizNumber updates.
**Note:**
The users and cards is not permanently deleted but rather marked with an `isDeleted` flag set to `true`. This approach allows preserving the user's data for potential recovery or analysis, providing protection against accidental deletion and maintaining data integrity.

4. **Logging:
      Logging of all requests using morgan with custom formats from chalk and moment.
      Logs with status codes 400 and above are recorded in the logs folder with a file for each day.
**Note:**
The logs folder and log files are created automatically after the first error with a status code of 400 or above.

5. **404 Error Page Check:
      Open a browser and enter the following URL in the address bar: http://localhost:9898/incorrect-route.
      If the route is incorrect, a custom 404 error page (404.html) will be displayed, which is located in the public folder.

6. **API Documentation
      A detailed description of all API endpoints is available in the Postman documentation. To use and test the requests via Postman, you can follow this link: https://documenter.getpostman.com/view/35946649/2sAXqp7i7x


***Project Structure***
backend/
│
handlers/
├── authgoogle/ # Auth google management
│   ├── model/              
│   │   ├── userGoogleMongoose.mjs     # Model and methods for working with Mongoose 
│   ├── routes/             
│   │   └── authGoogle.mjs             # Routes for Google Auth management
│   ├── service/            
│       └── passportGoogle.mjs         # Logic for handling Google OAuth with Passport.js 
│                   
├── cards/ # Card management
│   ├── model/              
│   │   ├── cardModel.mjs          # Data model for cards (used during creation)
│   │   ├── cardMongoose.mjs       # Model and methods for working with Mongoose 
│   ├── routes/             
│   │   └── cards.mjs              # Routes for card management
│   ├── service/            
│   │   ├── bizNumberGenerator.mjs # BizNumber generator for cards
│   │   └── cardService.mjs        # Logic for working with cards 
│   └── validation/        
│       └── cardJoi.mjs            # Joi schema for validating card data

├── users/ # User management
│   ├── model/              
│   │   ├── loginAttemptMongoose.mjs # Model for login attempts
│   │   ├── userModel.mjs            # Data model for users (used during creation)
│   │   └── userMongoose.mjs         # Methods for working with Mongoose
│   ├── routes/             
│   │   └── users.mjs                # Routes for user management
│   ├── service/            
│   │   ├── generateToken.mjs        # JWT token generation
│   │   ├── loginAttemptService.mjs  # Logic for handling login attempts, with automatic folder creation if it doesn't exist in the database
│   │   └── userService.mjs          # Logic for working with users 
│   └── validation/        
│       ├── authJoi.mjs           # Joi schema for validating authentication data
│       └── userUpdateJoi.mjs     # Joi schema for validating user updates


helpers/
└── db.helper.mjs      # Functions for connecting to the database (local or Atlas).


initial-data/
├── initial-data.mjs         # File with initial data (users and cards)
└── initial-data.service.mjs # Logic for initializing data in the database, creating users and cards, and creating folders for storing data


middlewares/
├── cors.mjs             # CORS configuration
├── guard.mjs            # Middleware for authentication and authorization (JWT tokens)
├── loggerConsole.mjs    # Logging requests to the console using morgan, chalk, and moment
└── loggerRequest.mjs    # Logging requests to a file using fs and moment.Logs are stored in the logs folder, with a new file created for each day.


public/
├── images/               # Folder for storing images
└── 404.html              # Custom 404 error page
└── googleAuth.html       # Page for prompting users to authenticate with Google
└── googleProtected.html  # Protected page displayed after successful Google authentication


routes/
└── router.mjs   # The main application router, combining routes for cards, users and Google Auth.


utils/
├── handleError404.mjs    # Handler for sending 404 errors, serves an HTML page (from public) for incorrect routes
└── handleErrors.mjs      # Universal error handler, including validation errors (Joi and Mongoose)
└── htmlGoogle.mjs        # Functions for sending authentication and protected pages for Google OAuth


server.mjs       # The main file for starting the Express server.
Loads environment variables using dotenv.
Connects to the database using connectDB.
Initializes the database with data using initializeData.
Sets up the server using Express.
Applies middleware for logging requests to both the console and files, as well as handling CORS.
Configures routing through the main router.
Serves static files from the public folder.
Handles 404 errors with a custom page or a text message.
Centralized handling of errors with status code 500.
Starts the server on the port specified in the environment variables and logs the startup message using chalk.
This file serves as the entry point for starting the entire application.
