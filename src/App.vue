<template>
  <NavBar v-if="access" :disciplines="disciplines"></NavBar>
  <router-view/>
</template>

<script>
  import NavBar from "@/components/NavBar";
  export default {
    // props: ['isLoggedIn'],
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
        const isLoggedIn = this.$store.getters.isLoggedIn;
        if (isLoggedIn) {
          this.access = true;
        } else {
          this.access = false;
          this.$router.push('/login')
        }
      }
    },

    created() {
      this.initDisciplines();
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
