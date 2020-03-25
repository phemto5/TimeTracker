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
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Customer ID</th>
              <th>Addresses</th>
              <th>Phones</th>
              <th>Email</th>
              <th>Web Sites</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td>{{ contact.id }}</td>
              <td>{{ contact.fname }}</td>
              <td>{{ contact.mname }}</td>
              <td>{{ contact.lname }}</td>
              <td>{{ contact.customerId }}</td>
              <td>{{ contact.addresses }}</td>
              <td>{{ contact.phones }}</td>
              <td>{{ contact.emails }}</td>
              <td>{{ contact.webSites }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateContactToEdit(contact)"
                  >Edit</a
                >
                <a href="#" @click.prevent="deleteContact(contact.id)"
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
            contact.id ? `Edit ${entity} ID#` + contact.id : `New ${entity}`
          "
        >
          <form @submit.prevent="saveContact">
            <b-form-group label="Contact Name">
              <b-form-text>{{ contact.id }}</b-form-text>
              <b-form-input
                type="text"
                placeholder="First Name"
                v-model="contact.fname"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Middle Name"
                v-model="contact.mname"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Last Name"
                v-model="contact.lname"
              ></b-form-input>
            </b-form-group>
            <!-- <b-form-group label="Customer Name">
              <b-form-select
                :options="customers"
                type="text"
                placeholder="Customer"
                v-model="contact.customerId"
              ></b-form-select> -->
            <b-form-group label="Addresses">
              <!-- <b-form-textarea rows="4" v-model="model.addresses"></b-form-textarea> -->
            </b-form-group>
            <b-form-group label="Phones">
              <!-- <b-form-input type="text" v-model="model.tag"></b-form-input> -->
            </b-form-group>
            <b-form-group label="Emails">
              <!-- <b-form-input type="text" v-model="model.tag"></b-form-input> -->
            </b-form-group>
            <b-form-group label="Websites">
              <!-- <b-form-input type="text" v-model="model.tag"></b-form-input> -->
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
import { contactAPI, customerAPI } from "@/api";
import Context from "@/context";
import Contact from "../Contact";
import router from "../router";
import { CheckLoggedIn } from "../auth";

export default {
  data() {
    return {
      entity: `Contact`,
      loading: false,
      context: new Context(),
      contact: new Contact(),
      contacts: []
    };
  },
  async created() {
    this.refreshContacts();
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
    async refreshContacts() {
      this.loading = true;
      this.isLoggedIn();
      try {
        this.context = await this.context.load();
        this.contacts = await contactAPI.getPerAccount(this.context.account.id);
        this.contact = new Contact();
      } catch (e) {
        console.log("The Contacts were not able to load");
      }
      this.loading = false;
    },
    async populateContactToEdit(contact) {
      let selected = this.contacts.filter(
        cust => cust.text === contact.customerId
      );
      this.contact = Object.assign({}, contact);
      if (selected.length != 0) {
        this.contact = Object.assign(this.context.entity, {
          customerId: selected[0].value
        });
      }
    },
    async saveContact() {
      if (this.contact.id) {
        this.contact = await contactAPI.updateContact(
          this.contact.id,
          this.contact
        );
      } else {
        this.contact = await contactAPI.createContact(this.contact);
      }
      // this.contact = new Contact();
      await this.refreshContacts();
    },
    async deleteContact(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.contact.id === id) {
          this.contact = new Contact();
        }
        await contactAPI.deleteContact(id);
        await this.refreshContacts();
      }
    }
  }
};
</script>
