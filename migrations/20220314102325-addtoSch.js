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
      "mobile ",
      {
        type: Sequelize.DataTypes.STRING,
      }
      

    )


    await queryInterface.addColumn(
      "School_dept_Users",
      "gender",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "School_dept_Users",
      "avatar ",
      {
        type: Sequelize.DataTypes.STRING
      })

   

    await queryInterface.addColumn(
      "School_dept_Users",
      "roll_no ",
      {
        type: Sequelize.DataTypes.INTEGER
      })

    await queryInterface.addColumn(
      "School_dept_Users",
      "guardian_name ",
      {
        type: Sequelize.DataTypes.STRING
      })

    await queryInterface.addColumn(
      "School_dept_Users",
      "address",
      {
        type: Sequelize.DataTypes.STRING
      })


    await queryInterface.addColumn(
      "School_dept_Users",
      "pincode ",
      {
        type: Sequelize.DataTypes.INTEGER
      })

    await queryInterface.addColumn(
      "School_dept_Users",
      "username",
      {
        type: Sequelize.DataTypes.STRING
      })

    

    await queryInterface.addColumn(
      "School_dept_Users",
      "is_blacklisted",
      {
        type: Sequelize.DataTypes.BOOLEAN
      })

    await queryInterface.addColumn(
      "School_dept_Users",
      "student_add_by_admin",
      {
        type: Sequelize.DataTypes.STRING
      })

      await queryInterface.addColumn(
        "School_dept_Users",
        "birth_certificate",
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
