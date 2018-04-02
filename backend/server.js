// Importing needed npm packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//initializes express
var app = express();

//initializes bodyparser's required code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connects mongo server using personal database login from environmental source
mongoose.connect(process.env.MONGODB_URI);

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



console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
