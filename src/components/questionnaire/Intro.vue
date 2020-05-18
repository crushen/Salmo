<template>
  <section class="content single-page">
    <div>
      <h1>Let us help you find the perfect visa.</h1>

      <p>This quiz will work our your best options to remain in the UK.</p>
      <p>The following questions are based off your <span class="bold">current visa</span>, so please ensure that your current visa is up to date in <router-link :to="{name: 'profile', params: {username: user.profile.username}}">your profile.</router-link></p>
    </div>

    <div class="button">
      <button @click="startQuestionnaire">
        Start Quiz
      </button>
      <p>This quiz will take<br> 2-5 minutes to complete.</p>
    </div>

    <div class="placeholder-img"></div>
  </section>
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

p {
  margin-top: $spacing*2;

  &:first-of-type {
    font-weight: 600;
    margin-top: 10vw;
  }
}

.bold {
  font-weight: 600;
}

a {
  text-decoration: underline;
}

.button {
  margin-top: $spacing*2;
  text-align: center;

  p {
    font-weight: 300;
    margin:  $spacing*4 auto 0 auto;
  }
}

.placeholder-img {
  width: 18vw;
  height: 22vw;
  position: absolute;
  bottom: 0;
  left: 20px;
  background: $light-grey;
}
</style>
