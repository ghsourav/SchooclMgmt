'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentStorage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentStorage.init({
    razorpay_payment_id: DataTypes.STRING,
    razorpay_order_id: DataTypes.STRING,
    razorpay_signature: DataTypes.STRING,
    buyerId: DataTypes.INTEGER,
    Admissionid: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    razorpay_error_code:DataTypes.STRING,
    payment_STATUS:DataTypes.STRING,
    error_code:DataTypes.STRING,
    error_description:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PaymentStorage',
  });
  return PaymentStorage;
};