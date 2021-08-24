import Vue from 'vue'
import "./assets/theme/style.css";
import ElementUI from 'element-ui';
import App from './App.vue'


import Contacts from './page/contacts/main.vue';
import Intro from './page/intro/intro.vue';

import vueRouter from 'vue-router';



Vue.config.productionTip = false;
Vue.use(vueRouter);
Vue.use(ElementUI);

new Vue({
  router: new vueRouter({
    routes: [{
      path: '/contacts',
      component: Contacts,
    },
    {
      path: '/intro',
      component: Intro,
    }
  ]
  }),
  render: h => h(App),
}).$mount('#app')
