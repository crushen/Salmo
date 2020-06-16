<template>
  <section id="eu">
    <div class="content">
      <h1>Help with Brexit.</h1>

      <p> We know why you’re here! Brexit has everyone worried, but here we will give you all the information so you can make your next step fully informed.</p>
    </div>

    <brexit-timeline />

    <div class="explore">
      <div class="content">
        <h3>All EU individuals currently living in the UK have two options to choose from:</h3>

        <div class="buttons">
          <router-link
            :to="{ name: 'eu-settled' }"
            tag="button"
            class="pink"
            :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
            Settled
          </router-link>

          <router-link
            :to="{ name: 'eu-pre-settled' }"
            tag="button"
            class="pink"
            :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
            Pre-Settled
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import brexitTimeline from '@/components/BrexitTimeline';
import waveH from '@/assets/patterns/wave-horizontal.svg';
import waveV from '@/assets/patterns/wave-verticle.svg';

export default {
  components: {
    brexitTimeline
  },
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

#eu {
  padding: $spacing*12 0 0;
}

h1 {
  margin-bottom: $spacing*3;
}

h3 {
  margin-top: $spacing*3;
}

.explore {
  margin-top: $spacing*3;
  padding: $spacing*6 0 $spacing*12 0;

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: $spacing*6;

    button {
      width: 45%;
    }
  }
}

@media screen and (min-width: 600px) {
  #eu {
    padding: $spacing*15 0 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .explore {
    margin-top: $spacing*3;
    padding: $spacing*6 0 $spacing*15 0;
  }
}
</style>
