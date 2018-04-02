//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
