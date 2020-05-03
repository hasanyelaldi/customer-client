<template>
    <v-row>
        <v-col cols="6" sm="6">
            <v-card class="mx-auto text-center" color="purple" dark max-width="600">
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="valuesOfCountByYear" :labels="labelsOfCountByYear" color="rgba(255, 255, 255, .7)" 
                          height="100" padding="24" stroke-linecap="round" smooth>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="display-1 font-weight-thin">Count By Year</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="6" sm="6">
            <v-card class="mx-auto text-center" color="purple" dark max-width="600">
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="valuesOfCountByYear" :labels="labelsOfCountByYear" color="rgba(255, 255, 255, .7)" 
                          height="100" padding="24" stroke-linecap="round" smooth>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="display-1 font-weight-thin">Count By Year</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block text>Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>


<script>
    import http from "../http-common";
    export default {  
    data: () => ({
      value: [100, 22, 43, 8],
      customerCountByYears: [],
      customers: []
    }),

    created () {
      this.retrieveCustomers();
    },

    watch: {
      customers(){
        this.customerCountForYear();
      }
    },

    computed: {
      valuesOfCountByYear() {
        return this.customerCountByYears.map(x=>x.count);
      },
      labelsOfCountByYear() {
        return this.customerCountByYears.map(x=>x.year);
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
                  //console.log(year + " ---> " + sum);
                }
              });
              if(counter > 0){
                //console.log(year + " ---> " + count);
                customerCountByYear.year = targetYear;
                customerCountByYear.count = counter;

                console.log("object ---> " + customerCountByYear.year + "-" + customerCountByYear.count);
                this.customerCountByYears.push(customerCountByYear);
              }
          });

          console.log(this.customerCountByYears);
      }
    }
  }
</script>