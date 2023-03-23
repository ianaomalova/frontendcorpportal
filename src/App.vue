<template>
  <NavBar v-if="access" :disciplines="disciplines"></NavBar>
  <h1>App</h1>
  <h2 v-if="access">Вы авторизованы local</h2>
  <h2 v-if="this.$store.getters.isLoggedIn">Вы авторизованы store</h2>
  <router-view/>
</template>

<script>
  import NavBar from "@/components/NavBar";
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        disciplines: [],
        access: false,
      }
    },
    methods: {
      initDisciplines() {
        this.disciplines = ['Технические средства информационных систем',
          'Программирование',
          'Управление проектами', 'ООП']
      },
      checkLoginStatus() {
        console.log("AppCheck")
        const isLoggedIn = this.$store.getters.isLoggedIn;
        const isLog = localStorage.getItem('isLoggedIn')
        if (isLoggedIn || isLog) {
          this.initDisciplines();
          this.access = true;
        } else if(isLoggedIn === false && isLog){
          this.$store.dispatch('updateIsLogIn', true);
          this.initDisciplines();
          this.access = true;
        } else {
          this.access = false;
          this.$router.push('/login')
        }
        console.log(isLoggedIn)
        console.log(isLog)
      }
    },

    created() {
      // this.initDisciplines();
      this.checkLoginStatus()
    },
    watch: {
      $store: {
        handler() {
          this.checkLoginStatus();
        },
        deep: true,
      },

    },



  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
