<template>
  <section>
    <div class="profile-details">
      <div v-if="user.profile.age">
        <p>Age: {{ user.profile.age }}</p>
        <p>Country: {{ user.profile.country }}</p>
        <p>Current Visa: {{ user.profile.currentVisa }}</p>
        <p>Dependants: {{ user.profile.dependants }}</p>
      </div>
    </div>


    <router-link 
      v-if="user.profile.age"
      :to="{ name: 'update-profile', params: { uid: user.uid } }">
      Update Profile
    </router-link>
    <router-link 
      v-else
      :to="{ name: 'update-profile', params: { uid: user.uid } }">
      Create Profile
    </router-link>

  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.user
    }
  }
}
</script>
