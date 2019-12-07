<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Contact Manger</h1>
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
        <b-card :title="model.id ? 'Edit Post ID#' + model.id : 'New Post'">
          <form @submit.prevent="saveContact">
            <b-form-group label="Contact Name">
              <b-form-input
                type="text"
                placeholder="First Name"
                v-model="model.fname"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Middle Name"
                v-model="model.mname"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Last Name"
                v-model="model.lname"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Customer Name">
              <b-form-select
                :options="customers"
                type="text"
                placeholder="Customer"
                v-model="model.customerId"
              ></b-form-select>
            </b-form-group>
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
const NewContact = Object.assign({});
export default {
  data() {
    return { loading: false, contacts: [], customers: [], model: NewContact };
  },
  async created() {
    this.refreshContacts();
  },
  methods: {
    async refreshContacts() {
      this.loading = true;
      let custs = await customerAPI.getCustomers();
      this.customers = custs.map(cust => {
        return { value: cust.id, text: cust.name };
      });
      let conts = await contactAPI.getContacts();
      this.contacts = conts.map(cont => {
        if (custs.length != 0) {
          let c = custs.filter(cust => cust.id === cont.customerId);
          cont.customerId = c[0].name;
        }
        return cont;
      });
      this.loading = false;
    },
    async populateContactToEdit(contact) {
      let selected = this.customers.filter(
        cust => cust.text === contact.customerId
      );
      this.model = Object.assign({}, contact, {
        customerId: selected[0].value
      });
    },
    async saveContact() {
      if (this.model.id) {
        await contactAPI.updateContact(this.model.id, this.model);
      } else {
        await contactAPI.createContact(this.model);
      }
      this.model = NewContact;
      await this.refreshContacts();
    },
    async deleteContact(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.model.id === id) {
          this.model = NewContact;
        }
        await contactAPI.deleteContact(id);
        await this.refreshContacts();
      }
    }
  }
};
</script>
