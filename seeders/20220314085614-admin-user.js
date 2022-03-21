'use strict';
const bCrypt = require('bcrypt');
const gravatar = require('gravatar');
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    // const avatar0 = gravatar.url("gh.sourav3399@gmail.com", {
    //   s: '150',
    //   r: 'pg',
    //   d: 'mm'
    // });
    // await queryInterface.bulkInsert('users',[{
    //   firstName: "Sourav",
    //   lastName: "Ghosh",
    //   email: "gh.sourav3399@gmail.com",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   mobile: 7003391428,
    //   password: bCrypt.hashSync("9230516334",10),
    //   gender: "MALE",
    //   // avatar:avatar0,
    //   user_role:"ADMIN",
    //   username:"GHSOURAV21",
    //   is_active:true,
    //   is_blacklisted:false,
    // }])
    

    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
