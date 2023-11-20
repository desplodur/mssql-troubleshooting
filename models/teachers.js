'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teachers extends Model {

    static associate(models) {
      Teachers.hasMany(models.Students, {
        foreignKey: 'id',
        as: 'students' 
      });
    }
  }
  Teachers.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teachers',
  });
  return Teachers;
};