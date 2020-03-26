<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{
        ` Mangement : ${entity}`
      }}
      <span v-if='context.account'>{{`${context.account.id}-${context.account.uname}`}}</span>
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

        <b-button v-if="context.account" type="button" @click="manageEmails"
          >Manage Emails</b-button
        >
        <b-card-text>Email</b-card-text>
        <ol>
          <li v-for="email in emails" :key="email.id">
            {{ email.email }}
          </li>
        </ol>

        <b-button v-if="context.account" type="button" @click="manageAddresses"
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
          @input="matchPasswords"
        ></b-input>
        <b-card-text>New password</b-card-text>
        <b-input
          type="password"
          v-model="password.confirm"
          placeholder="confirm password"
          @input="matchPasswords"
        ></b-input>
        <b-card-text>Confirm Password</b-card-text>
        <b-button
          v-if="context.state != 'Create' "
          v-show="valid"
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
            v-if="context.state == 'Create'"
            type="button"
            @click="createAccount"
            variant="success"
          >
            Create
          </b-button>
          <b-button
            v-if="context.state != 'Create'"
            type="button"
            @click="updateAccount"
            variant="success"
          >
            Update
          </b-button>
          <b-button
            type="button"
            v-if="context.state != 'Create'"
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
import Account from "../Account";
import Password from "../Password";
import Context from "../context";
export default {
  data() {
    return {
      entity: `Account`,
      loading: false,
      context: new Context(),
      account: {},//new Account(), // Object.assign({}, cleanAccount),
      password: new Password(), // Object.assign({}, cleanPassword),
      // state: "Create",
      addresses: [],
      emails: [],
      valid:false
    };
  },
  async created() {
    this.refreshForm();
  },
  methods: {
    // isLoggedIn() {
    //   CheckLoggedIn(
    //     () => {},
    //     () => {
    //       // router.push({ name: "Login" });
    //     }
    //   );
    // },
    manageAddresses() {
      router.push({ name: "Address" });
    },
    manageEmails() {
      router.push({ name: "Email" });
    },
    async refreshForm() {
      this.loading = true;
      // this.isLoggedIn();
      try {
        this.context = await this.context.load();
        this.account = this.context.account; // await accountAPI.getAccount(localAccountId);
        localStorage.setItem("account", JSON.stringify(this.account));
        this.addresses = await addressAPI.getPerAccount(
          this.account.id
        );
        this.emails = await emailAPI.getPerAccount(this.account.id);
      } catch (e) {
        // console.error(`failed to get Account from online`, e);
        console.error('was not able to load Account')
        this.account = new Account();
      }
      this.loading = false;
    },
    async clearForm() {
      this.loading = true;
      this.account = new Account();
      this.loading = false;
    },
    async createAccount() {
      if (this.password.password == this.password.confirm) {
        let md5p = loginAPI.hashPassword(this.password.password);
        this.account = await accountAPI.createAccount(this.account);
        // localStorage.setItem("account", JSON.stringify(this.account));
        // localStorage.setItem("accountid", this.account.id);
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
    matchPasswords() {
      console.log('MAtch passwords')
      if(this.password.password && this.password.password === this.password.confirm){
        this.valid = true;
      }else{
        this.valid = false;
      }
    },
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
