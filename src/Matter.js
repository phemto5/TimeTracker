
// import { matterAPI } from './api'
export default class Matter {
  name = ''
  refID = 0
  Matter() {
  }
  Matter(matter) {
    for (var p in this) {
      this[p] = matter[p];
    }
  }
  // async loadAll(accountid) {
  //   try {
  //     matters = await matterAPI.getPerAccount(accountid);
  //   } catch (e) {
  //     console.log(`failed to get matter from online`, e);
  //   }
  //   return matters;
  // }
  async setRefID(accountid) {
    this.refID = accountid
    return this;
  }
};
