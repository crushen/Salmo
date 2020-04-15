<template>
  <section id="home">
    <header :style="{ backgroundImage: `url(${background})` }">
      <div class="content">
        <div class="logo">
          <div class="circle"></div>
          <h1 class="logo-text">Salmo</h1>
        </div>
        <h2 class="caption">The ultimate visa organisation tool.</h2>
      </div>
    </header>

    <section class="welcome">
      <div class="content">
        <div class="placeholder-image"></div>
        <h2 v-if="user" class="header">Welcome back, {{ user.profile.firstName }}.</h2>
      </div>
    </section>

    <section class="news content">
      <news />
    </section>

    <section class="page-links section-margin">
      <page-link-card
        text="Head over to your results page to see and overview of which visa suits you best."
        pageTitle="Quiz Results"
        class="content" />

      <div class="bottom">
        <div class="placeholder-image-1"></div>
        <div class="placeholder-image-2"></div>
        <page-link-card
          text="For more general advice or help on the UK aplication process, take a look through our Help Centre."
          pageTitle="Help Centre"
          class="content" />
      </div>
    </section>
  </section>
</template>

<script>
import background from '@/assets/home-background.svg';
import news from '@/components/news/News';
import pageLinkCard from '@/components/PageLinkCard';

export default {
  components: {
    news,
    pageLinkCard
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      background
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

header {
  width: 100%;
  height: 80vw;
  margin: auto;
  text-align: center;
  padding-top: $top-padding;
  background-size: cover;
  background-position: 50% 0%;
}

.logo {
  margin: 0 auto 4vw auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .circle {
    width: 12vw;
    height: 12vw;
    background: $light-grey;
    margin-right: 4px;
    border-radius: 100px;
  }
}

.welcome {
  position: relative;
  margin-top: 40vw;

  .placeholder-image {
    width: 40vw;
    height: 55vw;
    background: $light-grey;
    position: absolute;
    top: -60vw;
  }

  h2 {
    margin-top: 6vw;
  }
}

.news {
  margin-top: 14vw;
}

.page-links {
  .bottom {
    background: $background;
    padding: $spacing*6 0 $spacing*10 0;
    position: relative;

    .placeholder-image-1 {
      width: 20vw;
      height: 25vw;
      background: $light-grey;
      position: absolute;
      top: -19vw;
      right: 5vw;
    }

    .placeholder-image-2 {
      width: 20vw;
      height: 25vw;
      background: $light-grey;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
