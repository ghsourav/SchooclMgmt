'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn(
      "users",
      "mobile ",
      {
        type: Sequelize.DataTypes.INTEGER
      })

    await queryInterface.addColumn(
      "users",
      "password",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "users",
      "gender",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "users",
      "avatar ",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "users",
      "user_role ",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "users",
      "roll_no ",
      {
        type: Sequelize.DataTypes.INTEGER
      })

    await queryInterface.addColumn(
      "users",
      "guardian_name ",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "users",
      "address",
      {
        type: Sequelize.DataTypes.STRING
      })


    await queryInterface.addColumn(
      "users",
      "pincode ",
      {
        type: Sequelize.DataTypes.INTEGER
      })

    await queryInterface.addColumn(
      "users",
      "username",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "users",
      "is_active",
      {
        type: Sequelize.DataTypes.BOOLEAN
      })

    await queryInterface.addColumn(
      "users",
      "is_blacklisted",
      {
        type: Sequelize.DataTypes.BOOLEAN
      })

    await queryInterface.addColumn(
      "users",
      "student_add_by_admin",
      {
        type: Sequelize.DataTypes.STRING
      })

      await queryInterface.addColumn(
        "users",
        "birth_certificate",
        {
          type: Sequelize.DataTypes.STRING
        })

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */

    
  }
};
