import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //ip:'http://192.168.1.6:8000',
    ip:'http://localhost:8000',
    drawerClient:false,
    drawer:false,
    token:'',
    session:null,
    notification:0,
  },
  mutations: {
    pushDrawerClient(state,payload){
      state.drawerClient=payload;
    },
    pushDrawer(state,payload){
      state.drawer=payload;
    },
    pushToken(state,payload){
      state.token=payload;
    },
    pushSession(state,payload){
      state.session=payload;
    },
    pushNotification(state,payload){
      state.notification=payload;
    },
    pushSessionAvatar(state,payload){
      state.session.avatar=payload;
    },
  },
  actions: {
    getPermissions({commit}){
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          data:null,
          url:'http://localhost:8000/data',
        }).then(response=>{
          commit("pushSession", response.data.data);
          resolve();
        }).catch(err=>{
          console.log(err);
        });
      });
    }
  },
  modules: {
  }
})
