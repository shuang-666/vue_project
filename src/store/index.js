import Vue from "vue";
import Vuex from "vuex";
import network from "../network/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    banner: [], //轮播图的数据
    indexList: [] //首页的全部数据
  },
  mutations: {
    // 轮播图的数据
    BANNER_LIST(state, item) {
      state.banner = [...item];
    },
    // 底部的数据
    INDEX_LIST_DATA(state, item) {
      state.indexList = [...item];
    }
  },
  actions: {
    // 轮播图的数据
    BANNER_LIST(context) {
      network.getBanner().then(res => {
        // console.log(res.data.data);
        if (res.data.code == 200) {
          context.commit("BANNER_LIST", res.data.data);
        } else {
          console.lof("banner数据报错");
        }
      });
    },
    // 底部的全部数据
    INDEX_LIST_DATA(context) {
      network.getIndexList().then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          context.commit("INDEX_LIST_DATA", res.data.data);
        } else {
          console.log("数据报错");
        }
      });
    }
  },
  modules: {}
});
