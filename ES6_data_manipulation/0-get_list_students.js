class Student{
    constructor(id, firstName, location){
        this.id = id;
        this.firstName = firstName;
        this.location = location;
    }
}

const students = [
    new Student(1, 'Guillaume', 'San Francisco'),
    new Student(1, 'James', 'Columbia'),
    new Student(1, 'Serena', 'San Francisco'),
];

function getListStudents(){
    console.log(students);
}