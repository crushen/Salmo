<template>
  <section class="content">
    <header>
      <div class="logo">
        <div class="circle"></div>
        <p class="logo-text">Salmo</p>
      </div>
      <h2 class="caption">The ultimate visa organisation tool.</h2>
    </header>

    <section class="welcome">
      <h1>Welcome back, {{ user.profile.firstName }}.</h1>
      <div class="placeholder-image"></div>
    </section>

  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.user
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

header {
  width: 80%;
  margin: $spacing*5 auto 0 auto;
  text-align: center;
}

.logo {
  width: 250px;
  margin: 0 auto $spacing*2 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & .circle {
    width: $spacing*6;
    height: $spacing*6;
    background: $light-grey;
    border-radius: 100px;
  }
}

.welcome {
  margin-top: $spacing*5;

  & h1 {
    margin-bottom: $spacing*3;
  }
}
</style>
