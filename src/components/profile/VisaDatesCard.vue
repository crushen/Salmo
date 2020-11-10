<template>
  <div class="content">
    <div class="card">
      <div>
        <p class="title">{{ endDate }}</p>
        <p>visa expiry date</p>
      </div>

      <div>
        <p class="title">{{ noNegativeNums }} days left</p>
        <p>until visa preparation</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    endDate: { type: String, required: true },
    daysLeft: { type: Number, required: true }
  },
  computed: {
    noNegativeNums() {
      if(this.daysLeft < 0) {
        return 0
      } else {
        return this.daysLeft
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  display: flex;
  width: 100%;
  max-width: 450px;
  margin: auto;
  justify-content: space-between;
  background: $pink;
  border-radius: $radius;
  padding: 0.5em 1.5em;
}

p {
  &.title {
    color: $red;
  }
  
  &:not(.title) {
    font-size: 0.9em;
  }
}
</style>
