import { createStore } from 'vuex'
import auth from "@/store/modules/auth";

export default createStore({
  modules: {
    auth
  }
})
