'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School_dept_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  School_dept_User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    dept_user_type: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    // mobile: DataTypes.STRING,
    gender: DataTypes.STRING,
    // roll_no:DataTypes.INTEGER,
    // guardian_name:DataTypes.STRING,
    // pincode:DataTypes.INTEGER,
    username:DataTypes.STRING,
    is_blacklisted:DataTypes.BOOLEAN,
    birth_certificate:DataTypes.STRING,
    guardianName:DataTypes.STRING,
    rollNo:DataTypes.INTEGER,
    student_add_by_admin:DataTypes.INTEGER,
    contact:DataTypes.STRING,
    StudentClassAssignDetails:DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'School_dept_User',
  });
  return School_dept_User;
};