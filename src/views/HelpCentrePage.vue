<template>
  <section id="help-center-page">
    <article class="content">
      <h1>{{ currentPage.title }}</h1>

      <div class="body">
        <h3>{{ currentPage.subTitle }}</h3>
        
        <img 
          :src="currentPage.img.url" 
          :alt="currentPage.img.alt">

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
import helpCentreFeedback from '@/components/HelpCentreFeedback';

import { mapState } from 'vuex';

export default {
  components: {
    helpCentreFeedback
  },
  data() {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    ...mapState('helpCentre', ['helpPages']),
    currentPage() {
      return this.helpPages.find(page => page.slug === this.slug);
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
