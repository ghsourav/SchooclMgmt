'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdmissionApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdmissionApplication.init({
    buyerId: DataTypes.INTEGER,
    Admissionid: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    razorpay_payment_id: DataTypes.STRING,
    invoice_file: DataTypes.STRING,
    ClassAssignForStudentsID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AdmissionApplication',
  });
  return AdmissionApplication;
};