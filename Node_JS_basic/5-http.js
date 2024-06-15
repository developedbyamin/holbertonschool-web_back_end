const http = require('http');
const countStudents = require('./3-read_file_async'); // Assuming countStudents.js exports the function

// HTTP Server
const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    res.statusCode = 200;

    // Read CSV file asynchronously
    const databaseFilename = process.argv[2];
    countStudents(databaseFilename)
      .then((result) => {
        // Send response based on result from countStudents
        const response = `This is the list of our students\n${result}`;
        res.end(response);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(`Error: ${error.message}\n`);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
});

// Server listens on port 1245
const port = 1245;
app.listen(port, () => {
  // console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
