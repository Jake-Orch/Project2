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
    day_of_club: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'club',
  }
);

module.exports = Club;