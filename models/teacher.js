const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Teacher extends Model { }

Teacher.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [2, 40]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'teacher',
    }
);

module.exports = Teacher;