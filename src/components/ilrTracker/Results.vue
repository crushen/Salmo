<template>
  <div class="results">
    <h1>Results</h1>

    <div v-if="pre2016.length">
      <div
        v-for="visa in pre2016visas"
        :key="visa.start">
        <div
          v-for="(year, index) in visa.years"
          :key="index"
          class="holiday-result">
          <b>{{ year.start.getFullYear() }} - {{ year.totalDays }} days in total</b>

          <img
            v-if="year.icon === 'tick'"
            src="@/assets/icons/calculator/tick.svg" 
            alt="Check - This year has under 180 days holiday" 
            class="icon aria-btn"
            tabindex="0">

          <img
            v-if="year.icon === 'exclamation'"
            src="@/assets/icons/calculator/exclamation.svg" 
            alt="Exclamation point - This year is close to 180 days holiday" 
            class="icon aria-btn"
            tabindex="0">

          <img
            v-if="year.icon === 'cross'"
            src="@/assets/icons/calculator/cross.svg" 
            alt="Cross - This year has over 180 days holiday" 
            class="icon aria-btn"
            tabindex="0">
        </div>
      </div>
    </div>

    <div v-if="post2016holiday.length">
      <div
        v-for="year in post2016holiday"
        :key="year.start.toString()"
        class="holiday-result">
        <b>{{ year.start.getFullYear() }} - {{ year.totalDays }} days away</b>

        <img
          v-if="year.icon === 'tick'"
          src="@/assets/icons/calculator/tick.svg" 
          alt="Check - This year has under 180 days holiday" 
          class="icon aria-btn"
          tabindex="0">

        <img
          v-if="year.icon === 'exclamation'"
          src="@/assets/icons/calculator/exclamation.svg" 
          alt="Exclamation point - This year is close to 180 days holiday" 
          class="icon aria-btn"
          tabindex="0">

        <img
          v-if="year.icon === 'cross'"
          src="@/assets/icons/calculator/cross.svg" 
          alt="Cross - This year has over 180 days holiday" 
          class="icon aria-btn"
          tabindex="0">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pre2016', 'pre2016visas', 'post2016holiday'],
  methods: {
    jsDate(date) {
      const newDate = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()),
            newerDate = newDate.split('/');
      
      return `${newerDate[1]}/${newerDate[0]}/${newerDate[2]}`
    }
  }
}
</script>

<style lang="scss" scoped>
.results {
  background: lightblue;
}
</style>
