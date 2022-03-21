'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "AdmissionApplications",
      "invoice_file",
        {
          type: Sequelize.DataTypes.STRING
        }
    )

    await queryInterface.addColumn(
      "Yearlyfesses",
      "duedate",
        {
          type: Sequelize.DataTypes.DATE
        }
    )

    await queryInterface.addColumn(
      "PaymentStorages",
      "payment_STATUS",
        {
          type: Sequelize.DataTypes.STRING
        }
    )

    await queryInterface.addColumn(
      "PaymentStorages",
      "error_description",
        {
          type: Sequelize.DataTypes.STRING
        }
    )

    await queryInterface.addColumn(
      "PaymentStorages",
      "error_code",
        {
          type: Sequelize.DataTypes.STRING
        }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
