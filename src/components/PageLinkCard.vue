<template>
  <div>
    <p>{{ text }}</p>
    <router-link
      :to="{name: link.name, params: {username: link.username}}"
      tag="button"
      :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}">
      {{ pageTitle }}
    </router-link>
  </div>
</template>

<script>
import dots from '@/assets/patterns/dots.svg';

export default {
  props: {
    text: { required: true, type: String },
    pageTitle: { required: true, type: String },
    link: { required: true, type: Object }
  },
  data() {
    return {
      dots
    }
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
