
export default class Email {
  email=""
  endpointType=null
  refType = ""
  refID = 0
  Email() {
  }
  Email(address) {
    for (var p in this) {
      this[p] = address[p];
    }
    return this;
  }
  setRefID(id,type) {
    this.refID = id;
    this.refType=type;
    return this;
  }
}
