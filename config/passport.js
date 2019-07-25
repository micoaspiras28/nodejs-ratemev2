var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var secret = require('../secret/secret');

passport.serializeUser((user, done) => {
    done(null, user.id); // save 
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    }); //method by mongoose to retrive data
});
//signup passport
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    User.findOne({'email':email}, (err, user) => {
        if(err){
            return done(err);
        }

        if(user){
            return done(null, false, req.flash('error', 'User with email already exisit.'));
        }

        var newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.bodypassword);

        newUser.save((err) => {
            return done(null, newUser);
        });
    })
}))
//login passport
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    User.findOne({'email':email}, (err, user) => {
        if(err){
            return done(err);
        }

        var messages = [];
        if(!user && !user.validPassword(password)){
            messages.push('Email does not exist or password is invalid.')
            return done(null, false, req.flash('error', messages));
        }
        return done(null, user);

    });
}));

passport.use(new facebookStrategy(secret.facebook, (req, token, refreshToken, profile, done) => {
    User.findOne({facebook: profile.id}, (err, user) => {
        if(err){
            return done(err);
        }

        if(user){
            return done(null, user);
        }else{
            var newUser = new User();
            newUser.facebook = profile.id;
            newUser.fullname = profile.displayName;
            newUser.email = profile._json.email;
            newUser.tokens.push({token: token});

            newUser.save((err) => {
                return done(null, newUser);
            });
        }
    })
}))