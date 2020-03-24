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
              <th>Contacts</th>
              <th>Addresses</th>
              <th>Phones</th>
              <th>Email</th>
              <th>Web Sites</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.id }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.contacts }}</td>
              <td>{{ customer.addresses }}</td>
              <td>{{ customer.phones }}</td>
              <td>{{ customer.emails }}</td>
              <td>{{ customer.webSites }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateCustomerToEdit(customer)"
                  >Edit</a
                >
                <a href="#" @click.prevent="deleteCustomer(customer.id)"
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
            customer.id ? `Edit ${entity} ID#` + customer.id : `New ${entity}`
          "
        >
          <form @submit.prevent="saveCustomer">
            <b-form-group label="Customer Name">
              <b-form-input type="text" v-model="customer.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Contacts">
              <!-- <b-list-group>
                <b-list-group-item></b-list-group-item>
              </b-list-group> -->
              <!-- <b-form-input type="text" v-model="model.tag"></b-form-input> -->
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
import { customerAPI, contactAPI } from "@/api";
import router from "../router";
const cleanCustomer = {
  name: "",
  id: 0
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
      entity: "Customer",
      loading: false,
      customers: [],
      customer: Object.assign({}, cleanCustomer),
      account: Object.assign({}, cleanAccount)
    };
  },
  async created() {
    let localAccount = JSON.parse(localStorage.getItem("account"));
    if (!localAccount) {
      router.push({ name: "Login" });
    }
    this.refreshCustomers();
  },
  methods: {
    async refreshCustomers() {
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
          this.customers = await customerAPI.getCustomersPerAccount();
          // this.customers.forEach(cust => {
          //   let custCon = this.contacts.filter(
          //     contact => contact.customerId == cust.id
          //   );
          //   cust.contacts = custCon.reduce(
          //     (list, con) => list + "'" + con.fname + " " + con.lname + "'",
          //     ""
          //   );
          // });
        } catch (e) {
          console.log(`failed to get Account from online`, e);
          this.state = "Offline";
        }
      } else {
        this.account = cleanAccount;
      }
      this.loading = false;
    },
    async populateCustomerToEdit(customer) {
      this.customer = Object.assign({}, customer);
    },
    async saveCustomer() {
      if (this.customer.id) {
        await customerAPI.updateCustomer(this.customer.id, this.customer);
      } else {
        await customerAPI.createCustomer(this.customer);
      }
      this.customer = cleanCustomer;
      await this.refreshCustomers();
    },
    async deleteCustomer(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.customer.id === id) {
          this.customer = cleanCustomer;
        }
        await customerAPI.deleteCustomer(id);
        await this.refreshCustomers();
      }
    }
  }
};
</script>
