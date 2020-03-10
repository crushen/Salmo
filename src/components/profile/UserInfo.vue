<template>
  <section>
    <div class="profile-details">
      <div v-if="userProfile.age">
        <p>Age: {{ userProfile.age }}</p>
        <p>Country: {{ userProfile.country }}</p>
        <p>Current Visa: {{ userProfile.currentVisa }}</p>
        <p>Dependants: {{ userProfile.dependants }}</p>
      </div>
    </div>

    <button 
      v-if="userProfile.age"
      @click="openProfileUpdate">
      Update Profile
    </button>
    <button 
      v-else
      @click="openProfileUpdate">
      Create Profile
    </button>
  </section>
</template>

<script>
export default {
  props: {
    userProfile: { type: Object, required: true }
  },
  methods: {
    openProfileUpdate() {
      this.$emit('openProfileUpdate');
    }
  }
}
</script>
