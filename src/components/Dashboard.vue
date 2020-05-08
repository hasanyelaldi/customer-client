<template>
    <div>
      <v-row>
        <v-col cols="12" sm="6">
            <v-card class="mx-auto text-center" color="purple" dark max-width="600">
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="valuesOfCountByYear" :labels="labelsOfCountByYear" color="rgba(255, 255, 255, .7)" 
                          height="100" padding="24" stroke-linecap="round" smooth>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="display-1 font-weight-thin">Customer Count By Year</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card class="mx-auto text-center" color="purple" dark max-width="600">
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="valuesOfCountByCountry" :labels="labelsOfCountByCountry" color="rgba(255, 255, 255, .7)" 
                          height="100" padding="24" stroke-linecap="round" smooth>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="display-1 font-weight-thin">Customer Count By Country</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" sm="3">
            <v-card class="mx-auto text-center" color="purple" dark>
                <v-card-text>
                  <v-icon size="60">fa-user-circle</v-icon>
                </v-card-text>
                <v-card-text>
                  <div class="display-1 font-weight-bold">{{ customerLength }}</div>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-card-text>
                      <div class="display-1 font-weight-thin">Customer</div>
                    </v-card-text>
                  </v-sheet>
                </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="mx-auto text-center" color="purple" dark>
                <v-card-text>
                  <v-icon size="60">fa-heart</v-icon>
                </v-card-text>
                <v-card-text>
                  <div class="display-1 font-weight-bold">{{ activecustomerLength }}</div>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-card-text>
                      <div class="display-1 font-weight-thin">Active Customer</div>
                    </v-card-text>
                  </v-sheet>
                </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="mx-auto text-center" color="purple" dark>
                <v-card-text>
                  <v-icon size="60">fa-heartbeat</v-icon>
                </v-card-text>
                <v-card-text>
                  <div class="display-1 font-weight-bold">{{ passivecustomerLength }}</div>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-card-text>
                      <div class="display-1 font-weight-thin">Passive Customer</div>
                    </v-card-text>
                  </v-sheet>
                </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3">
            <v-card class="mx-auto text-center" color="purple" dark>
                <v-card-text>
                  <v-icon size="60">fa-university</v-icon>
                </v-card-text>
                <v-card-text>
                  <div class="display-1 font-weight-bold">{{ countryLength }}</div>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-card-text>
                      <div class="display-1 font-weight-thin">Total Country</div>
                    </v-card-text>
                  </v-sheet>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
    </div>
</template>


<script>
    import http from "../http-common";
    export default {  
    data: () => ({
      countries: [],
      customers: [],
      customerCountByYears: [],
      customerCountByCountries: []
    }),

    created () {
      this.retrieveCustomers()
    },

    watch: {
      customers(){
        this.customerCountForYear()
        this.retrieveCountries()
      },
      countries(){
        this.customerCountForCountry()
      }
    },

    computed: {
      valuesOfCountByYear() {
        return this.customerCountByYears.map(x=>x.count);
      },
      labelsOfCountByYear() {
        return this.customerCountByYears.map(x=>x.year);
      },
      valuesOfCountByCountry() {
        return this.customerCountByCountries.map(x=>x.count);
      },
      labelsOfCountByCountry() {
        return this.customerCountByCountries.map(x=>x.country);
      },
      countryLength(){
        return this.countries.length;
      },
      customerLength(){
        return this.customers.length;
      },
      activecustomerLength(){
        return this.customers.filter(customer => customer.active == true).length;
      },
      passivecustomerLength(){
        return this.customers.filter(customer => customer.active == false).length;
      }
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

      customerCountForYear() {
          var customers = this.customers;
          var years = [];
          
          customers.forEach(customer => {
            var year = parseInt(customer.createdTime.slice(0,4));
            if(!years.includes(year)){
                years.push(year);
            }
          });

          years.forEach(targetYear => {
              var counter = 0;
              var customerCountByYear = {
                year: 0,
                count: 0
              };
              customers.forEach(customer => {
                if(parseInt(customer.createdTime.slice(0,4)) == targetYear ){
                  counter = counter + 1;
                }
              });
              if(counter > 0){
                customerCountByYear.year = targetYear;
                customerCountByYear.count = counter;
                this.customerCountByYears.push(customerCountByYear);
              }
          });
      },
      customerCountForCountry(){
        var customers = this.customers;
        var countries = this.countries;

        countries.forEach(country => {
          var counter = 0;
          var customerCountByCountry = {
            country: '',
            count: 0
          };
          customers.forEach(customer => {
            if(customer.address.country.id == country.id){
              counter++;
            }
          });
          
          if(counter > 0){
                customerCountByCountry.country = country.name;
                customerCountByCountry.count = counter;
                this.customerCountByCountries.push(customerCountByCountry);
          }
        });
      }
    }
  }
</script>