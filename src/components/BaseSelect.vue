<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      v-bind="$attrs"
      :value="value"
      @change="updateValue"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :selected="value === option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped></style>
