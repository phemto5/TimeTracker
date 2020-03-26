
export default class Password {
  unameid = 0
  password = ""
  Password() { }
  Password(password) {
    for (var p in this) {
      this[p] = password[p];
    }
  }
}

