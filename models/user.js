'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
     password: DataTypes.STRING,
    //  mobile: DataTypes.INTEGER,
     password: DataTypes.STRING,
     gender: DataTypes.STRING,
    //  avatar: DataTypes.STRING,
    roll_no: DataTypes.STRING,
     address: DataTypes.STRING,
     pincode: DataTypes.INTEGER,
     username: DataTypes.STRING,
     is_active: DataTypes.BOOLEAN,
     is_blacklisted: DataTypes.BOOLEAN,
     student_add_by_admin: DataTypes.STRING,
     birth_certificate: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};