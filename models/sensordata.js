'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sensordata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sensordata.init({
    values: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'sensordata',
  });
  return sensordata;
};