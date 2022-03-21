const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require('bcrypt')
const passport = require('passport')


const SchoolUser = require('../models').School_dept_User;
const UserModel = require('../models').user

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        //  console.log(user)
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        //  console.log(user)
        if(user){
            SchoolUser.findOne({
                where: {
                    id: user.id
                }
            }).then(user => {
                if (user) {
                    done(null, user);
                } else {
                    done(user.errors, null);
                }
            }); 
        }
            
    });

    passport.use('local',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, (req, email, password, done) => {
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            SchoolUser.findOne({where: {email} ,attributes: {exclude: ['createdAt', 'updatedAt']},             
            }).then(user => {
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Email not Found'));
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('loginMessage', 'password is Wrong'));
                }
                
                var userinfo = user.get();
                return done(null, userinfo,req.flash('loginMessage', 'login DOne'));
            }).catch(err => {
                console.log(err);
                return done(null, false, req.flash('loginMessage', 'Something wrong. Please try again.'));
            });
        })
    )

}
