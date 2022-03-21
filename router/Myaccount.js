const express = require('express');
const AccountRouter = express.Router();
const SchoolUser = require('../models').School_dept_User;
const auth = require('../middleware/Auth');





module.exports = AccountRouter
