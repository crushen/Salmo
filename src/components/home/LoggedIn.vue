<template>
  <div class="grid-container">
    <section class="welcome">
      <div class="content">
        <h2 class="header">All you need for your next UK Visa, right here.</h2>
        <img 
          src="@/assets/illustrations/homePage/Home 2.svg" 
          alt="An illustration of a person sat on the floor using their mobile phone" 
          class="header-img">
      </div>
    </section>

    <section class="news content">
      <news />
    </section>

    <section class="section-margin">
      <h3 class="content">Let's get you going</h3>
      <div class="page-links">
        <!-- If user has taken quiz, link to results page -->
        <page-link-card
          v-if="user.profile.questionnaireResults.length"
          text="Check out the latest result of your quiz. Your results are a good way to get insipration and start narrowing down your visa options."
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
@import '@/assets/styles/main.scss';

.header-img {
  display: none;
}

.news {
  margin-top: 18vw;
}

h3 {
  display: none;
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

// Tablet
@media screen and (min-width: 600px) {
  .welcome {
    .content {
      position: relative;
      max-width: 500px;
    }
  }

  h2 {
    width: 70%;
  }

  .header-img {
    display: block;
    position: absolute;
    bottom: -30%;
    right: 0;
    width: 40%;
    max-width: 220px;
  }

  .news {
    margin-top: $spacing*15;

    &.content {
      width: 90%;
    }
  }

  h3 {
    display: block;
    margin: $spacing*8 auto $spacing*3 auto;

    &.content {
      width: 90%;
    }
  }

  .page-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: $spacing*15;
    width: 90%;
    margin: 0 auto auto;
    
    .content {
      width: 48%;
    }

    .bottom {
      background: transparent;
      padding: 0;
      width: 48%;

      .content {
        width: 100%;
      }

      .image-1,
      .image-2 {
        display: none;
      }
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .grid-container {
    @include grid(1.3fr 0.7fr, 0.3fr 0.5fr, 5%);
    width: 80%;
    max-width: 1100px;
    margin: $spacing*8 auto $spacing*15 auto;
  }

  .content {
    width: 100%;
  }

  .section-margin {
    max-width: 600px;
    margin: $spacing*4 auto 0 auto;
    align-self: center;
  }

  .welcome {
    .content {
      max-width: 560px;
      margin: auto;
    }
  }

  h2 {
    width: 60%;
  }

  .header-img {
    right: 5%;
  }

  h3 {
    display: block;
    margin: 0;

    &.content {
      width: 100%;
    }
  }

  .page-links {
    padding-bottom: 0;
    margin-top: $spacing*3;
    width: 100%;

    .content {
      width: 43%;
    }
  }

  .news {
    margin-top: 0;
    grid-column: 2 /  3;
    grid-row: 1 / 3;

    &.content {
      width: 100%;
    }
  }
}
</style>
