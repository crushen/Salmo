<template>
  <section>
    <div class="profile-details">
      <div v-if="user.profile.age">
        <p><strong>Age:</strong> {{ user.profile.age }}</p>
        <p><strong>Country:</strong> {{ user.profile.country }}</p>
        <p><strong>Current Visa:</strong> {{ user.profile.currentVisa }}</p>
        <p><strong>Dependants:</strong> {{ user.profile.dependants }}</p>
        <div v-if="results">
          <p><strong>Questionnaire Result:</strong> {{ mostRecentResult.recommendedVisa }}</p>
          <div v-if=" mostRecentResult.messages">
            <p><strong>Messages:</strong></p>
            <ul 
              v-for="message in mostRecentResult.messages" 
              :key="message">
              <li>{{ message }}</li>
            </ul>
          </div>
        </div>
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
      user: this.$store.state.auth.user,
      results: this.$store.state.auth.user.profile.questionnaireResults
    }
  },
  computed: {
    mostRecentResult() {
      return this.results.slice(-1)[0];
    }
  }
}
</script>
