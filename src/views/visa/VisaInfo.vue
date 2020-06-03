<template>
  <section class="content single-page">
    <h1>Looking for an overview of all UK visas?</h1>

    <div class="buttons">
      <h2>To start, let us know where you are from below:</h2>
      <div class="container">
        <router-link 
          :to="{name: 'non-eu'}"
          tag="button"
          class="pink"
          :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          Non - EU
        </router-link>
        <router-link 
          :to="{name: 'visa-info-eu'}"
          tag="button"
          class="pink"
          :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
          EU
        </router-link>
        <router-link 
          :to="{name: 'help-centre'}"
          tag="button"
          class="secondary">
          Help Centre
        </router-link>
      </div>
    </div>

    <img 
      src="@/assets/illustrations/visaPages/Laptop Person.svg" 
      alt="An illustration of a person using their laptop">
  </section>
</template>

<script>
import waveH from '@/assets/patterns/wave-horizontal.svg';
import waveV from '@/assets/patterns/wave-verticle.svg';

export default {
  data() {
    return {
      waveH,
      waveV
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0 $spacing*18;
}

.buttons {
  margin-top: 12vw;

  .container {
    text-align: center;
  }

  button {
    width: 35vw;
    margin: 10vw $spacing 0;

    &:last-of-type {
      width: 41vw;
    }
  }
}

img {
  width: 40vw;
  height: 40vw;
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: -3vw 0;
}
</style>
