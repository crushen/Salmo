<template>
  <section class="content">
    <h1>Verify your email.</h1>
    <h3>We've sent you an email to {{ user.email }} to verify your address.</h3>
    <p>Please click on the link in your email to begin setting up your account. Don't forget to check your junk/spam folders!</p>
    <p>If you've clicked the link and still see this message, try refreshing the page.</p>

    <div class="placeholder-img"></div>

    <p>Once you've completed your profile, you'll also gain access to other features such as your personalised quiz and your own Visa Stats and Facts page.</p>
  </section>
</template>

<script>
export default {
  props: {
    user: { required: true, type: Object }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1 {
  margin-bottom: $spacing*4;
}

h3, p {
  margin-bottom: $spacing*2;
}

.placeholder-img {
  width: 170px;
  height: 170px;
  background: $light-grey;
  border-radius: 100px;
  margin: $spacing*8 auto;
}

</style>