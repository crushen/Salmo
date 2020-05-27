<template>
  <div class="card">
    <div class="title">
      <dates-info />
      <h3>Key visa application dates</h3>
    </div>
    <div class="body">
      <div>
        <p>Your current visa ends on</p>
        <p class="date">{{ endDate }}</p>
      </div>
      <div>
        <p>It's best to start preparing from</p>
        <p class="date">{{ prepDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import datesInfo from '@/components/profile/visa-dates/Info';

export default {
  props: {
    user: { required: true, type: Object }
  },
  components: {
    datesInfo
  },
  computed: {
    endDate() {
      const date = this.user.profile.currentVisa.end.split('-');
      const year = date[0].split('').slice(-2).join('');
      date[0] = year;
      return date.reverse().join('/');
    },
    prepDate() {
      const timeStamp =  new Date(this.user.profile.currentVisa.end); 
      const minusThreeMonths = timeStamp.setMonth(timeStamp.getMonth() - 3);
      const date = new Date(minusThreeMonths).toLocaleDateString();
      const formatted = date.split('/');
      const year = formatted[2].split('').slice(-2).join('');
      formatted[2] = year;
      return formatted.join('/');
    }
  }
}
</script>

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
