<template>
  <div class="card">
    <div class="title">
      <h3>Permanent residency calculator</h3>
    </div>
    <div class="body">
      <p class="text">Enter in your time outside the UK here, and the calculator will work out how many more days you have left to take.</p>
      <div class="holiday-input">
        <div class="item">
          <p class="location">New York, USA</p>
          <p class="dates">12/03/19 - 12/05/19</p>
        </div>
        <div class="item">
          <p class="location">Delhi, India</p>
          <p class="dates">24/02/18 - 2/03/18</p>
        </div>
        <div class="add-holiday">
          <button class="pink">Add Holiday</button>
        </div>
      </div>
    </div>
    <div class="result">
      <h3>Result</h3>
      <div class="date">
        <p>2019 - 90 Days</p>
      </div>
      <p>You only have <span>27 days</span> left to take away this year, or you risk not qualifying for the 10 year permanent residency.</p>
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

    .text {
      margin-bottom: $spacing*2;
    }
  }
}

.holiday-input {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 4px 6px;
    margin-top: $spacing;
    background: $lightest-grey;
    border-radius: 4px;

    .location {
      font-weight: 600;
    }
  }
}

.add-holiday {
  margin-top: $spacing*3;
  text-align: center;
}

.result {
  background: $primary-yellow;
  padding: $spacing*3 $spacing*2;

  .date {
    background: darken($primary-yellow, 12%);
    padding: 6px 8px;
    border-radius: 4px;
    margin: $spacing 0 $spacing*2 0;

    p {
      font-size: 22px;
      font-family: 'mrs-eaves-roman-all-small-ca', $serif;
    } 
  }

  span {
    font-weight: 600;
  }
}
</style>
