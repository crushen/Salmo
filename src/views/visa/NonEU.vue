<template>
  <main class="content">
    <h1>Visa Info</h1>
    <h2>What is your main reason to stay in the UK?</h2>

    <section class="buttons">
      <router-link
        v-for="page in categories"
        :key="page.text"
        :to="{ name: 'non-eu-category', params: { category: page.text } }"
        tag="button"
        :style="{ backgroundImage: `url(${page.bg})` }">
        {{ page.text }}
        <img :src="page.icon" class="icon">
      </router-link>
    </section>

    <section>
      <help-centre-card />
    </section>
  </main>
</template>

<script>
import helpCentreCard from '@/components/cards/HelpCentre'

import study from '@/assets/icons/visa-buttons/study.svg';
import work from '@/assets/icons/visa-buttons/work.svg';
import business from '@/assets/icons/visa-buttons/business.svg';
import family from '@/assets/icons/visa-buttons/family.svg';

import wave from '@/assets/patterns/wave-2.svg';
import line from '@/assets/patterns/line.svg';
import dashed from '@/assets/patterns/dashed-line.svg';
import confetti from '@/assets/patterns/confetti.svg';

export default {
  components: { helpCentreCard },
  data() {
    return {
      visas: this.$store.state.visas.visaList,
      categories: [
        { icon: study, bg: wave, text: 'study' },
        { icon: work, bg: line, text: 'work' },
        { icon: business, bg: dashed, text: 'business' },
        { icon: family, bg: confetti, text: 'family' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.buttons {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: $spacing*4 auto auto;

  button {
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: $spacing;
    padding-top: 12px;
    border-radius: $border-radius;
    background: $primary-blue;
    color: $light-font;
    text-transform: capitalize;
    box-shadow: $shadow;
    background-position: center;
    transition: 0.3s;

    &:nth-of-type(1) {
      background-size: 240px;
      
    }

    &:nth-of-type(2) {
      background-size: 140px;
    }

    &:nth-of-type(3) {
      background-size: 180px;
    }

    .icon {
      width: 55px;
    }

    &:hover {
      background-color: lighten($color: $primary-blue, $amount: 3%);
    }
  }
}

@media screen and (min-width: 600px) {
  .buttons {
    max-width: none;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .buttons {
    position: relative;
  }
}
</style>
