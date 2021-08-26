import Vue from 'vue'
import "./assets/theme/style.css";
import ElementUI from 'element-ui';
import App from './App.vue'


import Contacts from './page/contacts/main.vue';
import Message from './page/message/message.vue';
import Intro from './page/intro/intro.vue';
import Media from './page/media/media.vue';
import Title from './components/title.vue';
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
        default: Contacts,
        title: Title
      },
      content: {
        title: '组织架构树',
        desc: '拉取企业通讯录的组织架构数，可以预览部门和成员的详情，对成员信息进行编辑，对部门进行成员的添加、删除、移动等操作'
      }
    },
    {
      name: 'intro',
      path: '/intro',
      components: {
        default: Intro,
        title: Title
      },
      content: {
        title: '组织架构树',
        desc: '拉取企业通讯录的组织架构数，可以预览部门和成员的详情，对成员信息进行编辑，对部门进行成员的添加、删除、移动等操作'
      }
    },
    {
      name: 'message',
      path: '/message',
      components: {
        default: Message,
        title: Title
      },
      content: {
        title: '消息推送',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    },
    {
      name: 'media',
      path: '/media',
      components: {
        default: Media,
        title: Title
      },
      content: {
        title: '素材管理',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    }
  ]
  }),
  render: h => h(App),
}).$mount('#app')
