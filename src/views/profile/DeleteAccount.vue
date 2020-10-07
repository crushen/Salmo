<template>
  <main class="content">
    <section v-if="stage === 1">
      <h1>Oh! You're leaving?</h1>
      <FormulateInput
        v-model="feedback.reason"
        type="radio"
        :options="options"
        label="Before you go, please let us know why you’ve decided to leave Salmo:"
        validation="required" />

      <FormulateInput
        v-model="feedback.text"
        type="text"
        :disabled="feedback.reason !== 'other'"
        :validation="feedback.reason === 'other' ? 'required' : null" /> 

      <button @click="submitFeedback">Submit Feedback</button>
    </section>

    <section v-else>
      <h1>We're sorry to see you go!</h1>

      <p>Thanks for letting us know how you feel, we will reflect on your feedback!</p>
      <p>If you wish to delete your account and have all personal details wiped out from our system, please enter your email address and password:</p>

      <FormulateForm @submit="submitDelete">
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

          <p><strong>THIS ACTION IS IRREVERSIBLE!</strong></p>

        <FormulateInput
          type="submit"
          label="Delete Account"/>

        <p v-if="error">{{ error }}</p>
      </FormulateForm>
    </section>
  </main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {},
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

</style>
