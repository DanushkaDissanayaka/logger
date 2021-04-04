'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solarchargerdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  solarchargerdata.init({
    solar: DataTypes.FLOAT,
    battery: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'solarchargerdata',
  });
  return solarchargerdata;
};