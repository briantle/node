const express = require("express")
const mongoose = require("mongoose")
const config = require("./backend/config")

mongoose.connect(
    config.MONGODB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("DB Connected")
)

