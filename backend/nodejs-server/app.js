const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const newsRoutes = require('./routes/news');
const queryRoutes = require('./routes/queries');
const userRoutes = require("./routes/users")

mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB Connected')
);

const app = express();

//app.use(cors());

app.use(function (req, res, next) 
{
     //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"); 
    next();
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/news', newsRoutes);
app.use('/contactus', queryRoutes);
app.use("/users", userRoutes)

module.exports = app;