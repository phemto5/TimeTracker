import { accountAPI } from "@/api";
import Account from "./Account";
// const cleanAccount = new Account();
export default class Context {
  accountId = localStorage.getItem("accountId");
  account = JSON.parse(localStorage.getItem("account"));
  state = 'Create';
  Context() {
    accountId = localStorage.getItem("accountId");
    account = JSON.parse(localStorage.getItem("account"));
    if (!account) {
      this.account = new Account();
    }
    state = 'Create';
    return this;
  }
  Context(Context) {
    for (var p in this) {
      this[p] = Context[p];
    }
    return this;
  }
  async load() {
    if (this.accountId || this.account) {
      if (this.account.id) {
        this.state = "Local";
        try {
          // console.log('Loading Account');
          this.account = await accountAPI.getAccount(this.account.id);
          localStorage.setItem("account", JSON.stringify(this.account));
          this.state = "Online";
        } catch (e) {
          console.log(`failed to get Account from online`, e);
          this.state = "Offline";
        }
      } else {
        this.account = new Account();
        this.state = 'Create'
      }
    } else {
      this.account = new Account();
      this.state = 'Create'
    }
    // console.log(this);
    return this;
  }
}
