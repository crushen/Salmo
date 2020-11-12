<template>
  <main class="page padding top">
    <back-button
      @go-back="$router.go(-1)"
      text="Back" />

    <transition name="slide" mode="out-in">
      <section v-if="stage === 1" key="1" class="content form">
        <h1 class="margin-l bottom">Oh! You're leaving?</h1>

        <div class="inner">
          <p class="margin-m bottom">Before you go, please let us know why you’ve decided to leave Salmo:</p>

          <FormulateInput
            v-model="feedback.reason"
            type="radio"
            :options="options"
            class="grey-label" />

          <FormulateInput
            v-model="feedback.text"
            type="text"
            :disabled="feedback.reason !== 'other'"
            :validation="feedback.reason === 'other' ? 'required' : null" /> 

          <div class="button-center margin-l top bottom">
            <button
              @click="submitFeedback"
              class="outline">
              Submit Feedback
            </button>
          </div>
        </div>
        <img src="@/assets/illustrations/delete-account/girl-looking.svg" alt="" class="img-1">
      </section>

      <section v-else key="2" class="content margin-l bottom">
        <h1 class="margin-m bottom">We're sorry to see you go!</h1>

        <div class="inner">
          <img src="@/assets/illustrations/delete-account/delete-account.svg" alt="" class="img-2">

          <p class="margin-m top">Thanks for letting us know how you feel, we will reflect on your feedback!</p>
          <p class="margin-s top">If you wish to delete your account and have all personal details wiped out from our system, please enter your email address and password:</p>

          <FormulateForm @submit="submitDelete" class="margin-m top">
            <FormulateInput
              v-model="userDetails.email"
              type="email"
              label="email address"
              validation="bail|required|email"
              error-behavior="submit" />

            <FormulateInput
              v-model="userDetails.password"
              type="password"
              label="password"
              validation="required"
              error-behavior="submit" />

              <p class="margin-m top"><strong>THIS ACTION IS IRREVERSIBLE!</strong></p>

            <FormulateInput
              type="submit"
              label="Delete Account"
              class="tertiary margin-s top" />

            <p v-if="error">{{ error }}</p>
          </FormulateForm>
        </div>
      </section>
    </transition>
  </main>
</template>

<script>
import backButton from '@/components/BackButton'

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: { backButton },
  data() {
    return {
      stage: 1,
      error: null,
      options: {
        features: 'Features are not useful',
        notifications: 'Too many notifications',
        relevance: 'Not personally relevant to me anymore',
        other: 'Other (please specify below)'
      },
      feedback: {
        reason: null,
        text: null
      },
      userDetails: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    submitFeedback() {
      this.stage++
    },
    submitDelete() {
      const user = firebase.auth().currentUser,
            credential = firebase.auth.EmailAuthProvider.credential(this.userDetails.email, this.userDetails.password);

      user.reauthenticateWithCredential(credential)
      .then(() => this.deleteAccount(user))
      .catch(error => this.error = error.message)
    },
    deleteAccount(user) {
      user.delete()
      .then(() => {
        this.$store.state.auth.user = null
        this.$store. commit('auth/setUserDeleted')
        this.$router.push('/')
      })
      .catch(error => this.error = error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  min-height: calc(100vh - 85px);
  position: relative;
  overflow: hidden;
}

h1 {
  text-align: right;
}

p {
  font-size: 16px;
  font-weight: 400;
}

.img-1 {
  width: 120px;
  position: absolute;
  bottom: -42px;
  left: -18px;
}

.img-2 {
  display: block;
  width: 55%;
  max-width: 200px;
  margin: auto;
}

strong {
  font-size: 20px;
  color: $red;
}

.form {
  padding-bottom: 100px;

  .inner {
    max-width: 450px;
    margin: auto;
  }
}

.bottom {
  .inner {
    max-width: 450px;
    margin: auto;
  }
}

@media screen and (min-width: 700px) {
  .content {
    min-height: calc(100vh - 150px);
  }
}
</style>
