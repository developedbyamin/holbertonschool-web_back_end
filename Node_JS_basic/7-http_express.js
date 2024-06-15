const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Function to count students and categorize them by field
async function countStudents(filePath) {
  const absolutePath = path.resolve(filePath);
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const rows = data.split('\n').map((row) => row.split(','));

    // Filter out empty lines and rows with less than 4 non-empty fields
    const validRows = rows.filter((row) => row.length === 4 && row.every((field) => field.trim() !== ''));

    if (validRows.length <= 1) {
      throw new Error('No valid student data found in the database');
    }

    let totalStudents = 0;
    let csStudents = 0;
    const csStudentsNames = [];
    const sweStudentsNames = [];

    for (let i = 1; i < validRows.length; i += 1) {
      const row = validRows[i];
      totalStudents += 1;
      if (row[3] === 'CS') {
        csStudents += 1;
        csStudentsNames.push(row[0]);
      } else if (row[3] === 'SWE') {
        sweStudentsNames.push(row[0]);
      }
    }

    const csStudentsNamesString = csStudentsNames.join(', ');
    const sweStudentsNamesString = sweStudentsNames.join(', ');

    return `Number of students: ${totalStudents}\nNumber of students in CS: ${csStudents}. List: ${csStudentsNamesString}\nNumber of students in SWE: ${totalStudents - csStudents}. List: ${sweStudentsNamesString}`;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const filePath = process.argv[2];
  if (!filePath) {
    res.status(200).send('This is the list of our students\nCannot load the database');
  } else {
    try {
      const result = await countStudents(filePath);
      res.status(200).send(`This is the list of our students\n${result}`);
    } catch (error) {
      res.status(500).send(`This is the list of our students\n${error.message}`);
    }
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  // console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app;
