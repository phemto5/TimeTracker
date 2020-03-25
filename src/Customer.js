export default class Customer {
  name = ""
  id = 0
  Customer() { }
  Customer(name, id) {
    this.name = name;
    this.id = id;
  }
  Customer(cust) {
    for (var p in this) {
      this[p] = cust[p];
    }
  }
}
