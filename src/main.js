import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {
  api
} from './plugins/axios';

Vue.config.productionTip = false

new Vue({
  vuetify,
  api,
  render: h => h(App)
}).$mount('#app')