<template>
  <div>
    <section class="welcome">
      <div class="content">
        <div class="placeholder-image"></div>
        <h2 class="header">Welcome back, {{ user.profile.name.split(' ')[0] }}.</h2>
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
  </div>
</template>

<script>
import news from '@/components/news/News';
import pageLinkCard from '@/components/PageLinkCard';

export default {
  props: {
    user: { required: true, type: Object }
  },
  components: {
    news,
    pageLinkCard
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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
  margin-top: 20vw;
}

.page-links {
  .bottom {
    background: $background;
    padding: $spacing*8 0 $bottom-padding 0;
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
