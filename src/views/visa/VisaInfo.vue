<template>
  <section class="content single-page">
    <blob v-if="innerWidth > 600" />

    <div class="visa-info">
      <h1>Browse all visa options that the UK offers!</h1>

      <div class="buttons">
        <h2>To start, let us know where you are from.</h2>
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
    </div>

    <img 
      v-if="innerWidth < 600"
      src="@/assets/illustrations/visaPages/Laptop Person.svg" 
      alt="An illustration of a person using their laptop">
  </section>
</template>

<script>
import waveH from '@/assets/patterns/wave-horizontal.svg';
import waveV from '@/assets/patterns/wave-verticle.svg';
import blob from '@/components/Blob';

export default {
  components: {
    blob
  },
  data() {
    return {
      waveH,
      waveV,
      innerWidth: null
    }
  },
  mounted() {
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0 $spacing*18;
}

.visa-info {
  position: relative;
  z-index: 5;
}

.buttons {
  margin-top: 12vw;

  .container {
    text-align: center;
  }

  button {
    width: 35vw;
    max-width: 140px;
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

// Tablet
@media screen and (min-width: 600px) {
  .visa-info {
    max-width: 500px;
    margin: 8vw auto 0 auto;
  }

  h1 {
    text-align: center;
  }

  .buttons {
    width: 80%;
    margin: $spacing*4 auto 0 auto;

    .container {
      max-width: none;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    button {
      width: 150px;
      margin: $spacing*4 $spacing*2;

      &:last-of-type {
        width: 150px;
        margin: 0;
      }
    }
  }
}
</style>
