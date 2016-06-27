'use strict';
module.exports = function(sequelize, DataTypes) {
  var userLink = sequelize.define('userLink', {
    user: DataTypes.INTEGER,
    link: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userLink;
};