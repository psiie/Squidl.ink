'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'uploaded',
      {
        type: Sequelize.STRING
      }).then(function(){
          return queryInterface.addColumn(
            'users',
            'downloaded',
            {
              type: Sequelize.STRING
            }
          )
        }).then(function(){
          return queryInterface.addColumn(
            'users',
            'created',
            {
              type: Sequelize.INTEGER
            }
          )
        })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'created')
      .then(function() {
        return queryInterface.removeColumn('users', 'downloaded')
    }).then(function() {
        return queryInterface.removeColumn('users', 'uploaded')
    })

  }
};
