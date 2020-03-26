<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{
        ` Mangement : ${entity} :: ${context.account.id}-${context.account.uname}`
      }}
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
            <tr v-for="endtype in endtypes" :key="endtype.id">
              <td>{{ endtype.id }}</td>
              <td>{{ endtype.name }}</td>
              <td>{{ endtype.refID }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateEndTypeToEdit(endtype)"
                  >Edit</a
                >
                <a href="#" @click.prevent="deleteEndType(endtype.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card
          :title="
            endtype.id ? `Edit ${entity} ID#` + endtype.id : `New ${entity}`
          "
        >
          <form @submit.prevent="saveEndType">
            <!-- <b-form-input
              v-if="endtype.id"
              type="text"
              placeholder="ID"
              v-model="endtype.id"
              readonly="readonly"
            ></b-form-input> -->
            <b-form-input
              type="text"
              placeholder="Name"
              v-model="endtype.name"
            ></b-form-input>
            <!-- <b-form-input
              type="text"
              placeholder="RefID"
              v-model="endtype.refID"
              readonly="readonly"
            ></b-form-input> -->
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
import { accountAPI, passwordAPI, loginAPI, endtypeAPI } from "@/api";
import { CheckLoggedIn } from "../auth";
import Context from "../context";
import EndType from "../EndType";
import router from "../router";
export default {
  data() {
    return {
      entity: `EndType`,
      loading: false,
      endtype: new EndType(), //Object.assign({}, cleanEndType),
      endtypes: [],
      context: new Context()
    };
  },
  async created() {
    this.isLoggedIn(
      async () => {
        await this.refreshForm();
      },
      () => {
        router.push({ name: "Login" });
      }
    );
    // this.refreshForm();
  },
  methods: {
    isLoggedIn(suc, fail) {
      CheckLoggedIn(suc, fail);
    },
    async refreshForm() {
      this.loading = true;
      try {
        this.context = await this.context.load();
        this.endtypes = await endtypeAPI.getPerAccount(this.context.account.id);
        this.endtype = await this.endtype.setRefID(this.context.account.id);
      } catch (e) {
        console.log(`failed to get EndTypes from online`, e);
      }
      this.loading = false;
    },
    clearForm() {
      this.loading = true;
      this.endtype = new EndType(); //Object.assign({}, cleanEndType);
      this.loading = false;
    },
    async populateEndTypeToEdit(endtype) {
      this.endtype =  endtype
    },
    async saveEndType() {
      if (this.endtype.id){
        this.endtype = await endtypeAPI.updateEndType(this.endtype.id, this.endtype);
      } else {
        this.endtype = await endtypeAPI.createEndType(this.endtype);
      }
      this.endtype = new EndType(this.context.account.id);
      await this.refreshForm();
    },
    async deleteEndType(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.endtype.id === id) {
          this.endtype = new EndType();
        }
        await endtypeAPI.deleteEndType(id);
        await this.refreshForm();
      }
    }
  }
};
</script>
