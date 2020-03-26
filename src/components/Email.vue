<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">
      {{
        `${entity} : Mangement :: ${context.account.id}-${context.account.uname}`
      }}
    </h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>EndpointType</th>
              <th>refType</th>
              <th>refID</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="email in emails" :key="email.id">
              <td>{{ email.id }}</td>
              <td>{{ email.email }}</td>
              <td>{{ email.endpointType }}</td>
              <td>{{ email.refType }}</td>
              <td>{{ email.refID }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateEmailToEdit(email)">Edit</a>
                <a href="#" @click.prevent="deleteEmail(email.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card
          :title="email.id ? `Edit ${entity} ID#` + email.id : `New ${entity}`"
        >
          <form @submit.prevent="saveEmail">
            <b-form-group label="Email">
              <b-form-input
                type="text"
                placeholder="Email"
                v-model="email.email"
              ></b-form-input>
              <b-form-select
                v-if="!email.endpointType"
                type="text"
                placeholder="EndpointType"
                v-model="email.endpointType"
                :options="[]"
              ></b-form-select>
              <b-form-input
                v-if="!email.refType"
                type="text"
                placeholder="RefType"
                v-model="email.refType"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Other">
              <b-form-input
                v-if="!email.refID"
                type="text"
                placeholder="RefID"
                v-model="email.refID"
              ></b-form-input>
            </b-form-group>
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
import { accountAPI, passwordAPI, loginAPI, emailAPI } from "@/api";
import { CheckLoggedIn } from "../auth";
import router from "../router";
import Context from "../context";
import Email from "../Email";
const refType = "Account";
export default {
  data() {
    return {
      entity: `Email`,
      loading: false,
      context: new Context(),
      email: new Email(),
      emails: []
    };
  },
  async created() {
    await this.refreshForm();
  },
  methods: {
    isLoggedIn() {
      CheckLoggedIn(
        () => {},
        () => {
          router.push({ name: "Login" });
        }
      );
    },
    async refreshForm() {
      this.loading = true;
      this.isLoggedIn();
      try {
        this.context = await this.context.load();
        this.emails = await emailAPI.getPerAccount(this.context.account.id);
        this.email = new Email();
        this.email.setRefID(this.context.account.id, refType);
        // console.info(`loaded all the emails and set the blank`);
        // this.email = this.email.setRefID(this.context.account.id);
      } catch (e) {
        console.error(`failed to get emails from online`, e);
      }
      this.loading = false;
    },
    clearForm() {
      this.loading = true;
      this.email = new Email();
      this.email.setRefID(this.context.account.id, refType)
      this.loading = false;
    },
    async populateEmailToEdit(email) {
      this.email = email; //new Email(email);
    },
    async saveEmail() {
      if (this.email.id) {
        await emailAPI.updateEmail(this.email.id, this.email);
      } else {
        await emailAPI.createEmail(this.email);
      }
      this.email = new Email();
      this.email.setRefID(this.context.account.id, refType)
      await this.refreshForm();
    },
    async deleteEmail(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.email.id === id) {
          this.email = new Email();
        }
        await emailAPI.deleteEmail(id);
        await this.refreshForm();
      }
    }
  }
};
</script>
