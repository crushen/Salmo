<template>
  <div>
    <label>What is your country of origin?</label> 

    <div>
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
    </div>

    <button
      @click="submitCountry">
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
      countries: ['China', 'Taiwan', 'Turkey', 'United States of America', 'United Kingdom'],
      country: ''
    }
  },
  methods: {
    submitCountry() {
      this.$emit('submitCountry', {...this.profileToUpdate});
    }
  }
}
</script>
