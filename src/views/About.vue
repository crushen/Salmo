<template>
  <section id="about">
    <div class="content">
      <div class="logo">
        <div class="img"></div>
        <h1>Salmo</h1>
      </div>
      <h2>Out future goals for the UK visa industry.</h2>

      <about-card 
        v-for="(card, index) in cards"
        :key="index"
        :number="index + 1"
        :title="card.title"
        :text="card.text"/>
    </div>

    <div class="help">
      <div class="content">
        <p>For more general advice or help on the UK application process, take a look through our Help Centre.</p>
        <div class="button">
          <button>Help Centre</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import aboutCard from '@/components/AboutCard';

export default {
  components: {
    aboutCard
  },
  data() {
    return {
      cards: [
        {
          title: 'Change the way the British public sees immigrants.',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt cumque excepturi ratione deleniti suscipit quia similique inventore. Non, officia. Consequatur et veritatis eum laborum saepe, illum consectetur impedit quis alias.'
        },
        {
          title: 'Offer a better service for immigrants to aply for a UK visa.',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt cumque excepturi ratione deleniti suscipit quia similique inventore. Non, officia. Consequatur et veritatis eum laborum saepe, illum consectetur impedit quis alias.'
        },
        {
          title: "Core changes at Home Office with the way that visa's are processed.",
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt cumque excepturi ratione deleniti suscipit quia similique inventore. Non, officia. Consequatur et veritatis eum laborum saepe, illum consectetur impedit quis alias.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

#about {
  padding: $spacing*10 0 0;
}

.logo {
  display: flex;
  align-items: center;

  .img {
    width: 12vw;
    height: 12vw;
    background: $light-grey;
    border-radius: 100px;
    margin-right: 2vw;
  }

  h1 {
    font-size: 12vw;
  }
}

h2 {
  font-size: 7vw;
  margin-top: 5vw;
}

.help {
  background: $background;
  padding: $spacing*8 0;
  margin-top: $spacing*8;

  .button {
    text-align: center;
    margin-top: $spacing*3;
  }
}
</style>
