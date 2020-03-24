<template>
  <div class="container-fluid mt-4">
    <h1 class="PageHead bg-dark">{{ `${entity} : Mangement :: ${account.id}-${account.uname}`  }}</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>street1</th>
              <th>street2</th>
              <th>city</th>
              <th>state</th>
              <th>country</th>
              <th>zip</th>
              <th>endpointType</th>
              <th>refType</th>
              <th>refID</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="address in addresses" :key="address.id">
              <td>{{ address.id }}</td>
              <td>{{ address.street1 }}</td>
              <td>{{ address.street2 }}</td>
              <td>{{ address.city }}</td>
              <td>{{ address.state }}</td>
              <td>{{ address.counrty }}</td>
              <td>{{ address.zip }}</td>
              <td>{{ address.endpointType }}</td>
              <td>{{ address.refType }}</td>
              <td>{{ address.refID }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateAddressToEdit(address)"
                  >Edit</a
                >
                <a href="#" @click.prevent="deleteAddress(address.id)"
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
            address.id ? `Edit ${entity} ID#` + address.id : `New ${entity}`
          "
        >
          <form @submit.prevent="saveAddress">
            <b-form-group label="Address">
              <b-form-input
                type="text"
                placeholder="Street 1"
                v-model="address.street1"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Street 2"
                v-model="address.street2"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="City"
                v-model="address.city"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="State"
                v-model="address.state"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Country"
                v-model="address.country"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="Zip"
                v-model="address.zip"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Other">
              <b-form-input
                type="text"
                placeholder="EndpointType"
                v-model="address.endpointType"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="RefType"
                v-model="address.refType"
              ></b-form-input>
              <b-form-input
                type="text"
                placeholder="RefID"
                v-model="address.refID"
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
import { accountAPI, passwordAPI, loginAPI, addressAPI } from "@/api";
import { CheckLoggedIn } from "../auth";
import router from "../router";
const cleanAddress = {
  street1: "",
  street2: "",
  city: "",
  country: "",
  state: "",
  zip: "",
  endpointType: 0,
  refType: "",
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
      entity: `Address`,
      loading: false,
      account: Object.assign({}, cleanAccount),
      address: Object.assign({}, cleanAddress),
      addresses: []
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
          this.addresses = await addressAPI.getAddressesPerAccount(this.account.id);
          this.address = Object.assign({},cleanAddress,{refID:this.account.id});
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
      this.account = Object.assign({}, cleanAccount);
      this.address = Object.assign({}, cleanAddress);
      this.loading = false;
    },
    async populateAddressToEdit(address) {
      this.address = Object.assign({}, cleanAddress,address,{refID:this.account.id});
    },
    async saveAddress() {
      if (this.address.id) {
        await addressAPI.updateAddress(this.address.id, this.address);
      } else {
        await addressAPI.createAddress(this.address);
      }
      this.address = cleanAddress;
      await this.refreshForm()
    },
    async deleteAddress(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.address.id === id) {
          this.address = cleanAddress;
        }
        await contactAPI.deleteContact(id);
        await this.refreshForm();
      }
    }
  }
};
</script>
