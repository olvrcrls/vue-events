import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";
import NProgress from "nprogress";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    alias: "events",
    props: true
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
    alias: "/event",
    beforeEnter: (to, from, next) => {
      store.dispatch("event/fetchEvent", to.params.id).then(event => {
        to.params.event = event;
        next();
      });
    }
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

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
