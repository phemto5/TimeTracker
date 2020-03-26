// import { chunkAPI } from './api'
export default class Chunk {
  start = null
  open = false
  stop = null
  cust = null
  matter = null
  body = ""
  tag = null
  refID = 0
  Chunk() {
  }
  Chunk(Chunk) {
    for (var p in this) {
      this[p] = Chunk[p];
    }
  }
  // async loadAll(accountid) {
  //   try {
  //     chunks = await chunkAPI.getPerAccount(accountid);
  //   } catch (e) {
  //     console.log(`failed to get Chunk from online`, e);
  //   }
  //   return chunks;
  // }
  setRefID(accountid) {
    this.refID = accountid
    return this;
  }
};
