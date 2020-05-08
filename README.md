# Customer Client
A simple client for customer management

## Panel
![DashBoard](https://github.com/hasanyelaldi/customer-client/blob/master/src/assets/view.png)
## List
![CustomerList](https://github.com/hasanyelaldi/customer-client/blob/master/src/assets/view2.png)

## Vuetify
Vuetify is a Vue UI Library with beautifully handcrafted Material Components. Install vuetify with command:
```
npm install vuetify
```

## Vue-router
Vue Router is the official router for Vue.js. Install vue-router with command:
```
npm install vue-router
```

## Fontawesome (Free)
You place Font Awesome icons by using the prefix fa and the icon's name. Install fontawesome with command:
```
npm install @fortawesome/fontawesome-free -D
```

## Axios
Promise based HTTP client for the browser and node.js. Install axios with command:
```
npm install axios
```

## Configuration
main.js
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

vuetify.js
```
import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
      },
});
```
