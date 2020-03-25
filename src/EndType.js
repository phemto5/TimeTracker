
// import { endtypeAPI } from './api'
export default class EndType {
  name = ''
  refID = 0
  EndType() {
  }
  EndType(EndType) {
    for (var p in this) {
      this[p] = EndType[p];
    }
  }
  // async loadAllPerAccount(accountid) {
  //   try {
  //     chunks = await endtypeAPI.getPerAccount(accountid);
  //   } catch (e) {
  //     console.log(`failed to get Chunk from online`, e);
  //   }
  //   return chunks;
  // }
  // async loadPerAccount(accountid) {
  //   try {
  //     chunks = await endtypeAPI.getEndType(accountid);
  //   } catch (e) {
  //     console.log(`failed to get Chunk from online`, e);
  //   }
  //   return chunks;
  // }
  async setRefID(accountid) {
    this.refID = accountid
    return this;
  }
};
