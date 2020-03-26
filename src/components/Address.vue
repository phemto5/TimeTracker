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
              <b-form-select
                v-if="!address.endpointType"
                type="text"
                placeholder="EndpointType"
                v-model="address.endpointType"
                :options="[]"
              ></b-form-select>
              <b-form-input
                v-if="!address.refType"
                type="text"
                placeholder="RefType"
                v-model="address.refType"
              ></b-form-input>
              <b-form-input
                v-if="!address.refID"
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
import Context from "../context";
import Address from "../Address";
const refType = "Account";
export default {
  data() {
    return {
      entity: `Address`,
      loading: false,
      context: new Context(),
      address: new Address(),
      addresses: []
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
        this.addresses = await addressAPI.getPerAccount(
          this.context.account.id
        );
        this.address = new Address();
        this.address.setRefID(this.context.account.id, refType);
        // console.info(`loaded all the addresses and set the blank`);
        // this.address = this.address.setRefID(this.context.account.id);
      } catch (e) {
        console.erro(`failed to get Addresses from online`, e);
      }
      this.loading = false;
    },
    clearForm() {
      this.loading = true;
      this.address = new Address(this.context.account.id, refType);
      this.loading = false;
    },
    async populateAddressToEdit(address) {
      this.address = address; //new Address(address);
    },
    async saveAddress() {
      if (this.address.id) {
        await addressAPI.updateAddress(this.address.id, this.address);
      } else {
        await addressAPI.createAddress(this.address);
      }
      this.address = new Address(this.context.account.id, refType);
      await this.refreshForm();
    },
    async deleteAddress(id) {
      if (confirm("Are you sure you want to delete it ???")) {
        if (this.address.id === id) {
          this.address = new Address();
        }
        await addressAPI.deleteAddress(id);
        await this.refreshForm();
      }
    }
  }
};
</script>
