import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null,
    userId:null
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    
    logout: (state) => {
      state.accessToken = null;
      state.userId = null;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios.post('http://localhost:3000/users/login', {
        ...loginData
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('accessToken', response.data.token_userId[0]);
        localStorage.setItem('userId',response.data.token_userId[1])
        commit('loginStop', null);
        commit('updateAccessToken', response.data.token_userId[0]);
        router.push('/contacts');
      })
      .catch(error => {
        commit('loginStop', error.response.data.error.message);
        commit('updateAccessToken', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      commit('logout');
      router.push('/signin');
    }
  }
})