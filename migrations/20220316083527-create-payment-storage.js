'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentStorages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      razorpay_payment_id: {
        type: Sequelize.STRING
      },
      razorpay_order_id: {
        type: Sequelize.STRING
      },
      razorpay_signature: {
        type: Sequelize.STRING
      },
      buyerId: {
        type: Sequelize.INTEGER
      },
      Admissionid: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.INTEGER
      },
      razorpay_error_code: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentStorages');
  }
};