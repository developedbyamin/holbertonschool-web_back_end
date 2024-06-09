// Get List Students

class Student{
    constructor(id, firstName, location){
        this.id = id;
        this.firstName = firstName;
        this.location = location;
    }
}

const students = [
    new Student(1, 'Guillaume', 'San Francisco'),
    new Student(2, 'James', 'Columbia'),
    new Student(3, 'Serena', 'San Francisco'),
];  

function getListStudents(){
    return students;
}

export default getListStudents;