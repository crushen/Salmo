<template>
  <div
    :class="colour"
    class="overstay-alert">
    <div class="top">
      <p><b>Overstayed</b></p>
      <p>{{ days }} days</p>
    </div>
    
    <button
      v-if="button"
      class="tertiary">
      do you have a reason?
    </button>
  </div>
</template>

<script>
export default {
  props: {
    days: { type: Number, required: true },
    button: { type: Boolean, required: true },
    colour: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.overstay-alert {
  margin-top: 0.5rem;
  border-radius: $radius;
  padding: 0.2rem 1rem;

  &.red {
    border: 4px solid $red;
    background: $red;
  }

  &.blue {
    border: 4px solid $blue;
    background: $blue;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  p,
  .tertiary {
    color: white;
  }
}
</style>
