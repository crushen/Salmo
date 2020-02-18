<template>
  <section>

    <div v-if="question === 1">
      <label>What is your country of origin?</label> 
      <select 
        v-model="profileToUpdate.country"
        name="Country">
        <option
          v-for="country in countries"
          :key="country"
          :value="country">
          {{ country }}
        </option>
      </select>
      <button
        @click="next">
        Next
      </button> 
    </div>

    <div v-if="question === 2">
      <label>What is your date of birth?</label> 
      <div class="date-picker">
        <v-date-picker
          :max-date="maxDate"
          v-model="date" />
      </div>
      <button
        @click="prev">
        Previous
      </button> 
      <button
        @click="next">
        Next
      </button> 
    </div>

    <div v-if="question === 3">
      <label>Do you currently have a UK visa?</label> 
      <select 
        v-model="profileToUpdate.currentVisa"
        name="Current Visa">
        <option
          v-for="visa in visas"
          :key="visa"
          :value="visa">
          {{ visa }}
        </option>
      </select>
      <button
        @click="prev">
        Previous
      </button> 
      <!-- If user is 18 or over, go to Dependants question. Else, sumbit profile -->
      <button
        v-if="age >= 18"
        @click="next">
        Next
      </button> 
      <button
        v-else
        @click="submitProfile">
        Next
      </button> 
    </div>

    <div v-if="age >= 18 && question === 4">
      <label>Do you have any dependants?</label> 
      <select 
        v-model="profileToUpdate.dependants"
        name="Dependants">
        <option
          v-for="dependant in dependants"
          :key="dependant"
          :value="dependant">
          {{ dependant }}
        </option>
      </select>
      <button
        @click="prev">
        Previous
      </button> 
      <button
        @click="submitProfile">
        Next
      </button> 
    </div>

  </section>
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
      question: 1,
      countries: ['China', 'Taiwan', 'Turkey', 'United States of America', 'United Kingdom'],
      date: new Date(),
      age: null,
      visas: ['None', 'Tier 4 Student', 'Tier 2 General', 'Tier 2 Sportsperson', 'Tier 1 Innovator'],
      dependants: ['None', 'Child / Children', 'Partner / Spouse', 'Elderly person'],
      profileToUpdate: {...this.userProfile}
    }
  },
  computed: {
    maxDate() {
      const underFourYears = new Date();
      underFourYears.setFullYear(underFourYears.getFullYear() - 4);
      return underFourYears;
    }
  },
  methods: {
    next() {
      this.question++;
    },
    prev() {
      this.question--;
    },
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
      this.age = age;
      return age;
    },
    submitProfile() {
      this.$emit('submitProfile', {...this.profileToUpdate});
    }
  },
  watch: {
    date(newDate, oldDate) {
      this.profileToUpdate.age = this.calculateAge(newDate);
      this.profileToUpdate.birthday = newDate;
    },
    age(age) {
      if(age < 18) {
        this.profileToUpdate.dependants = 'None';
      }
    }
  }
}
</script>
