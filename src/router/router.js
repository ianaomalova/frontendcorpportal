import { createRouter, createWebHistory } from 'vue-router'
import ModulsTable from "@/components/ModulsTable";
import Moduls from "@/views/ModulsDisciplines";
import ModulsDisciplines from "@/views/ModulsDisciplines";
import Login from "@/views/Login";
import App from "@/App";
import Calendar from "@/views/Calendar";
import Main from "@/views/Main";

const routes = [
  // {
  //   path: '/moduls',
  //   component: Moduls
  // },
  {
    path: '/moduls/:name',
    component: ModulsDisciplines
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/calendar',
    component: Calendar
  },
  {
    path: '/',
    component: Main
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
