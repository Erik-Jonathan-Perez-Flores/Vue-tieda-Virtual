import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import moment from 'moment';
import VueMoment from 'vue-moment';
require('moment/locale/es');
moment.locale('es');
Vue.use(VueMoment, { moment });

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'
//axios.defaults.headers.common['x-csrf-token'] = readCookie('XSRF-TOKEN')
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')