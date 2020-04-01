<template>
  <div class="card">
    <div class="text">
      <p>{{ text }}</p>
    </div>
    <div class="icon">
      <!-- <img src="icon" alt=""> -->
      <h3 v-html="pageTitle" />
    </div>
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

.card {
  height: 34vw;
  max-height: 120px;
  display: flex;
  justify-content: space-between;
  margin-bottom: $spacing*8;

  & .text {
    width: 55%;
  }

  & .icon {
    width: 34vw;
    max-width: 120px;
    display: flex;
    align-items: flex-end;
    padding: $spacing;
    border-radius: 10px;
    background: $dark-font;
    color: $light-font;
  }
}
</style>
