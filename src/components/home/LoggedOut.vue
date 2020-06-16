<template>
  <div>
    <section class="content">
      <h2 class="header">All you need for your next UK Visa, right here.</h2>

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
          title: 'Not sure what your next step is?<br>Overwhelmed by choices?',
          subTitle: 'Your personalised quiz can help. Answer a series of quick questions and we can suggest which visas will suit you best.',
          img: imgOne
        },
        {
          title: 'Struggling to keep organised?<br>Don’t know where to start?',
          subTitle: 'Your visa planner can help. Track and keep note of past visas, your route to Permenant Residency and any documentation you need to collect.',
          img: imgTwo
        },
        {
          title: "Find info elsewhere confusing?<br>Not sure what's relevant to you?",
          subTitle: "All results are personalised for you, so you see the info you need. Visas are broken down into more consise and managable sections, giving you back the power.",
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
  margin: 0 0 $spacing*10 0;
}
</style>
