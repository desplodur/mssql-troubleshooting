const { Connection, Request } = require('tedious');
const { Teachers } = require('./models'); 
const { Students } = require('./models'); 

    const config = {
        server: 'localhost',
        authentication: {
          type: 'default',
          options: {
            userName: 'sa',
            password: 'abc123!'
          }
        },
        options: {
          database: 'test-database',
          encrypt: false
        }
      };

      const connection = new Connection(config);

      connection.connect();
      connection.on('connect', (err) => {
        if (err) {
          console.error(err.message);
        } else {
            executeStatement()
        }
      });

      async function createTeacher() {
        try {
          const teacher = await Teachers.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
          });
          console.log('Teacher created:', teacher.toJSON());
          return teacher;
        } catch (error) {
          console.error('Error creating teacher:', error);
          throw error;
        }
      }

      async function createStudents(teacherId) {
        try {
          const students = await Students.bulkCreate([
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
          console.log('Students created:', students.map(student => student.toJSON()));
        } catch (error) {
          console.error('Error creating students:', error);
          throw error;
        }
      }



function executeStatement() {

    const query = `
      SELECT Teachers.*, Students.*
      FROM Teachers
      LEFT JOIN Students ON Teachers.id = Students.teacher_id
      WHERE Teachers.id = 1;
    `;
  
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} rows returned`);
      }
      connection.close();
    });
  
    request.on('row', (columns) => {
        console.log("columns",columns)
    });
  
    connection.execSql(request);
  }