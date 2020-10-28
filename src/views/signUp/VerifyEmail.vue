<template>
  <main
    :class="verified ? 'fade' : ''"
    class="content page padding top">

    <div id="overlay" />
    <transition name="dialog" mode="out-in">
      <logout-alert
        v-if="showAlert"
        @confirm="handleLogout"
        @cancel="showAlert = false" />
    </transition>

    <button
      @click="showAlert = true, setOverlay()"
      class="back">
      <img src="@/assets/icons/white/arrow-left.svg" alt="">
      Sign Out
    </button>

    <h1>Verify your email address</h1>

    <section>
      <p>Please click on the link in your email to begin setting up your account. Don’t forget to check you junk/spam folders!</p>
      <p>If you’ve clicked the link and still see this message, try refreshing the page before clicking the button.</p>
      <p>Once you’ve completed your verification, you’ll be able to access your account to complete your profile.</p>
    </section>

    <section class="button">
      <button @click="verify" class="outline">
        Done
      </button>
    </section>

    <img
      class="email-img"
      src="@/assets/illustrations/sign-up/email.svg"
      alt="">
  </main>
</template>

<script>
import logoutAlert from '@/components/alerts/logout/ConfirmLogout'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: { logoutAlert },
  data() {
    return {
      user: this.$store.state.auth.user,
      verified: false,
      showAlert: false
    }
  },
  methods: {
    verify() {
      this.$store.commit('wave/setFullScreen', true)
      this.verified = true

      setTimeout(() => {
        this.$store.commit('wave/setWaveAway', true)
      }, 1500)

      setTimeout(() => {
        location.reload()
      }, 1800)
    },
    handleLogout() {
      this.showAlert = false

      setTimeout(() => {
        this.$store.dispatch('auth/logOut')
        .then(() => {
          this.$store. commit('auth/setLoggedOut')
          this.$store.commit('wave/setWaveAway', false)
          this.$store.commit('wave/setFullScreen', false)
          this.$store.dispatch('wave/handleTransition')

          if(this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
      }, 800)
    }
  },
  mounted() {
    this.$store.dispatch('auth/sendEmailVerification')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  min-height: 110vh;
}

.back {
  left: 0;
  color: $light-font;
}

h1 {
  width: 50%;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 350px;
  right: 0;
}

p {
  font-size: 0.9em;
  color: $light-font;

  &:not(:last-of-type) {
    margin-bottom: 1em;
  }
}

.button {
  position: absolute;
  bottom: 60px;
  right: 0;
  text-align: right;
}

.email-img {
  width: 30vw;
  position: absolute;
  bottom: 0;
  left: 0;
}

@media screen and (min-width: 370px) {
  .content {
    min-height: 100vh;
  }

  p {
    font-size: 1em;
  }
}
</style>
