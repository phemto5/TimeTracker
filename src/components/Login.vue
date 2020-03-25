<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{
        ` Mangement : ${entity} :: ${context.account.id}-${context.account.uname}`
      }}
    </h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col sm="12" md="8">
        <b-card>
          <b-form @submit="login" @reset="clearForm">
            <b-form-group id="login" label="LoginName" label-for="login">
              <b-form-input
                id="login"
                v-model="context.account.uname"
                type="text"
                required
                placeholder="UserName"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="pass" label="Password" label-for="pass">
              <b-form-input
                id="pass"
                v-model="password.password"
                type="password"
                required
                placeholder="Password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
            <b-button type="reset" variant="danger">Clear</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col sm="12" md="4">
        <b-card>
          <p>If you are new to the site please create a new account.</p>
          <b-button @click="createAccount">Create Account</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { accountAPI, loginAPI } from "@/api";
import router from "../router";
import { CheckLoggedIn } from "../auth";
import Context from "../context";
import Password from "../Password";
// let password = {
//   unameid: 0,
//   password: ""
// };
export default {
  data() {
    return {
      entity: `Login`,
      loading: false,
      context: new Context(),
      password: new Password(), // Object.assign({}, password),
      warn: false
    };
  },
  async created() {
    this.isLoggedIn(
      () => {
        router.push({ name: "Timer" });
      },
      () => {
        this.clearForm();
        this.warn = true;
      }
    );
    this.refreshForm();
  },
  methods: {
    isLoggedIn(suc, fail) {
      CheckLoggedIn(suc, fail);
    },

    refreshForm(failed = false) {
      this.loading = true;
      if (!failed) {
        this.clearForm();
      } else {
        console.log("Password or Username not correct");
      }
      this.loading = false;
    },
    clearForm() {},
    createAccount() {
      router.push({ name: "Account" });
    },
    async login() {
      console.log("Logging in");
      let token = { msg: "", accountId: null, token: null, expires: null };
      token = await loginAPI.login(
        this.context.account.uname,
        this.password.password
      );
      if (token.accountId && token.accountId > 0) {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("token", token.token);
        localStorage.setItem("expires", token.expires);
        localStorage.setItem("accountId", token.accountId);
        try {
          this.context.account = await accountAPI.getAccount(token.accountId);
          localStorage.setItem("account", JSON.stringify(this.account));
        } catch (e) {
          console.log(`Could not load Account`);
        }
        window.location.reload();
        console.log(`Reloading Window`);
      } else {
        this.refreshForm();
        localStorage.clear();
        console.log(`Failed to Login `, token);
      }
    }
  }
};
</script>
