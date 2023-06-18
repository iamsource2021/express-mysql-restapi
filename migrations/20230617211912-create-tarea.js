'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      estatus_complecion: {
        type: Sequelize.STRING
      },
      fecha_entrega: {
        type: Sequelize.DATE
      },
      es_publica: {
        type: Sequelize.BOOLEAN
      },
      comentarios: {
        type: Sequelize.TEXT
      },
      creado_por: {
        type: Sequelize.INTEGER
      },
      responsable: {
        type: Sequelize.INTEGER
      },
      archivo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tareas');
  }
};