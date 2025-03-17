export class Batch {
  constructor(id, name, staffName, capacity, department, students = []) {
    this.id = id;
    this.name = name;
    this.staffName = staffName;
    this.capacity = capacity;
    this.department = department;
    this.students = students;
  }
}
