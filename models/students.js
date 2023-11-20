'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Students.belongsTo(models.Teachers, {
        foreignKey: 'id',
        as: 'teacher' 
      });
    }
  }
  Students.init({
    firstName: DataTypes.STRING,
    teacher_id:  DataTypes.INTEGER,    
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};