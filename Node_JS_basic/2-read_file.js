const fs = require('fs');
const path = require('path');

function countStudents(filePath) {
  const absolutePath = path.resolve(filePath);

  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    const rows = data.split('\n').map((row) => row.split(',')).filter((row) => row.length > 1); // Filter out empty lines

    if (rows.length <= 1) {
      throw new Error('No valid student data found in the database');
    }

    let totalStudents = 0;
    let csStudents = 0;
    const csStudentsNames = [];
    const sweStudentsNames = [];

    for (let i = 1; i < rows.length; i += 1) {
      if (rows[i].length >= 4 && rows[i][3]) {
        totalStudents += 1;
        if (rows[i][3] === 'CS') {
          csStudents += 1;
          csStudentsNames.push(rows[i][0]);
        } else if (rows[i][3] === 'SWE') {
          sweStudentsNames.push(rows[i][0]);
        }
      }
    }

    const csStudentsNamesString = csStudentsNames.join(', ');
    const sweStudentsNamesString = sweStudentsNames.join(', ');

    console.log(`Number of students: ${totalStudents}`);
    console.log(`Number of students in CS: ${csStudents}. List: ${csStudentsNamesString}`);
    console.log(`Number of students in SWE: ${totalStudents - csStudents}. List: ${sweStudentsNamesString}`);
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
