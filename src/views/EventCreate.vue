<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        label="Select a category"
        v-model="event.category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        placeholder="Add a title"
        class="field"
      />

      <BaseInput
        label="Description"
        v-model="event.description"
        placeholder="Add a description"
        class="field "
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        placeholder="Add a location"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        class="field"
        label="Select a time"
        v-model="event.time"
        :options="times"
      />

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }
    return {
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
      times
    };
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }, //createFreshEventObject
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          NProgress.done();
        });
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
