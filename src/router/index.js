import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Checkout from "../views/Checkout.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Signed from "../views/Signed.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signed",
    name: "signed",
    component: Signed,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
