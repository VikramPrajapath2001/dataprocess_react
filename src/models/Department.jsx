export class Department {
  constructor(id, name, hod, college, batches = []) {
    this.id = id;
    this.name = name;
    this.hod = hod;
    this.college = college;
    this.batches = batches;
  }
}
