const sequelize = require("../config/connection");
const {Teacher, Group, Club, Student, Parent} = require("../models")

const groupData = require("./groupData.json");
const parentData = require("./parentData.json");
const studentData = require("./studentData.json");
const teacherData = require("./teacherData.json");
const clubData = require("./clubData.json");


const seedDatabase = async () => {
    await sequelize.sync({ force:true});
    const teachers = await Teacher.bulkCreate(teacherData, {
        individualHooks: true,
        returning: true,
    });

    for(const group of groupData){
        await Group.create({
            ...group,
            teacher_id: teachers[Math.floor(Math.random() * teachers.length)].id
        })
    };

    for(const club of clubData){
        await Club.create({
            ...club,
            teacher_id: teachers[Math.floor(Math.random() * teachers.length)].id
        })
    };

    for(const student of studentData){
        await Student.create({
            ...student,
            group_id: groupData[Math.floor(Math.random() * groupData.length)].id
        })
    };

    for(const parent of parentData){
        await Parent.create({
            ...parent,
            children: studentData[Math.floor(Math.random() * studentData.length)].id
        })
    }

    process.exit(0)
};

seedDatabase();