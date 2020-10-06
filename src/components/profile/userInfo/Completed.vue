<template>
  <section>
    <h1>Completed!</h1>

    <div v-if="user.profile.whichVisa === 'no'">
      <h2>Congrats! You’ve completed your profile, it’s time to take a quiz and begin your visa journey.</h2>

      <p>This visa quiz is custom-made for your profile. Once completed, it does all the research for you and offers a selection of visas to consider.</p>
      <p>Afterwards, you can access your profile to explore Salmo’s features!</p>
    </div>

    <div v-else>
      <h2>Congrats! You’ve completed your profile!</h2>

      <p>Seems like you have got everything under control!</p>
      <p>You can take our visa quiz that is custom-made for your profile, where it comes up with a selection of visas that may work for you.</p>
      <p>Otherwise, you can jump straight to your profile. You can find the quiz there, in case you want to try later!</p>
    </div>

    <div class="buttons">
      <button
        v-if="user.profile.whichVisa !== 'no'"
        @click="completeUserInfo">
        Go to profile!
      </button>

      <router-link
        :to="{ name: 'questionnaire', params: { username: user.profile.username } }"
        @click.native="completeUserInfo"
        tag="button">
        Take my quiz!
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: { user: { type: Object, required: true } },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    completeUserInfo() {
      this.profileToUpdate.completeUserInfo = true
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
    }
  },
  mounted() {
    this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
  }
}
</script>
