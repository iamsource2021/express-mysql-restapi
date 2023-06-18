'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bitacora extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bitacora.init({
    accion: DataTypes.STRING,
    fecha_hora: DataTypes.DATE,
    tarea_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bitacora',
  });
  return Bitacora;
};