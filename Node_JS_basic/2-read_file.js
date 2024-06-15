function countStudents(filePath1){
    const fs = require('fs');
    const path = require('path');
    const filePath = filePath1;
    const absolutePath = path.resolve(filePath);
    
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if(err){
            throw new Error('Cannot load the database');
        }
        const rows = data.split('\n').map(row => row.split(','));
        let totalStudents = 0;
        let csStudents = 0;
        let csStudentsNames = [];
        let sweStudentsNames = [];
        for(let i = 1; i < rows.length; i++){
            totalStudents++;
            if(rows[i][3] == 'CS'){
                csStudents++;
                csStudentsNames.push(rows[i][0]);
            } else{
                sweStudentsNames.push(rows[i][0]);
            }
        }
        process.stdout.write(`Number of students: ${totalStudents}\nNumber of students in CS: 6. List: ${csStudentsNames}\nNumber of students in SWE: ${totalStudents-csStudents} List: ${sweStudentsNames}\n`);
    });

}

module.exports = countStudents;