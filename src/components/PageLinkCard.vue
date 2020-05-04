<template>
  <div>
    <p>{{ text }}</p>
    <button>{{ pageTitle }}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: { required: true, type: String },
    pageTitle: { required: true, type: String }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

div {
  text-align: center;

  p {
    text-align: left;
  }

  button {
    margin-top: $spacing*3;
  }

  &:not(:last-of-type) {
    margin-bottom: $spacing*8;
  }
}
</style>
