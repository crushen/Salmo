<template>
  <section class="content">
    <header>
      <div class="logo">
        <div class="circle"></div>
        <h1 class="logo-text">Salmo</h1>
      </div>
      <h2 class="caption">The ultimate visa organisation tool.</h2>
    </header>

    <section class="welcome">
      <h2 class="header">Welcome back, {{ user.profile.firstName }}.</h2>
      <div class="placeholder-image"></div>
    </section>

    <news />

  </section>
</template>

<script>
import news from '@/components/news/News';

export default {
  components: {
    news
  },
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

  & h2 {
    margin-bottom: $spacing*3;
  }
}
</style>
