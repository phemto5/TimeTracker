import { accountAPI } from "@/api";
import Account from "./Account";
// const cleanAccount = new Account();
export default class Context {
  localAccountId = localStorage.getItem("accountId")
  account = {}
  state = ''
  // entity = {}
  // entiies = []
  Context() { }
  Context(Context) {
    for (var p in this) {
      this[p] = Context[p];
    }
  }
  async load() {
    if (this.localAccountId) {
      this.account = new Account();// cleanAccount;
      this.account = JSON.parse(localStorage.getItem("account"));
      this.state = "Local";
      try {
        console.log('Loading Account');
        this.account = await accountAPI.getAccount(this.localAccountId);
        localStorage.setItem("account", JSON.stringify(this.account));
        this.state = "Online";
        // this.entiies = await entityAPI.getPerAccount(this.account.id);
        // this.entity = Object.assign({}, cleanEntity, { refID: this.account.id })
      } catch (e) {
        console.log(`failed to get Account from online`, e);
        this.state = "Offline";
      }
    } else {
      this.account = new Account();
    }
    return this;
  }
}
