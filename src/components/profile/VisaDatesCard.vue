<template>
  <div class="card">
    <div class="title">
      <h3>Key visa application dates</h3>
    </div>
    <div class="body">
      <div>
        <p>Your current visa ends on</p>
        <p class="date">12/05/20</p>
      </div>
      <div>
        <p>It's best to start preparing from</p>
        <p class="date">12/08/20</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  background: white;
  border: 4px solid $primary-yellow;
  border-radius: $border-radius;
  position: relative;
  box-shadow: $shadow;

  .title {
    background: $primary-yellow;
    text-align: center;
    padding: $spacing;
  }

  .body {
    padding: $spacing*3 $spacing*2;

    div:first-of-type {
      margin-bottom: $spacing*4;
    }

    p {
      margin-bottom: $spacing;
    }
  }

  .date {
    font-size: 26px;
    font-weight: 600;
    color: $primary-pink;
    text-align: center;
    padding: 4px;
    background: $lightest-grey;
    border-radius: 4px;
  }
}
</style>
