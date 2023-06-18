'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarea.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    estatus_complecion: DataTypes.STRING,
    fecha_entrega: DataTypes.DATE,
    es_publica: DataTypes.BOOLEAN,
    comentarios: DataTypes.TEXT,
    creado_por: DataTypes.INTEGER,
    responsable: DataTypes.INTEGER,
    archivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};