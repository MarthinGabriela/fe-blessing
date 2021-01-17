import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Vue from 'vue';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})

export const Store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        token: ''
    },
    getters: {
        token: (state) => state.token,
        isAuthenticated: (state) => {
            return !!state.token;
        }
    },
    mutations: {
        logout (state) {
            state.token = '';
        },
        setToken (state, token) {
            state.token = token
        },
    }
})
