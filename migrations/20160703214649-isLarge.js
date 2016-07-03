'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'links',
      'isLarge',
      {
        type: Sequelize.BOOLEAN,
        default: false
      })
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.removeColumn('users', 'isLarge')
  }
}
