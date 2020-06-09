<template>
  <div>
    <section class="content">
      <h2>All you need for your next UK Visa, right here.</h2>

      <content-card
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :subTitle="card.subTitle"
        :img="card.img" />
    </section>

    <sign-up />
  </div>
</template>

<script>
import contentCard from '@/components/home/ContentCard';
import signUp from '@/components/home/SignUp';
import imgOne from '@/assets/illustrations/alternateStates/Logged out home 1.svg';
import imgTwo from '@/assets/illustrations/alternateStates/Logged out home 2.svg';
import imgThree from '@/assets/illustrations/alternateStates/Logged out home 3.svg';

export default {
  components: {
    contentCard,
    signUp
  },
  data() {
    return {
      cards: [
        {
          title: 'A quiz created just for you.',
          subTitle: 'Enter in your current visa and we’ll help you find your next step.',
          img: imgOne
        },
        {
          title: 'Overview of your visa history.',
          subTitle: 'Your ultimate organiser tool for tracking all aspects of your visa.',
          img: imgTwo
        },
        {
          title: 'Detailed visa suggestions.',
          subTitle: "We’ll provide you a list of personalised visas to help narrow down your choices.",
          img: imgThree
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h2 {
  margin: 0 0 $spacing*8 0;
  font-size: 8vw;
}
</style>
