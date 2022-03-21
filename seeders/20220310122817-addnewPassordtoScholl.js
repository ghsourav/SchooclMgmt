'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('School_dept_Users',[{
      firstName:'Abc',
      lastName:'School',
      email: 'sourav.g@legalkart.com',
      dept_user_type:'MAIN',
      password:'$2b$10$rp6tMTKh5AZCmFv844GENud6Vcdf6fi1.TJze/EgWaGSFLsCHvNIC',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])

    await queryInterface.bulkInsert('School_dept_Users',[{
      firstName:'Sourav',
      lastName:'Ghosh',
      email: 'sourav.g@legalkart.com',
      dept_user_type:'ACDEPT',
      password:'$2b$10$rp6tMTKh5AZCmFv844GENud6Vcdf6fi1.TJze/EgWaGSFLsCHvNIC',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
