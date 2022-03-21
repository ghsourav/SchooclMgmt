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
      "School_dept_Users",
      "contact",
      {
        type: Sequelize.DataTypes.STRING
      })

      await queryInterface.addColumn(
        "School_dept_Users",
        "pincode",
        {
          type: Sequelize.DataTypes.STRING
        })
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
