const fs = require('fs').promises;
const path = require('path');

function countStudents(filePath) {
  const absolutePath = path.resolve(filePath);

  return fs.readFile(absolutePath, 'utf8')
    .then((data) => {
      const rows = data.split('\n').map((row) => row.split(',')).filter((row) => row.length > 1); // Filter out empty lines

      if (rows.length <= 1) {
        throw new Error('No valid student data found in the database');
      }

      let totalStudents = 0;
      let csStudents = 0;
      const csStudentsNames = [];
      const sweStudentsNames = [];

      for (let i = 1; i < rows.length; i += 1) {
        const row = rows[i];
        if (row.length >= 4 && row[3]) { // Ensure the row has enough columns and a valid field
          totalStudents += 1;
          if (row[3] === 'CS') {
            csStudents += 1;
            csStudentsNames.push(row[0]);
          } else if (row[3] === 'SWE') {
            sweStudentsNames.push(row[0]);
          }
        }
      }

      const csStudentsNamesString = csStudentsNames.join(', ');
      const sweStudentsNamesString = sweStudentsNames.join(', ');

      const dataN = `Number of students: ${totalStudents}\nNumber of students in CS: ${csStudents}. List: ${csStudentsNamesString}\nNumber of students in SWE: ${totalStudents - csStudents}. List: ${sweStudentsNamesString}`;
      console.log(dataN);
      return dataN;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
