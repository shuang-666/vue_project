import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

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
