<template>
  <v-app>
    <v-app-bar app color="purple" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/cm-logo.png"
          transition="scale-transition"
          width="175"
        />
      </div>

      <v-spacer></v-spacer>

      <router-link to="/dashboard" class="routerLink">
        <v-btn text>
          <span class="mr-2">Board</span>
          <v-icon>fa-chart-pie</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/customers" class="routerLink">
        <v-btn text>
          <span class="mr-2">Customers</span>
          <v-icon>fa-address-book</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <nav>
        </nav>
      <router-view/>
    </v-content>
    
    <v-footer padless color="purple">
      <v-col class="text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — Customer Management
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      //
    }),
  };
</script>


<style>
 .routerLink{
     text-decoration: none;
 }
</style>
