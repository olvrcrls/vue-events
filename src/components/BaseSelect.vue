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
import { formFieldMixin } from "../mixins/formFieldMixin.js";
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
