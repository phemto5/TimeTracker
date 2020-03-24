import { accountAPI } from "@/api";
const cleanAccount = {
  uname: "",
  fname: "",
  lname: "",
  mname: "",
  id: 0
}
export const Context = {
  localAccountId : localStorage.getItem("accountId"),
  account:{},
  state:'',
  entity:{},
  entiies:[],
  async load(entityAPI, cleanEntity) {
    if (localAccountId) {
      this.account = cleanAccount;
      this.account = JSON.parse(localStorage.getItem("account"));
      this.state = "Local";
      try {
        this.account = await accountAPI.getAccount(localAccountId);
        localStorage.setItem("account", JSON.stringify(this.account));
        this.state = "Online";
        this.entiies = await entityAPI.getPerAccount(this.account.id);
        this.entity = Object.assign({}, cleanEntity, { refID: this.account.id })
      } catch (e) {
        console.log(`failed to get Account from online`, e);
        this.state = "Offline";
      }
    } else {
      this.account = cleanEntity;
    }
    return this;
  }
}
