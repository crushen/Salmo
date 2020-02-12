<template>
  <div>
    <label>What is your country of origin?</label> 

    <div>
      <select 
        v-model="country"
        name="Country">
        <option
          v-for="country in countries"
          :key="country"
          :value="country">
          {{ country }}
        </option>
      </select>
    </div>

    <button
      @click="askDOB">
      Next
    </button> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: ['China', 'Taiwan', 'Turkey', 'United States of America', 'United Kingdom'],
      country: ''
    }
  },
  methods: {
    askDOB() {
      this.$emit('askDOB', this.country);
    }
  }
}
</script>
