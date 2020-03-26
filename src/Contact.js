export default class Contact {
  fname = ""
  mname = ""
  lname = ""
  customerId = 0
  addresses = ""
  phones = ""
  emails = ""
  webSites = ""
  refType = ""
  refID = 0
  Contact() {
  }
  Contact(Contact) {
    for (var p in this) {
      this[p] = Contact[p];
    }
  }
  setRefID(id) {
    this.refID = id
    return this;
  }
};
