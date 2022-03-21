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
      "Yearlyfesses",
      "ClassID",
      {
        type: Sequelize.DataTypes.INTEGER
      })

      await queryInterface.addColumn(
        "Yearlyfesses",
        "AddedBy",
        {
          type: Sequelize.DataTypes.INTEGER
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
