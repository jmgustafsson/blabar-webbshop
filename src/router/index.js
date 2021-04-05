import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Checkout from "../views/Checkout.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import History from "../views/History.vue";
import Wildcard from "../views/Wildcard.vue";

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
    path: "/history",
    name: "history",
    component: History,
  },
  {
    path: "*",
    name: "wildcard",
    component: Wildcard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
