import passport from 'passport'
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import {Strategy as LocalStrategy} from "passport-local"
import crypto from 'crypto'
import User from '../models/User';

export default function auth(app) {

    //helper functions
    function hashPassword(password) {
        var hash = crypto.createHash('sha256');
        hash.update(password)
        return hash.digest('hex')
    }

    app.use(session({
        secret: process.env.SECRET,
        store: new MongoStore({mongooseConnection: require('mongoose').connection}),
        proxy: true,
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    //Look throuhg the passwords.plan/hashed json file
    // for the given username and password

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(error, result) {
            if (error) {
                res.status(500).send("ID not found")
                done(null, false)
            } else {
                console.log(result)
                return done(null, result)
            }
        })
    });

    passport.use(new LocalStrategy(function(username, password, done) {
        var hashedPassword = hashPassword(password);

        User.findOne({
            username: username
        }, function(error, user) {
            if (user.password === hashedPassword) {
                console.log("YES a user");
                done(null, user);
            } else {
                console.log("NOT a user");
                done(null, false);
            }
        });

    }));

    app.post('/login', passport.authenticate('local'), function(req, res) {
        // res.json({ success: true, message: "logged in!" });
        User.findOne({username: req.body.username}).catch(error => {
            res.send(error);
        }).then(response => {
            res.send(response);
        });
    });

    app.get("/logout", function(req, res) {
        req.logout();
        return res.json({success: true});
    })

    //helper functions
    function hashPassword(password) {
        var hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }

    app.post('/register', function(req, res, next) {

        User.findOne({
            username: req.body.username
        }, function(err, user) {
            // is email address already in use?
            if (user) {
                res.json({success: false, message: "Email already in use"})
                // go ahead and create the new user
                return
            } else {
                var hashedPassword = hashPassword(req.body.password);

                User.create({
                    username: req.body.username,
                    password: hashedPassword
                }, (err) => {
                    if (err) {
                        res.json({success: false})
                        return
                    }
                    res.json({success: true})
                    return
                })
            }
        })
    })

    app.get('/', function(req, res) {
        if (req.user) {
            res.json()
        } else {
            res.redirect('/login')
        }
    });

}
