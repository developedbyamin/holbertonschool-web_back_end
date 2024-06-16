import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const filePath = '/home/amin/Documents/Programming/HolbertonSchool/holbertonschool-web_back_end/Node_JS_basic/database.csv'; // Define filePath appropriately

    readDatabase(filePath)
      .then((database) => {
        let response = 'This is the list of our students\n';
        const fields = Object.keys(database).sort(); // Sort fields alphabetically

        fields.forEach((field) => {
          const students = database[field];
          response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        });

        res.status(200).send(response);
      })
      .catch((error) => {
        console.error('Error reading database:', error);
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const filePath = '/home/amin/Documents/Programming/HolbertonSchool/holbertonschool-web_back_end/Node_JS_basic/database.csv'; // Define filePath appropriately

    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    return readDatabase(filePath)
      .then((database) => {
        const students = database[major] || [];

        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch((error) => {
        console.error('Error reading database:', error);
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
