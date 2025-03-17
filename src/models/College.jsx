export class College {
  constructor(id, name, address, departments = []) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.departments = departments;
  }
}
