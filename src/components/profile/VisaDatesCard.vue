<template>
  <div class="card">
    <div>
      <p class="title">{{ endDate }}</p>
      <p>visa expiry date</p>
    </div>

    <div>
      <p class="title">{{ daysLeft }} days left</p>
      <p>until visa preparation</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { user: { required: true, type: Object } },
  computed: {
    endDate() {
      const date = this.user.profile.currentVisa.end.split('-'),
            year = date[0].split('').slice(-2).join('');

      date[0] = year
      return date.reverse().join('/')
    },
    prepDate() {
      const timeStamp =  new Date(this.user.profile.currentVisa.end),
            minusThreeMonths = timeStamp.setMonth(timeStamp.getMonth() - 3),
            date = new Date(minusThreeMonths);

      return date
    },
    daysLeft() {
      const date1 = new Date(),
            date2 = new Date(this.prepDate);
      
      const Difference_In_Time = date2.getTime() - date1.getTime(),
            Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return Math.floor(Difference_In_Days)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  display: flex;
  width: 100%;
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
