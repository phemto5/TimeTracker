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
            <tr v-for="matter in matters" :key="matter.id">
              <td>{{ matter.id }}</td>
              <td>{{ matter.name }}</td>
              <td>{{ matter.refID }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateMatterToEdit(matter)"
                  >Edit</a
                >
                <a href="#" @click.prevent="deleteMatter(matter.id)">Delete</a>
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
import Context from "../context";
import Matter from "../Matter";
import router from "../router";
export default {
  data() {
    return {
      entity: `Matter`,
      loading: false,
      matter: new Matter(), //Object.assign({}, cleanMatter),
      matters: [],
      context: new Context()
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
      this.context.load();
      try {
        this.matters = await matterAPI.getPerAccount(this.context.account.id);
        await this.matter.setRefID(this.context.account.id);
      } catch (e) {
        console.log(`failed to get Matters from online`, e);
      }
      this.loading = false;
    },
    clearForm() {
      this.loading = true;
      this.matter = new Matter(); //Object.assign({}, cleanMatter);
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
