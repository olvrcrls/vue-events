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
    <template v-if="this.event.eventsTotal > this.page * 3">
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
export default {
  components: { EventCard },
  created() {
    this.$store.dispatch("event/fetchEvents", { perPage: 3, page: this.page });
  },
  computed: {
    ...mapState({
      event: state => state.event,
      user: state => state.user
    }),
    page() {
      return parseInt(this.$route.query.page) || 1;
    }
  }
};
</script>

<style scoped></style>
