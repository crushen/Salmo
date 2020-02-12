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
      profileToUpdate: {...this.userProfile}
    }
  },
  methods: {
    // submitAge() {
    //   this.$emit('submitCountry', {...this.profileToUpdate});
    // }
  }
}
</script>
