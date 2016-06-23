'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [7,254],
          msg: 'password must be between 7 and 254'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,254],
          msg: 'Name must be between 1 and 254 characters'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};
