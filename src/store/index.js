import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const storeData = {
    state: {
        admin: "",
        isLogOut: false
    },
    getters: {
        user: state => state.admin
    },
    mutations: {
        TOGGLE_ADMIN(state, admin) {
            state.admin = admin;
        },
        TOGGLE_LOGOUT(state) {
            state.isLogOut = !state.isLogOut
        }
    }
}
const store = new Vuex.Store(storeData)
export default store