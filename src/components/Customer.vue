<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Customer Manger</h1>
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
        <b-card :title="model.id ? 'Edit Post ID#' + model.id : 'New Post'">
          <form @submit.prevent="saveCustomer">
            <b-form-group label="Customer Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
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
import { customerAPI, contactAPI } from '@/api'
import router from '../router'
const NewCustomer = Object.assign({})

export default {
  data() {
    return {
      loading: false,
      customers: [],
      model: NewCustomer
    }
  },
  async created() {
    let localAccount = JSON.parse(localStorage.getItem('account'))
    if (!localAccount) {
      router.push({ name: 'Login' })
    }
    this.refreshCustomers()
  },
  methods: {
    async refreshCustomers() {
      this.loading = true
      this.contacts = await contactAPI.getContacts()
      this.customers = await customerAPI.getCustomers()
      this.customers.forEach(cust => {
        let custCon = this.contacts.filter(
          contact => contact.customerId == cust.id
        )
        cust.contacts = custCon.reduce(
          (list, con) => list + "'" + con.fname + ' ' + con.lname + "'",
          ''
        )
      })
      this.loading = false
    },
    async populateCustomerToEdit(customer) {
      this.model = Object.assign({}, customer)
    },
    async saveCustomer() {
      if (this.model.id) {
        await customerAPI.updateCustomer(this.model.id, this.model)
      } else {
        await customerAPI.createCustomer(this.model)
      }
      this.model = NewCustomer
      await this.refreshCustomers()
    },
    async deleteCustomer(id) {
      if (confirm('Are you sure you want to delete it ???')) {
        if (this.model.id === id) {
          this.model = NewCustomer
        }
        await customerAPI.deleteCustomer(id)
        await this.refreshCustomers()
      }
    }
  }
}
</script>
