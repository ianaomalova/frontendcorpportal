import axios from "axios";

export default {
    state: {
        isLoggedIn: false
    },
    actions: {
       async axiosLogIn(ctx, form) {
           const login = form.login;
           const password = form.password;
           const response = await axios.get("https://localhost:5001/authorization", {
               params: {
                   login,
                   password
               }
           })
           const data = response.data;
           console.log(data);
           if(data) {
               ctx.commit('updateIsLogIn', data)
           }

       },
    },
    mutations: {
        updateIsLogIn(state, isLogIn) {
            state.isLoggedIn = true;
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    }
}