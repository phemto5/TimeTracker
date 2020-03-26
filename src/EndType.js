// import { endtypeAPI } from './api'
export default class EndType {
  id=null
  name = ''
  refID = 0
  EndType() {
  }
  EndType(id) {
    this.refID = id;
  }
  EndType(EndType) {
    for (var p in this) {
      this[p] = EndType[p];
    }
    return this;
  }
  async setRefID(accountid) {
    this.refID = accountid
    return this;
  }
};
