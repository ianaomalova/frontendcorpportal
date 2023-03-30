import axios from "axios";
import {getAuth} from "@/api/ModulsTable";

export default {

    state: {
        isLoggedIn: localStorage.getItem('isLoggedIn')
    },
    actions: {
       async axiosLogIn(ctx, form) {
           const login = form.login;
           const password = form.password;
           // const response = await axios.get("https://localhost:5001/authorization", {
           //     params: {
           //         login,
           //         password
           //     }
           // })
           const response = await getAuth({login: 'admin', password: 'admin'});
           const data = response.data;
           console.log(data); // должен быть выведен "Чеканин В. А."
           //console.log(data);
           if(data !== 'false') {
               localStorage.setItem('user', data);
               ctx.commit('updateIsLogIn', true)
           }

       },
        logout(ctx, router) {
            localStorage.removeItem('isLoggedIn');
            ctx.commit('updateIsLogIn', false)
            router.push('/login')
        }
    },
    mutations: {
        updateIsLogIn(state, isLogIn) {
            state.isLoggedIn = isLogIn;
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    }
}