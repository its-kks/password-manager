// Description: Main server file
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/DbConnection');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

port = 3000 || process.env.PORT;

// Connect to the database
connectDB();

// Body parser middleware
app.use(express.urlencoded({ extended: true }));//check this 
app.use(express.json());

// Session middleware
const store = new MongoDBStore({
  uri: process.env.CONNECTION_STRING,
  collection: 'sessions',
  expires: 15 * 60 * 1000, // Session expiration time (15 minutes)
});

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// Routes
app.use('/api/passwords', require('./routes/passwordRoute'));
app.use('/api/users', require('./routes/userRoute'));

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
