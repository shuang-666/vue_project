import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import network from "./network/index";
import users from "./utils/userRegular";
import * as filters from "./filters/index";

// eslint-disable-next-line no-unused-vars
import monent from "moment";
// 课程页面的时间
Vue.filter("dateTime", function(v1) {
  const result = monent(v1).format("MM月DD日 HH:mm");
  return result;
});
// 课程详情页面的时间
Vue.filter("classTime", function(v1) {
  const result = monent(v1*1000).format("YYYY-MM-DD HH:mm");
  return result;
});

Object.keys(filters).forEach(key => {
  console.log("key:", filters[key]);
  Vue.filter(key, filters[key]); //注意：filter不是fillters
});

Vue.config.productionTip = false;
Vue.prototype.$network = network;
Vue.prototype.$uesrs = users;

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import Router from "vue-router";
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
