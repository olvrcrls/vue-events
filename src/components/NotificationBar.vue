<template>
  <div class="notification-bar -shadow" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  methods: {
    ...mapActions("notification", ["remove"])
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  padding: 1em 1em 1em;
}
</style>
