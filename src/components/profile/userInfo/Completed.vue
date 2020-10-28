<template>
  <section class="user-profile">
    <div class="title content">
      <h1>Completed!</h1>
    </div>
    
    <div
      v-if="user.profile.whichVisa === 'no'"
      class="section margin top content">
      <h2>Congrats!<br>You’ve completed your profile, it’s time to take a quiz and begin your visa journey.</h2>

      <div class="text section margin top">
        <p>This visa quiz is custom-made for your profile. Once completed, it does all the research for you and offers a selection of visas to consider.</p>
        <p>Afterwards, you can access your profile to explore Salmo’s features!</p>
      </div>
    </div>

    <div v-else class="section margin top content">
      <h2>Congrats!<br>You’ve completed your profile!</h2>

      <div class="text section margin top">
        <p>Seems like you have got everything under control!</p>
        <p>You can take our visa quiz that is custom-made for your profile, where it comes up with a selection of visas that may work for you.</p>
        <p>Otherwise, you can jump straight to your profile. You can find the quiz there, in case you want to try later!</p>
      </div>
    </div>

    <img src="@/assets/illustrations/user-info/point.svg" alt="">

    <div class="buttons content">
      <button
        v-if="user.profile.whichVisa !== 'no'"
        @click="completeUserInfo"
        class="primary">
        Go to profile!
      </button>

      <router-link
        :to="{ name: 'visa-quiz', params: { username: user.profile.username } }"
        @click.native="completeUserInfo"
        tag="button"
        :class="user.profile.whichVisa !== 'no' ? 'secondary' : 'primary'">
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

<style lang="scss" scoped>
.buttons {
  margin-top: 8em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button:first-of-type {
    margin-bottom: 1em;
  }
}

img {
  position: absolute;
  transform: translate3d(0, 3em, 0);
}
</style>