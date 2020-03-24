<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{ ` Mangement : ${entity} :: ${account.id}-${account.uname}` }}
    </h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="6">
        <b-card-title>Account Name</b-card-title>
        <b-input
          type="text"
          v-model="account.uname"
          placeholder="UserName"
          v-if="!account.id"
          required
        ></b-input>
        <b-card-text v-else type="text" placeholder="User Name">
          <h3>{{ account.uname }}</h3></b-card-text
        >
      </b-col>
      <b-col sm="6">
        <b-card-title>Account ID</b-card-title>
        <b-card-text>
          <h3>{{ account.id }}</h3>
        </b-card-text>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6" lg="4">
        <b-card-title>Name</b-card-title>
        <b-input
          type="text"
          v-model="account.fname"
          placeholder="First"
        ></b-input>
        <b-card-text>First</b-card-text>
        <b-input
          type="text"
          v-model="account.mname"
          placeholder="Middle"
        ></b-input>
        <b-card-text>Middle</b-card-text>

        <b-input
          type="text"
          v-model="account.lname"
          placeholder="Last"
        ></b-input>
        <b-card-text>Last</b-card-text>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-card-title>Profile</b-card-title>

        <!-- <b-input
          type="email"
          v-model="account.email"
          placeholder="New Email Email"
        ></b-input> -->
        <b-button v-if="account.id" type="button" @click="manageEmails"
          >Manage Emails</b-button
        >
        <b-card-text>Email</b-card-text>
        <ol>
          <li v-for="email in emails" :key="email.id">
            {{ email.email }}
          </li>
        </ol>

        <!-- <b-input
          type="text"
          v-model="account.address"
          placeholder="New Mailing Address"
        ></b-input> -->
        <b-button v-if="account.id" type="button" @click="manageAddresses"
          >Manage Addresses</b-button
        >
        <b-card-text>Address</b-card-text>
        <ol>
          <li v-for="addr in addresses" :key="addr.id">
            <ul>
              <div>{{ addr.street1 }}</div>
              <div v-if="addr.street2">{{ addr.street2 }}</div>
              <div v-if="addr.city">
                {{ addr.city }}, {{ addr.state }} {{ addr.zip }}
              </div>
              <div v-if="addr.country">{{ addr.country }}</div>
            </ul>
          </li>
        </ol>
      </b-col>
      <b-col sm="12" md="6" lg="4">
        <b-card-title>Password</b-card-title>

        <b-input
          type="password"
          v-model="password.password"
          placeholder="new password"
          @blur="matchPasswords"
        ></b-input>
        <b-card-text>New password</b-card-text>

        <b-input
          type="password"
          v-model="password.confirm"
          placeholder="confirm password"
          @blur="matchPasswords"
        ></b-input>
        <b-card-text>Confirm Password</b-card-text>
        <b-button
          v-if="state != 'Create'"
          type="button"
          @click="upcertPassword"
          variant="success"
        >
          Update Password
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-button
            v-if="state == 'Create'"
            type="button"
            @click="createAccount"
            variant="success"
          >
            Create
          </b-button>
          <b-button
            v-if="state != 'Create'"
            type="button"
            @click="updateAccount"
            variant="success"
          >
            Update
          </b-button>
          <b-button
            type="button"
            v-if="state != 'Create'"
            @click="refreshForm"
            variant="warning"
          >
            Reload
          </b-button>
          <b-button type="button" @click="clearForm" variant="danger">
            Discard
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { accountAPI, passwordAPI, loginAPI, addressAPI, emailAPI } from "@/api";
import { CheckLoggedIn } from "../auth";
import router from "../router";
const cleanEmail = {
  email: "",
  endpointType: 0,
  refType: "",
  refID: 0
};
const cleanAddress = {
  street1: "",
  street2: "",
  city: "",
  country: "",
  zip: 0,
  endpointType: 0,
  refType: "",
  refID: 0
};
const cleanAccount = {
  uname: "",
  fname: "",
  lname: "",
  mname: "",
  // addresses: [],
  // emails: [],
  id: 0
};
let cleanPassword = { password: "", confirm: "" };
export default {
  data() {
    return {
      entity: `Account`,
      loading: false,
      account: Object.assign({}, cleanAccount),
      password: Object.assign({}, cleanPassword),
      state: "Create",
      addresses: [],
      emails: []
    };
  },
  async created() {
    this.isLoggedIn(
      () => {
        this.refreshForm();
      },
      () => {
        // router.push({ name: 'Login' })
      }
    );
    this.refreshForm();
  },
  methods: {
    isLoggedIn(suc, fail) {
      CheckLoggedIn(suc, fail);
    },
    manageAddresses() {
      router.push({ name: "Address" });
    },
    manageEmails() {
      router.push({ name: "Email" });
    },
    async refreshForm() {
      this.loading = true;
      const localAccountId = localStorage.getItem("accountId");
      if (localAccountId) {
        this.account = cleanAccount;
        this.account = JSON.parse(localStorage.getItem("account"));
        this.state = "Local";
        try {
          this.account = await accountAPI.getAccount(localAccountId);
          localStorage.setItem("account", JSON.stringify(this.account));
          this.state = "Online";
          //getaddresses
          this.addresses = await addressAPI.getAddresses();
          this.emails = await emailAPI.getEmails();
        } catch (e) {
          console.log(`failed to get Account from online`, e);
          this.state = "Offline";
        }
      } else {
        this.account = cleanAccount;
      }
      this.loading = false;
    },
    async clearForm() {
      this.loading = true;
      this.account = Object.assign({}, cleanAccount);
      this.loading = false;
    },
    async createAccount() {
      if (this.password.password == this.password.confirm) {
        let md5p = loginAPI.hashPassword(this.password.password);
        this.account = await accountAPI.createAccount(this.account);
        localStorage.setItem("account", JSON.stringify(this.account));
        localStorage.setItem("accountid", this.account.id);
        this.password = await passwordAPI.createPassword({
          unameid: this.account.id,
          password: md5p
        });
      }
      // window.location.reload()
      alert("Account Created Please login");
      router.push({ name: "Login" });
    },
    async updateAccount() {
      try {
        this.account = await accountAPI.updateAccount(
          this.account.id,
          this.account
        );
        console.log(`updated the account`);
        this.refreshForm();
      } catch (e) {
        consol.error(e);
      }
    },
    matchPasswords() {},
    async upcertPassword() {
      //get password from account id
      let pass;
      try {
        pass = passwordAPI.getPerAccount(this.account.id);
      } catch (e) {
        console.error(e);
      }
      this.password.password = LoginAPI.hashPassword(this.password.password);
      if (pass) {
        pass = passwordAPI.updatePassword(this.account.id, this.password);
      } else {
        pass = passwordAPI.createPassword(this.password);
      }
      this.password = pass;
    }
  }
};
</script>
