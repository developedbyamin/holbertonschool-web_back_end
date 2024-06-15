const http = require('http');
const path = require('path');
const countStudents = require('./3-read_file_async');

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('Usage: node 5-http.js <filename>');
  process.exit(1);
}

const filePath = args[0];
const absolutePath = path.resolve(filePath);

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');

    countStudents(absolutePath)
      .then((data) => {
        res.statusCode = 200;
        res.end(data);
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 1245;
const server = app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', () => {
  // console.log('Received SIGINT. Shutting down gracefully');
  server.close(() => {
    // console.log('Server closed. Exiting process');
    process.exit(0);
  });
});

module.exports = app;
