
export default class Address {
  street1 = ""
  street2 = ""
  city = ""
  country = ""
  zip = ""
  endpointType = null
  refType = ""
  refID = 0
  Address() {
  }
  Address(address) {
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
