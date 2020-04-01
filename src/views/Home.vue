<template>
  <section class="content top-padding">
    <header>
      <div class="logo">
        <div class="circle"></div>
        <h1 class="logo-text">Salmo</h1>
      </div>
      <h2 class="caption">The ultimate visa organisation tool.</h2>
    </header>

    <section 
      v-if="user"
      class="welcome">
      <h2 class="header">Welcome back, {{ user.profile.firstName }}.</h2>
      <div class="placeholder-image"></div>
    </section>

    <news />

    <section class="section-margin">
      <page-link-card
        v-for="card in pageLinks"
        :key="card.pageTitle"
        :text="card.text"
        :pageTitle="card.pageTitle" />
    </section>
  </section>
</template>

<script>
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
  width: 80%;
  margin: auto;
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
