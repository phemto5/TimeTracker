export default class Account {
  uname = ""
  fname = ""
  lname = ""
  mname = ""
  id = 0
  Account() {
    uname = ""
    fname = ""
    lname = ""
    mname = ""
    id = 0
  }
  Account(uname, id) {
    this.uname = uname;
    this.id = id;
  }
  Account(account) {
    for (var p in this) {
      this[p] = account[p];
    }
  }
}
