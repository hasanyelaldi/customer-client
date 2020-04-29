import Vue from "vue";
import Router from "vue-router";
import CustomersList from "./components/CustomersList.vue";
import Dashboard from "./components/Dashboard.vue";
 
Vue.use(Router);
 
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/customers",
      name: "customers",
      component: CustomersList,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    }
  ]
});