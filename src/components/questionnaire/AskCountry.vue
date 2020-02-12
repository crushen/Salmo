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
      @click="updateProfile">
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
    updateProfile() {
      this.$emit('updateProfile', {...this.profileToUpdate});
    }
  }
}
</script>
