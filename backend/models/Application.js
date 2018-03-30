//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const applicationSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    application_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    contact: {
        type: String
    },
    link: {
        type: String
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
