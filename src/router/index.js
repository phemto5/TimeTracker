import Vue from "vue";
import Router from "vue-router";
import Help from "@/components/Help";
import Chunk from "@/components/Chunk";
import Customer from "@/components/Customer";
import Contact from "@/components/Contact";
import Timer from "@/components/Timer";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/help",
      name: "Help",
      component: Help
    },
    {
      path: "/chunks",
      name: "Time Managment",
      component: Chunk,
      meta: {}
    },
    {
      path: "/",
      name: "Timer",
      component: Timer,
      meta: {}
    },
    {
      path: "/customers",
      name: "Customer Managment",
      component: Customer,
      meta: {}
    },
    {
      path: "/contacts",
      name: "Contact Managment",
      component: Contact,
      meta: {}
    }
  ]
});
