<template>
  <div>
    <section class="welcome">
      <div class="content">
        <h2 class="header">All you need for your next UK Visa, right here.</h2>
      </div>
    </section>

    <section class="news content">
      <news />
    </section>

    <section class="page-links section-margin">
      <!-- If user has taken quiz, link to results page -->
      <page-link-card
        v-if="user.profile.questionnaireResults.length"
        text="Head over to your results page to see and overview of which visa suits you best."
        pageTitle="Quiz Results"
        :link="{name: 'results', username: user.profile.username}"
        class="content" />
      <!-- If not, link to quiz page -->
      <page-link-card
        v-else
        text="A great place to start is by taking your first quiz. The results will give you a good guide to what visa suits you best."
        pageTitle="Take Quiz"
        :link="{name: 'questionnaire', username: user.profile.username}"
        class="content" />

      <div class="bottom">
        <img 
          src="@/assets/illustrations/homePage/Home 2.svg" 
          alt="An illustration of a person sat on the floor using their mobile phone" 
          class="image-1">

        <img 
          src="@/assets/illustrations/homePage/Home 1.svg" 
          alt="An illustration of a person sat on the floor using their mobile phone" 
          class="image-2">

        <page-link-card
          text="If you’ve got a specific question about a visa related topic, our Help Centre has lots of helpful guides to all things visa!"
          pageTitle="Help Centre"
          :link="{name: 'help-centre'}"
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

.news {
  margin-top: 18vw;
}

.page-links {
  .bottom {
    background: $background;
    padding: $spacing*8 0 $spacing*12 0;
    position: relative;

    .image-1 {
      width: 35vw;
      position: absolute;
      top: -25vw;
      right: 3vw;
    }

    .image-2 {
      width: 20vw;
      position: absolute;
      bottom: 0;
      left: 3vw;
    }
  }
}
</style>
