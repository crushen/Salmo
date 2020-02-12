<template>
  <div>
    <label>What is your date of birth?</label> 

    <div class="date-picker">
      <v-date-picker
        :max-date="maxDate"
        v-model="date" />
    </div>

    <button
      @click="submitAge">
      Next
    </button> 
  </div>
</template>

<script>
export default {
  props: {
    userProfile: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      profileToUpdate: {...this.userProfile},
      date: new Date()
    }
  },
  computed: {
    maxDate() {
      const underFourYears = new Date();
      underFourYears.setFullYear(underFourYears.getFullYear() - 4);
      return underFourYears;
    }
  },
  watch: {
    date(newDate, oldDate) {
      this.profileToUpdate.age = this.calculateAge(newDate);
      this.profileToUpdate.birthday = newDate;
    }
  },
  methods: {
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
      return age;
    },
    submitAge() {
      this.$emit('submitAge', {...this.profileToUpdate});
    }
  }
}
</script>

<style scoped>
.date-picker {
  width: 250px;
  margin: auto;
}
</style>
