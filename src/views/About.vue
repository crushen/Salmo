<template>
  <section id="about">
    <desktop-header v-if="innerWidth > 1100" />

    <div class="content">
      <div class="logo-about">
        <img
          src="@/assets/logo/colour.svg" 
          alt="Salmo logo">
        <h1>Salmo</h1>
      </div>
      <h2>Out future goals for the UK visa industry.</h2>

      <about-card 
        v-for="(card, index) in cards"
        :key="index"
        :number="index + 1"
        :title="card.title"
        :text="card.text"
        :img="card.img"/>
    </div>

    <div class="help">
      <div class="content">
        <p>If you’ve got a specific question about a visa related topic, our Help Centre has lots of helpful guides to all things visa!</p>
        <div class="button">
          <router-link 
            :to="{name: 'help-centre'}"
            tag="button"
            :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}">
            Help Centre
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import aboutCard from '@/components/AboutCard';
import imgOne from '@/assets/illustrations/about/Salmo Goals 1.svg';
import imgTwo from '@/assets/illustrations/about/Salmo goals 2.svg';
import imgThree from '@/assets/illustrations/about/Salmo goals 3.svg';
import dots from '@/assets/patterns/dots.svg';
import desktopHeader from '@/components/DesktopHeader';

export default {
  components: {
    aboutCard,
    desktopHeader
  },
  data() {
    return {
      innerWidth: null,
      dots,
      cards: [
        {
          title: 'Offer a better service for immigrants to apply for a UK visa.',
          text: 'Applying a visa is like setting your foot into a ruthless maze, with a confusing map in your hand. You may get stuck, lose resources, feel helplessly stressed and much more.<br><br>While we don’t have the power to change the entire visa system (because we’re not the Home Office), we can turn this labyrinth into a highway, so you can can retrieve the control to your path.',
          img: imgOne
        },
        {
          title: 'Core changes at Home Office with the way that visa’s are processed.',
          text: 'Although we’re not the Home Office, we do have a grand ambition to become the first bottom-up consultancy for them, where we could represent the voice of UK immigrants and help to reshape a better visa system.',
          img: imgTwo
        },
        {
          title: "Change the way the British public sees immigrants.",
          text: 'In order to build a harmonic society, we must learn to understand each other’s viewpoint. We aim to create a community that encourages locals and immigrants to share their thoughts on each other, and to defeat immigrants myths together.',
          img: imgThree
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

#about {
  padding: $spacing*10 0 0;
}

.logo-about {
  display: flex;
  align-items: center;

  img {
    width: 12vw;
    height: 12vw;
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
    padding: $spacing*50 0 0;
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
    left: 300px;
    color: $light-font;
    width: 400px;
  }

  .help {
    padding: $spacing*15 0;
    margin-top: $spacing*15;
  }
}
</style>
