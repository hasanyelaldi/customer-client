<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    item-key="id"
    :search="search"
    :expanded.sync="expanded"
    show-expand
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat col or="white">
        <v-toolbar-title ><strong>Customer List</strong></v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details rounded filled></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="purple" dark class="mb-2" v-on="on">New Customer</v-btn>
          </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedCustomer.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedCustomer.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedCustomer.age" label="Age"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field v-model="editedCustomer.address.phone" label="Phone"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field v-model="editedCustomer.address.city" label="City"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <!--<v-text-field v-model="editedCustomer.address.country" label="Country"></v-text-field>-->
                      <v-overflow-btn class="my-2" v-model="editedCustomer.address.countryId" 
                        :items="countries" editable item-value="id" item-text="name">
                      </v-overflow-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedCustomer.address.location" label="Location"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col>
                      <v-switch v-model="editedCustomer.active" label="Active" color="purple" hide-details></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.active="{ item }">
        <v-simple-checkbox v-model="item.active" disabled></v-simple-checkbox>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editCustomerDialog(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteCustomer(item)">mdi-delete</v-icon>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td><strong>Phone :</strong>{{ item.address.phone }}</td>
      <td >{{ item.address.location }} <strong>{{ item.address.city }} / {{ item.address.country.name }}</strong></td>
    </template>
	
    <template v-slot:no-data>
      <v-btn color="purple white--text" @click="refreshList">Refresh</v-btn>
    </template>
	
  </v-data-table>
</template>
 
<script>
  import http from "../http-common";
  export default {
    data: () => ({
      expanded: [],
      countries: [],
      search: '',
      dialog: false,
      headers: [
        { text: 'Name', align: 'start', value: 'name'},
        { text: 'Email', value: 'email' },
        { text: 'Age', value: 'age' },
        { text: 'Status', value: 'active', sortable: false },
        { text: 'Actions',  align: 'right', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' }
      ],
      customers: [],
      editedId: -1,
      editedCustomer: {
        name: '',
        email: '',
        age: 0,
        address: {
          phone: '',
          city: '',
          countryId: -1,
          location: ''
        },
        active: false
      },
      defaultCustomer: {
        name: '',
        email: '',
        age: 0,
        address: {
          phone: '',
          city: '',
          countryId: -1,
          location: ''
        },
        active: false
      }
    }),

    computed: {
      formTitle () {
        return this.editedId === -1 ? 'New Customer' : 'Edit Customer'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.retrieveCustomers(),
      this.retrieveCountries()
    },

    methods: {
      retrieveCustomers() {
        http
          .get("/customers")
          .then(response => {
            this.customers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      retrieveCountries() {
        http
          .get("/countries")
          .then(response => {
            this.countries = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      refreshList() {
        this.retrieveCustomers();
      },

      deleteCustomer (customer) {
        confirm('Are you sure you want to delete this item?') &&
        http
        .delete("/deleteCustomer/" + customer.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
        
      },

      editCustomerDialog (customer) {
        this.editedId = customer.id
        this.editedCustomer = Object.assign({}, customer)
        this.dialog = true
      },

      editCustomer (customerId, editedCustomer) {
        http
        .put("/customer/" + customerId, editedCustomer)
        .then(response => {
          console.log(response.data);
          this.editedCustomer = Object.assign({}, this.defaultCustomer)
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      },

      createCustomer (editedCustomer) {
        http
        .post("/customer", editedCustomer)
        .then(response => {
          console.log(response.data);
          this.editedCustomer = Object.assign({}, this.defaultCustomer)
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedCustomer = Object.assign({}, this.defaultCustomer)
          this.editedId = -1
        }, 300)
      },

      save () {
        if (this.editedId > -1) {
          this.editCustomer (this.editedId, this.editedCustomer)
        } else {
          this.createCustomer(this.editedCustomer)
        }
        this.close()
      },
    }
  }
</script>

<style scoped>
 .v-text-field{
   width: 300px;
   overflow: hidden;
}
</style>