const { DataTypes } = require('sequelize')
const { db } = require('../utils/db')

const UserModel = db.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  tableName: 'users',
  timestamps: false
})

module.exports = UserModel
