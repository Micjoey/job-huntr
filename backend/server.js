// Importing needed npm packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import db from './routes/db';
import auth from './routes/auth';
import passport from 'passport';

//initializes express
var app = express();

//initializes bodyparser's required code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db(app);
auth(app);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
