<template>
  <section id="help-center-page">
    <article class="content">
      <h1>{{ currentPage.title }}</h1>

      <div class="body">
        <h3>{{ currentPage.subTitle }}</h3>

        <img :src="currentPage.img.url" :alt="currentPage.img.alt">

        <div class="text">
          <p 
            v-for="(p, index) in currentPage.text"
            :key="index">
            {{ p }}
          </p>
        </div>
      </div>
    </article> 

    <section class="bottom">
      <div class="content">
        <h3>Was this article helpful?</h3>

        <help-centre-feedback />

        <router-link 
          :to="{name: 'help-centre'}"
          tag="button"
          class="secondary">
          Back To Help Centre
        </router-link>
      </div>
    </section>  
  </section>
</template>

<script>
import brpImg from '@/assets/illustrations/about/BRP-guide.svg';
import ilrImg from '@/assets/illustrations/about/ILR-Guide.svg';
import switchImg from '@/assets/illustrations/about/Switch-Extend.svg';
import dependantsImg from '@/assets/illustrations/about/Applying with Dependants.svg';
import helpCentreFeedback from '@/components/HelpCentreFeedback';

export default {
  components: {
    helpCentreFeedback
  },
  data() {
    return {
      slug: this.$route.params.slug,
      pages: [
        {
          title: 'Biometric Residence Permit',
          slug: 'biometric-residence-permit',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ],
          img: {
            url: brpImg,
            alt: 'An illustration of a person holding their Biometric Residence Permit'
          }
        },
        {
          title: 'Applying with Dependants',
          slug: 'applying-with-dependants',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ],
          img: {
            url: dependantsImg,
            alt: 'An illustration of a father and daughter holding hands'
          }
        },
        {
          title: 'Switch VS Extend',
          slug: 'switch-vs-extend',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ],
          img: {
            url: switchImg,
            alt: 'An illustration of a person thinking'
          }
        },
        {
          title: 'Indefinite Leave to Remain',
          slug: 'indefinite-leave-to-remain',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ],
          img: {
            url: ilrImg,
            alt: 'An illustration of a person holding their passport with excitement'
          }
        }
      ]
    }
  },
  computed: {
    currentPage() {
      return this.pages.find(page => page.slug === this.slug);
    }
  },
  mounted() {
    if(!this.currentPage) {
      this.$router.push({name: 'not-found'});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#help-center-page {
  padding: $spacing*12 0 0;
}

h3 {
  margin-top: $spacing*3;
}

img {
  display: block;
  width: 45vw;
  max-width: 250px;
  margin: $spacing*6 auto;
}

.text {
  p {
    margin-top: $spacing*3;
  }
}

.bottom {
  background: $background;
  margin-top: $spacing*6;
  padding: $spacing*6 0 $spacing*12 0;
  text-align: center;

  button {
    margin-top: $spacing*6;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  #help-center-page {
    padding: $spacing*15 0 0;
  }

  img {
    margin: $spacing*8 auto;
  }

  .bottom {
    margin-top: $spacing*10;
    padding: $spacing*10 0 $spacing*15 0;
    text-align: center;

    button {
      margin-top: $spacing*6;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .body {
    max-width: 600px;
    margin: $spacing*10 auto 0 auto;
  }

  .bottom {
    margin-top: $spacing*15;
    padding: $spacing*15 0 $spacing*15 0;
    text-align: center;

    button {
      margin-top: $spacing*6;
    }
  }
}
</style>
