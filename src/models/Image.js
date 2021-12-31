const { DataTypes } = require('sequelize')
const { db } = require('../utils/db')

const ImageModel = db.define('Image', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  tableName: 'uploaded_images',
  timestamps: false
})

module.exports = ImageModel
