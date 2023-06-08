//Import required libraries
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

var authRoutes = require('./routes/authRoutes');
var cardRoutes = require('./routes/cardRoutes');

const connectDB = require('./config/db');

//Create express app
var app = express();

//Define PORT number OR use .env file to set PORT
var port = process.env.PORT || 3000;

//Use Cross-origin-resource-sharing (CORS) middleware for client and server connection
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

//To parse request body
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//To parse cookie
app.use(cookieParser());

/*
/     Routes
*/
app.get('/', function (request, response) {
  console.log(`GET '/' ${Date()}`);
  response.send(
    "<h1>Oh, hello there!</h1><a href='./api/auth/login'>Login with OAuth!</a>"
  );

  console.log(require('crypto').randomBytes(64).toString('hex'));
});

//handle the user authentication and authorization requests using oauth
app.use('/api/auth', authRoutes);

//handle the card - create, update and delete requests
app.use('/api', cardRoutes);

//Handle Invalid API endpoints requests
app.get('*', (req, res) => {
  res.status(404).json('Error 404: Invalid URL please try again');
});

//Setup server -> Give success or error message in console log
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  } catch (error) {
    console.log('Connection error: ' + error);
    console.log('Failed to connect to the database, server is not running.');
  }
};

startServer();
