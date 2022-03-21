'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Yearlyfess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Yearlyfess.init({
    ClassID: DataTypes.INTEGER,
    Year: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    last_update_by: DataTypes.INTEGER,
    AddedBy: DataTypes.INTEGER,
    duedate:DataTypes.DATE

  }, {
    sequelize,
    modelName: 'Yearlyfess',
  });
  return Yearlyfess;
};