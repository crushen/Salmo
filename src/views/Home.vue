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

    <section class="page-links content section-margin">
      <page-link-card
        v-for="card in pageLinks"
        :key="card.pageTitle"
        :text="card.text"
        :pageTitle="card.pageTitle" />
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
      background,
      pageLinks: [
        {
          text: 'Head over to your results page to see and overview of which visa suits you best.',
          pageTitle: 'Quiz<br>Results'
          //link: ''
          //icon: ''
        },
        {
          text: 'For more general advice or help on the UK aplication process, take a look through our Help Centre.',
          pageTitle: 'Help<br>Centre'
          //link: ''
          //icon: ''
        }
      ] 
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
  transform: translateY(-20vw);

  .placeholder-image {
    width: 40vw;
    height: 55vw;
    background: $light-grey;
  }

  h2 {
    margin-top: 6vw;
  }
}

.news {
  transform: translateY(-20vw);
  margin-top: 14vw;
}

.page-links {
  transform: translateY(-20vw);
}
</style>
