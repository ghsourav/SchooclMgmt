'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassAssignForStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClassAssignForStudent.init({
    SectionId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    BatchYear: DataTypes.INTEGER,
    StudentRollNo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClassAssignForStudent',
  });
  return ClassAssignForStudent;
};