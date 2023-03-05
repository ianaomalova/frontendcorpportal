import { createRouter, createWebHistory } from 'vue-router'
import ModulsTable from "@/components/ModulsTable";
import Moduls from "@/views/ModulsDisciplines";
import ModulsDisciplines from "@/views/ModulsDisciplines";

const routes = [
  // {
  //   path: '/moduls',
  //   component: Moduls
  // },
  {
    path: '/moduls/:name',
    component: ModulsDisciplines
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
