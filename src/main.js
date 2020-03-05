import Vue from "vue";
import Vuelidate from "vuelidate";
import DateFilter from "./filters/date";
import App from "./App.vue";
import router from "./router";
import store from "./store";
require("@/components/_globals.js");
require("nprogress/nprogress.css");
Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
