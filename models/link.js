'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    owner: DataTypes.STRING,
    magnet: DataTypes.STRING,
    uniqueClick: DataTypes.INTEGER,
    isLarge: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};
