const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/DbConnection');
const session = require("express-session");

port = 3000 || process.env.port;

connectDB();

//parser
app.use(express.json());
app.use('/api/passwords',require("./routes/passwordRoute"));
app.use('/api/users',require("./routes/userRoute"));
app.use(errorHandler);

app.listen('3000',()=>{
    console.log(`Server running on Port: ${port}`);
})

//adding session based storage
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.CONNECTION_STRING,
  collection: "sessions",
  expires: 15 * 60 * 1000, 
});

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
