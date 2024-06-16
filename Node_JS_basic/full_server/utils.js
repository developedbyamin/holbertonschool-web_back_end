import fs from 'fs';
import csvParser from 'csv-parser';

/**
 * Reads the database asynchronously from a CSV file.
 * @param {string} filePath - Path to the CSV file.
 * @returns {Promise<Object>}
 *
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  const database = {
    CS: [],
    SWE: [],
  };

  fs.createReadStream(filePath)
    .pipe(csvParser({
      mapHeaders: ({ header }) => header.toLowerCase().trim(), // Trim and lowercase headers
    }))
    .on('data', (row) => {
      const { firstname, field } = row;
      if (field === 'CS') {
        database.CS.push(firstname);
      } else if (field === 'SWE') {
        database.SWE.push(firstname);
      }
    })
    .on('end', () => {
      resolve(database);
    })
    .on('error', (error) => {
      reject(error);
    });
});

export default readDatabase; // Export readDatabase as named export
