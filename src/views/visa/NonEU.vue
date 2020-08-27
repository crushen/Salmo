<template>
  <section id="non-eu">
    <div class="content">
      <h1>What is your main reason to stay in the UK?</h1>
    </div>

    <section class="buttons">
      <router-link
        class="button"
        v-for="page in categories"
        :key="page.text"
        :to="{ name: 'non-eu-category', params: { category: page.text } }"
        :style="{ backgroundImage: `url(${page.bg})` }">
        <h3>{{ page.text }}</h3>
        <img :src="page.icon" class="icon">
      </router-link>

      <img 
        src="@/assets/illustrations/visaPages/Work Person.svg" 
        alt="An illustrations of a person holding a briefcase"
        class="deskptop-img">
    </section>

    <section class="child-options">
      <div class="content">
        <p>All options above are for individuals aged 17+. Follow the link below to check out your options if you're younger than 17.</p>
        <router-link
          tag="button"
          :to="{ name: 'non-eu-category', params: { category: 'child' } }"
          class="secondary">
          Child Visa Options
        </router-link>
      </div>

      <img 
        src="@/assets/illustrations/visaPages/Child 1.svg" 
        alt="An illustration of a person using their laptop">
    </section>
  </section>
</template>

<script>
import study from '@/assets/icons/visa-buttons/study.svg';
import work from '@/assets/icons/visa-buttons/work.svg';
import business from '@/assets/icons/visa-buttons/business.svg';
import family from '@/assets/icons/visa-buttons/family.svg';

import wave from '@/assets/patterns/wave-2.svg';
import line from '@/assets/patterns/line.svg';
import dashed from '@/assets/patterns/dashed-line.svg';
import confetti from '@/assets/patterns/confetti.svg';

export default {
  data() {
    return {
      visas: this.$store.state.visas.visaList,
      categories: [
        {
          icon: study,
          bg: wave,
          text: 'study'
        },
        {
          icon: work,
          bg: line,
          text: 'work'
        },
        {
          icon: business,
          bg: dashed,
          text: 'business'
        },
        {
          icon: family,
          bg: confetti,
          text: 'family'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#non-eu {
  padding: $spacing*12 0 0;
}

.buttons {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: $spacing*4 auto auto;

  .button {
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

    h3 {
      transform: translateY(4px);
    }

    .icon {
      width: 55px;
    }

    &:hover {
      background-color: lighten($color: $primary-blue, $amount: 3%);
    }
  }
}

.child-options {
  margin-top: $spacing*6;
  padding: $spacing*6 0 $spacing*12 0;
  background: $background;
  position: relative;

  .content {
    display: flex;
    flex-direction: column;
  }
    
  button {
    width: 180px;
    margin: $spacing*4 0 $spacing*6 0;
    align-self: center;
  }

  img {
    width: 30vw;
    height: 33vw;
    max-width: 133px;
    max-height: 146px;
    position: absolute;
    bottom: 0;
    left: 32vw;
    object-fit: cover;
    object-position: 0 2vw;
  }
}

.deskptop-img {
  display: none;
}

@media screen and (min-width: 600px) {
  #non-eu {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .buttons {
    max-width: none;
  }

  .child-options {
    padding: $spacing*10 0 $spacing*15 0;

    img {
      object-position: 0 0vw;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .buttons {
    position: relative;
  }

  .deskptop-img {
    display: block;
    width: 12vw;
    position: absolute;
    left: 10%;
    bottom: -50%;
  }

  .child-options {
    padding: $spacing*10 0 $spacing*10 0;

    img {
      max-width: 100px;
      max-height: 110px;
      left: 43vw;
    }
  }
}
</style>
