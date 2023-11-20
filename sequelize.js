const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('test', 'sa', 'abc123!', {
  host: 'localhost',
  dialect: 'mssql',
});

const Teachers = sequelize.define('Teachers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

const Students = sequelize.define('Students', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teacher_id: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

Teachers.hasMany(Students, { foreignKey: 'teacher_id' });
Students.belongsTo(Teachers, { foreignKey: 'teacher_id' });


  async function createTeacher() {
    try {
      const teacher = await Teachers.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      });
      return teacher;
    } catch (error) {
      console.error('Error creating teacher:', error);
      throw error;
    }
  }
  
  async function createStudents(teacherId) {
    try {
      await Students.bulkCreate([
        {
          firstName: 'Student1',
          lastName: 'Doe',
          email: 'student1@example.com',
          teacher_id: teacherId, 
        },
        {
          firstName: 'Student2',
          lastName: 'Doe',
          email: 'student2@example.com',
          teacher_id: teacherId,
        },
        {
          firstName: 'Student3',
          lastName: 'Doe',
          email: 'student3@example.com',
          teacher_id: teacherId,
        },
      ]);
    } catch (error) {
      console.error('Error creating students:', error);
      throw error;
    }
  }

createTeacher().then((teacher)=> {
     createStudents(teacher.dataValues.id).then(()=> {
      sequelize.authenticate().then(() => {
        sequelize.model("Teachers").findOne({
          where: { id: 1 },
          include: [Students],
          logging: (sql) => {
            test = sql;
          },
        }).then((result) => {
          console.log(result.Students)
        })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
        });
     })
  })

