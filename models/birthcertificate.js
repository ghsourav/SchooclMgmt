'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BirthCertificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BirthCertificate.init({
    userId: DataTypes.INTEGER,
    birthcertificate: DataTypes.STRING,
    pathlocation: DataTypes.STRING,
    mime_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BirthCertificate',
  });
  return BirthCertificate;
};