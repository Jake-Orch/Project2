const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Group extends Model { }

Group.init(
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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'group',
  }
);

module.exports = Group;