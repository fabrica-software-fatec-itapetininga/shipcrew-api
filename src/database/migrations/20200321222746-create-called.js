'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('called',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_data: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Data belongsTo ADM("User") 1:1
          model: 'Data',
          key: 'id'
        }
      },
      id_pupil: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Data belongsTo ADM("User") 1:1
          model: 'Pupil',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('called');
  },
};
