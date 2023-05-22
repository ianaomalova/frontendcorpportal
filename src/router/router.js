import { createRouter, createWebHistory } from 'vue-router'
import ModulsTable from "@/components/ModulsTable";
import Moduls from "@/views/ModulsDisciplines";
import ModulsDisciplines from "@/views/ModulsDisciplines";
import Login from "@/views/Login";
import App from "@/App";
import Calendar from "@/views/Calendar";
import Main from "@/views/Main";
import { auth } from './auth.js';
import News from "@/views/News";
import Ads from "@/views/Ads"
import DetailsNews from "@/views/DetailsNews";
import Admin from "@/views/Admin.vue";
import Teachers from "@/views/Teachers";
import TeachesrDetails from "@/views/TeachesrDetails";

const routes = [
  // {
  //   path: '/moduls',
  //   component: Moduls
  // },
  {
    path: '/moduls/:name',
    component: ModulsDisciplines,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/calendar',
    component: Calendar,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: Main,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '/ads',
    component: Ads
  },
  {
    path: '/news/details/:id',
    name: 'DetailsNews',
    component: DetailsNews
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/teachers',
    component: Teachers
  },
  {
    path: '/teachers/details/:name',
    component: TeachesrDetails
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    next('/login'); // Если пользователь не авторизован, перенаправляем на страницу логина
  } else {
    next(); // Иначе продолжаем нормальный переход
  }
});

export default router
