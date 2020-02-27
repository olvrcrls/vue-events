import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
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
    beforeEnter: (to, from, next) => {
      store
        .dispatch("event/fetchEvent", to.params.id)
        .then(event => {
          to.params.event = event;
          next();
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    }
  },
  {
    path: "/event/create",
    component: EventCreate,
    name: "event-create"
  },
  {
    path: "/404",
    component: NotFound,
    props: true,
    name: "404"
  },
  {
    path: "network-issue",
    name: "network-issue",
    component: NetworkIssue
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }
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
