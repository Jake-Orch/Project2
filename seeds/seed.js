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

    const parents = await Parent.bulkCreate(parentData);

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
            group_id: groupData[Math.floor(Math.random() * groupData.length)].id,
            parent_id: parents[Math.floor(Math.random() * parents.length)].id,
        })
    };

    process.exit(0)
};

seedDatabase();