<template>
  <main
    :key="componentKey"
    :class="verified ? 'fade' : ''"
    class="content padding top">
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

      <p v-if="error">{{ error }}</p>
    </section>

    <img src="@/assets/version-2/email.svg" alt="">
  </main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      user: this.$store.state.auth.user,
      error: null,
      verified: false,
      componentKey: 0
    }
  },
  methods: {
    verify() {
      this.$store.commit('setFullScreen')
      this.verified = true

      setTimeout(() => {
        this.$store.commit('setWaveAway')
      }, 1500)

      setTimeout(() => {
        location.reload()
      }, 1800)
    }
  },
  mounted() {
    this.$store.dispatch('auth/sendEmailVerification')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

main {
  transition: 0.5s;
  opacity: 1;

  &.fade {
    opacity: 0;
  }
}

.content {
  min-height: 100vh;
}

h1 {
  width: 50%;
  text-align: right;
  color: $light-font;
  position: absolute;
  top: 320px;
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

  p {
    color: $red;
  }
}

img {
  width: 30vw;
  position: absolute;
  bottom: 0;
  left: 0;
}

@media screen and (min-width: 370px) {
  p {
    font-size: 1em;
  }
}
</style>
