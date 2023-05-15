const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Club extends Model { }

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "teacher",
        key: "id",
      }
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'group',
  }
);

module.exports = Club;