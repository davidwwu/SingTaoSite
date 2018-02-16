var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

exports.authStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    User.authenticate(email, password, function(err, user) {
        // success message

        // error message
        done(err, user, err ? { message: err.message } : null);
    });
});

exports.authSerializer = function(user, done) {
    done(null, user.id);
};

exports.authDeserializer = function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
};

exports.restrict = function (req, res, next) {
    if (req.isUnauthenticated()) {
        res.flash('error', 'Access denied, please log in.');
        return res.redirect('/maintenance_login');
    }
    return next();
}

exports.logout = function (req, res, next) {
    req.logout();
    res.flash('success', 'Logged out. Please login again.');
    res.redirect('/maintenance_login');
}

exports.user_create_post = function (req, res) {
    if (req.body.password === req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/maintenance');
            }
        });
    } else {
        res.flash('error', 'Passwords do not match.');
        res.render('new_user', {
            flash: {
                error: "Passwords do not match."
            },
            sentData: req.body
        })
    }
}