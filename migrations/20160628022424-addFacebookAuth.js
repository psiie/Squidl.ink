'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'facebookId',
      {
        type: Sequelize.STRING
      }).then(function(){
          return queryInterface.addColumn(
            'users',
            'facebookToken',
            {
              type: Sequelize.TEXT
            }
          )
        })

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'facebookToken')
      .then(function() {
        return queryInterface.removeColumn('users', 'facebookId')
    })
  }
};
