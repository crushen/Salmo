<template>
  <div class="container">
    <img src="@/assets/version-2/status-main.svg" alt="" class="background">
    <img src="@/assets/version-2/status-point.svg" alt="" class="point">
  </div>
</template>

<script>
export default {
  props: {
    endDate: { type: String, required: true },
    prepDate: { type: Date, required: true }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  position: relative;
  padding-top: 4.2em;
}

.background {
  width: 100%;
}

.point {
  position: absolute;
  top: 18%;
  left: 0;
}
</style>