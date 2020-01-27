<template>
  <label>
    {{ question }}
  </label>
</template>

<script>
export default {
  props: {
    question: { type: String, required: true }
  }
}
</script>