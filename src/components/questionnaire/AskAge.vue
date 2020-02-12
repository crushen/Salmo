<template>
  <div>
    <label>What is your date of birth?</label> 



    <!-- <button
      @click="submitCountry">
      Next
    </button>  -->
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
      date: 1,
      month: 'January',
      year: 
      age: null

    }
  },
  computed() {
    date() {
      return newDate.getDate();
    }
  }
  methods: {
    // submitAge() {
    //   this.$emit('submitCountry', {...this.profileToUpdate});
    // }
  }
}
</script>
