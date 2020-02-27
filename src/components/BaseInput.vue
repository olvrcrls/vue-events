<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      @input="updateValue"
      :value="value"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: ""
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped></style>
