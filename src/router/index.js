import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList
  },
  {
    path: "/event/:id",
    name: "event-show",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/EventShow.vue"),
    component: EventShow,
    props: true,
    alias: "/event"
  },
  {
    path: "/event/create",
    component: EventCreate,
    name: "event-create"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
