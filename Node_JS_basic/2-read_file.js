const fs = require('fs');
const path = require('path');

function countStudents(filePath1) {
  const filePath = filePath1;
  const absolutePath = path.resolve(filePath);

  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
      throw new Error('Cannot load the database');
    }
    const rows = data.split('\n').map((row) => row.split(','));
    let totalStudents = 0;
    let csStudents = 0;
    const csStudentsNames = [];
    const sweStudentsNames = [];
    for (let i = 1; i < rows.length; i += 1) {
      totalStudents += 1;
      if (rows[i][3] === 'CS') {
        csStudents += 1;
        csStudentsNames.push(rows[i][0]);
      } else {
        sweStudentsNames.push(rows[i][0]);
      }
    }
    const csStudentsNamesString = csStudentsNames.join(', ');
    const sweStudentsNamesString = sweStudentsNames.join(', ');
    process.stdout.write(`Number of students: ${totalStudents}\nNumber of students in CS: ${csStudents}. List: ${csStudentsNamesString}\nNumber of students in SWE: ${totalStudents - csStudents}. List: ${sweStudentsNamesString}\n`);
  });
}

module.exports = countStudents;
