import Vue from "vue";
import Vuex from "vuex";
import network from "../network/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    banner: [] //轮播图的数据
  },
  mutations: {
    BANNER_LIST(state, item) {
      state.banner = [...item];
    }
  },
  actions: {
    BANNER_LIST(context) {
      network.getBanner().then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) {
          context.commit("BANNER_LIST", res.data.data);
        } else {
          console.lof("banner数据报错");
        }
      });
    }
  },
  modules: {}
});
