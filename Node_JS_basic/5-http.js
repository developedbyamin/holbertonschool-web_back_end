const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Function to count students and categorize them by field
async function countStudents(filePath) {
  const absolutePath = path.resolve(filePath);
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const rows = data.split('\n').map((row) => row.split(',')).filter((row) => row.length > 1);
    if (rows.length <= 1) {
      throw new Error('No valid student data found in the database');
    }

    let totalStudents = 0;
    let csStudents = 0;
    const csStudentsNames = [];
    const sweStudentsNames = [];

    for (let i = 1; i < rows.length; i += 1) {
      const row = rows[i];
      if (row.length >= 4 && row[3]) {
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

    return `Number of students: ${totalStudents}\nNumber of students in CS: ${csStudents}. List: ${csStudentsNamesString}\nNumber of students in SWE: ${totalStudents - csStudents}. List: ${sweStudentsNamesString}`;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Define the HTTP server logic
const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const result = await countStudents(process.argv[2]);
      res.statusCode = 200;
      res.end(`This is the list of our students\n${result}`);
    } catch (error) {
      res.statusCode = 500;
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Start the server on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  // console.log(`Server is running and listening on port ${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
