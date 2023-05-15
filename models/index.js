const Student = require('./student');
const Teacher = require('./teacher');
const Parent = require('./parent');
const Group = require('./group');
const Club = require('./club');

Student.hasMany(Parent, {
    foreignKey: 'children',
});
Parent.belongsTo(Student, {
    foreignKey: 'children',
    onDelete: 'CASCADE'
});

Group.hasMany(Student, {
    foreignKey: 'group_id',
});
Student.belongsTo(Group, {
    foreignKey: 'group_id',
    onDelete: 'CASCADE'
});

Teacher.hasOne(Group, {
    foreignKey: 'teacher_id',
});
Group.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE'
});

Teacher.hasOne(Club, {
    foreignKey: 'teacher_id',
});
Club.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE'
});

module.exports = { Student, Teacher, Parent, Group };