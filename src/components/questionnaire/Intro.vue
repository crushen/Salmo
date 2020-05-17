<template>
  <div>
    <div v-if="this.user.profile.currentVisa !== 'None'">
      <h1>Let us help you find the perfect visa.</h1>

      <p>This quiz will work our your best options to remain in the UK.</p>
      <p>The following questions are based off your <span class="bold">current visa</span>, so please ensure that your current visa is up to date in <router-link :to="{name: 'profile', params: {username: user.profile.username}}">your profile.</router-link></p>
    </div>

    <div>
      <button @click="startQuestionnaire">
        Start Quiz
      </button>
      <p>This quiz will take 2-5 minutes to complete.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: { required: true, type: Object }
  },
  methods: {
    startQuestionnaire() {
      this.$emit('startQuestionnaire');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

p:first-of-type {
  font-weight: 600;
  margin-top: $spacing*4;
}

.bold {
  font-weight: 600;
}
</style>