'use strict';

var bcrypt = require('bcrypt');

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
          args: [7, 254],
          msg: 'password must be between 7 and 254'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 254],
          msg: 'Name must be between 1 and 254 characters'
        }
      }
    },
    facebookId: {
      type: DataTypes.STRING
    },
    facebookToken: {
      type: DataTypes.TEXT
    },
    uploaded: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "0"
    },
    downloaded: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "0"
    },
    created: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        // return password === null ? true : false;
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function() {
        var jsonUser = this.get();
        delete jsonUser.password;

        return jsonUser;
      }
    },
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        if (!createdUser.password) cb(null, createdUser);
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        cb(null, createdUser);
      }
    }
  });
  return user;
};
