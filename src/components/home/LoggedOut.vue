<template>
  <div>
    <section class="welcome">
      <div class="content">
        <div class="placeholder-image"></div>
        <h2 class="header">Here for your UK visa needs.</h2>
      </div>
    </section>

    <section class="content content-cards section-margin">
      <h3>Signing up gives you exclusive access to</h3>

      <content-card
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :subTitle="card.subTitle" />
    </section>

    <sign-up />
  </div>
</template>

<script>
import contentCard from '@/components/home/ContentCard';
import signUp from '@/components/home/SignUp';

export default {
  components: {
    contentCard,
    signUp
  },
  data() {
    return {
      cards: [
        {
          title: 'Your personalised quiz.',
          subTitle: 'Based off your current visa, we can help you find your next step.'
        },
        {
          title: 'Your visa planner.',
          subTitle: 'Calculate and keep track of documents needed for your next visa.'
        },
        {
          title: 'Your custom made visa list.',
          subTitle: "You'll be able to focus on the visas that apply to your needs and funds."
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.welcome {
  position: relative;
  margin-top: 40vw;

  .placeholder-image {
    width: calc(85vw*0.8);
    height: 60vw;
    clip-path: polygon(0 0, 100% 50%, 100% 100%, 0% 100%);
    background: $light-grey;
    position: absolute;
    top: -65vw;
    left: calc(15vw);
  }

  h2 {
    width: 80%;
    margin: auto;
    text-align: center;
    padding-top: $spacing;
  }
}

.content-cards {
  h3 {
    margin-bottom: $spacing*3;
    font-size: 19px;
  }
}
</style>
