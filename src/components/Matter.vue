<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{ ` Mangement : ${entity} :: ${account.id}-${account.uname}` }}
    </h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>refID</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="matter in matters" :key="matter.id">
              <td>{{ matter.id }}</td>
              <td>{{ matter.name }}</td>
              <td>{{ matter.refID }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateMatterToEdit(matter)"
                  >Edit</a
                >
                <a href="#" @click.prevent="deleteMatter(matter.id)"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card
          :title="
            matter.id ? `Edit ${entity} ID#` + matter.id : `New ${entity}`
          "
        >
          <form @submit.prevent="saveMatter">
            <b-form-input
              type="text"
              placeholder="ID"
              v-model="matter.id"
              readonly="readonly"
            ></b-form-input>
            <b-form-input
              type="text"
              placeholder="Name"
              v-model="matter.name"
            ></b-form-input>
            <b-form-input
              type="text"
              placeholder="RefID"
              v-model="matter.refID"
            ></b-form-input>
            <div>
              <b-button type="submit" variant="success">Save</b-button>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { accountAPI, passwordAPI, loginAPI, matterAPI } from "@/api";
import { CheckLoggedIn } from "../auth";
import router from "../router";
const cleanMatter = {
  name: "",
  refID: 0
};
const cleanAccount = {
  uname: "",
  fname: "",
  lname: "",
  mname: "",
  id: 0
};
export default {
  data() {
    return {
      entity: `Matter`,
      loading: false,
      account: Object.assign({}, cleanAccount),
      matter: Object.assign({}, cleanMatter),
      matters: [],
      state:''
    };
  },
  async created() {
    this.isLoggedIn(
      () => {
        this.refreshForm();
      },
      () => {
        router.push({ name: "Login" });
      }
    );
    this.refreshForm();
  },
  methods: {
    isLoggedIn(suc, fail) {
      CheckLoggedIn(suc, fail);
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
          this.matters = await matterAPI.getMattersPerAccount(this.account.id);
          this.matter = Object.assign({},cleanMatter,{refID:this.account.id})
        } catch (e) {
          console.log(`failed to get Account from online`, e);
          this.state = "Offline";
        }
      } else {
        this.account = cleanAccount;
      }
      this.loading = false;
    },
    clearForm() {
      this.loading = true;
      this.matter = Object.assign({}, cleanMatter);
      this.loading = false;
    },
    async populateMatterToEdit(matter) {
      this.matter = Object.assign({}, cleanMatter, matter, {
        refID: this.account.id
      });
    },
    async saveMatter() {
      if (this.matter.id) {
        await matterAPI.updateMatter(this.matter.id, this.matter);
      } else {
        await matterAPI.createMatter(this.matter);
      }
      this.matter = cleanMatter;
      await this.refreshForm();
    },
    async deleteMatter(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.matter.id === id) {
          this.matter = cleanMatter;
        }
        await matterAPI.deleteMatter(id);
        await this.refreshForm();
      }
    }
  }
};
</script>
