import Vue from 'vue'
import "./assets/theme/style.css";
import ElementUI from 'element-ui';
import App from './App.vue'


import Contacts from './page/contacts/main.vue';
import Message from './page/message/message.vue';
import External from './page/external/index.vue';
import Intro from './page/intro/intro.vue';
import Media from './page/media/media.vue';


import vueRouter from 'vue-router';



Vue.config.productionTip = false;
Vue.use(vueRouter);
Vue.use(ElementUI);

new Vue({
  router: new vueRouter({
    routes: [{
      name: 'contacts',
      path: '/contacts',
      components: {
        default: Contacts
      },
    },
    {
      name: 'intro',
      path: '/intro',
      components: {
        default: Intro,
      },
    },
    {
      name: 'message',
      path: '/message',
      components: {
        default: Message,
      },
    },
    {
      name: 'external',
      path: '/external',
      components: {
        default: External,
      }
    },
    {
      name: 'media',
      path: '/media',
      components: {
        default: Media
      }
    }
    
  ]
  }),
  render: h => h(App),
}).$mount('#app')
