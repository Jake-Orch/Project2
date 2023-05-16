const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model { }

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 40]
            }
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "parent",
                key: "id",
            }
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        attendance: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'student',
    }
);

module.exports = Student;
