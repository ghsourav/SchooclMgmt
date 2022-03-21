const passport = require("passport");
const SchoolUser = require('../models').School_dept_User;

module.exports = async (req, res, next) => {
  if (req.isAuthenticated()) {
    // var name
    // var userid = req.user.id
    // if (req.user.dept_user_type = 'STUDENT') {
    //   name = await SchoolUser.findOne({ where: { dept_user_type: 'STUDENT', id: userid} })
    //   res.locals.id = name.id
    //   res.locals.fname = name.firstName
    //   res.locals.lname = name.lastName
    //   res.locals.username = name.username
    //   res.locals.dept_user_type = name.dept_user_type

    // }
    // else if (req.user.dept_user_type = 'MAIN') {
    //   name = await SchoolUser.findOne({ attributes: ['id', 'firstName', 'lastName', 'username', 'dept_user_type'] }, {
    //     where:
    //     {
    //       id: userid, dept_user_type: 'MAIN'
    //     },
    //   });

    // }

        // res.locals.id = name.id

    // res.locals.id = name.id
    // res.locals.fname = name.firstName
    // res.locals.lname = name.lastName
    // res.locals.username = name.username
    // res.locals.dept_user_type = name.dept_user_type
    delete req.user.password;
    res.locals.user = req.user
    res.locals.fname = req.user.firstName
    res.locals.lname = req.user.lastName


    next();
  } else {
    res.redirect('/');
  }
}