 <template>
  <main id="about" class="page padding top bottom">

    <section class="content">
      <h1>About Salmo</h1>
      <h2 class="margin-s top">Our future goals for the UK visa industry.</h2>

      <about-card 
        v-for="(card, index) in cards"
        :key="index"
        :number="index + 1"
        :title="card.title"
        :text="card.text"
        :img="card.img"/>
    </section>

    <section class="content margin-l top">
      <help-centre-card
        text="For more general advice or help on the UK application process, take a look through our Help Centre:" />
    </section>
  </main>
</template>

<script>
import aboutCard from '@/components/cards/AboutCard'
import helpCentreCard from '@/components/cards/HelpCentre'

export default {
  components: { aboutCard, helpCentreCard },
  data() {
    return {
      innerWidth: null,
      cards: [
        {
          title: 'Offer a better service for immigrants to apply for a UK visa.',
          text: 'Applying a visa is like setting your foot into a ruthless maze, with a confusing map in your hand. You may get stuck, lose resources, feel helplessly stressed and much more.<br><br>While we don’t have the power to change the entire visa system (because we’re not the Home Office), we can turn this labyrinth into a highway, so you can can retrieve the control to your path.',
          img: require('@/assets/illustrations/about/Salmo Goals 1.svg')
        },
        {
          title: 'Core changes at Home Office with the way that visa’s are processed.',
          text: 'Although we’re not the Home Office, we do have a grand ambition to become the first bottom-up consultancy for them, where we could represent the voice of UK immigrants and help to reshape a better visa system.',
          img: require('@/assets/illustrations/about/Salmo goals 2.svg')
        },
        {
          title: "Change the way the British public sees immigrants.",
          text: 'In order to build a harmonic society, we must learn to understand each other’s viewpoint. We aim to create a community that encourages locals and immigrants to share their thoughts on each other, and to defeat immigrants myths together.',
          img: require('@/assets/illustrations/about/Salmo goals 3.svg')
        }
      ]
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

.help {
  background: $background;
  padding: $spacing*8 0 $spacing*12 0;
  margin-top: $spacing*8;

  .button {
    text-align: center;
    margin-top: $spacing*3;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .logo-about {
    img {
      width: 90px;
      height: auto;
      margin-right: $spacing*2;
    }

    h1 {
      font-size: 90px;
    }
  }

  h2 {
    font-size: 40px;
    margin-top: 40px;
  }

  .help {
    background: $background;
    padding: $spacing*10 0;
    margin-top: $spacing*10;

    .content {
      width: 45%;
      margin: auto;
      text-align: center;
    }

    .button {
      margin-top: $spacing*6;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  #about {
    padding: $spacing*56 0 0;
  }

  .logo-about {
    justify-content: center;

    img {
      width: 55px;
      height: auto;
      margin-right: $spacing*2;
    }

    h1 {
      font-size: 60px;
    }
  }

  h2 {
    position: absolute;
    top: 75px;
    left: 35vw;
    color: $light-font;
    width: 400px;
  }

  .help {
    padding: $spacing*15 0;
    margin-top: $spacing*15;
  }
}
</style>
