<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        style="float:right;"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";
import { mapState } from "vuex";
import store from "@/store";

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch("event/fetchEvents", { page: currentPage })
    .then(() => {
      to.params.page = currentPage;
      next();
    })
    .catch(error => {
      if (!error.response) {
        next({ name: "network-issue" });
      }
      next(false);
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: { EventCard },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    ...mapState({
      event: state => state.event,
      user: state => state.user
    }),
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    }
  }
};
</script>

<style scoped></style>
