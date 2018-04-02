// Importing needed npm packages
const express = require('express');
import mongoose from 'mongoose'

//Checks for mongo database environmental variables
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
//displays connections
mongoose.connection.on('connected', function() {
    console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
    console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
    process.exit(1);
});

export default function db(app) {
    // Set up bodyparser to enable access to POST key values
    // Import models
    var Application = require('../models/Application.js');
    var User = require('../models/User.js');

    // Enables the end user to create a new todo item in the database
    app.post('/add', (req, res) => {
        const newApplication = new Application({company_name: req.body.company_name, role: req.body.role, application_date: req.body.application_date, status: req.body.status});

        newApplication.save().then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    app.get('/applications', (req, res) => {
        Application.find().then(response => {
            console.log(response);
            res.send(response);
        }).catch(error => {
            res.send(error);
        })
    });

    app.post('/update', (req, res) => {

        Application.findOneAndUpdate({_id: req.body.id}, {$set: {status: req.body.status}})
        .then(response => {
            console.log(response);
            res.send(response);
        }).catch(error => {
            res.send(error);
        });
    });
    
}
