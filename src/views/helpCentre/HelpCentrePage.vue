<template>
  <section id="help-center-page" v-if="article">
    <article class="content">
      <h1>{{ article.title }}</h1>

      <div v-html="article.content.html" class="body" />
    </article> 

    <section class="bottom">
      <div class="content">
        <h3>Was this article helpful?</h3>

        <help-centre-feedback />

        <router-link 
          :to="{name: 'help-centre'}"
          tag="button"
          class="secondary aria-btn">
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
      slug: this.$route.params.slug,
    }
  },
  computed: {
    ...mapState('helpCentre', ['article'])
  },
  watch: {
    $route: 'fetchArticle',
  },
  methods: {
    fetchArticle() {
      this.$store.dispatch('helpCentre/getArticle', this.slug)
      .then(() => {
        if(!this.article) {
          this.$router.push({name: 'not-found'});
        } else {
          this.makeAriaBtns();
        }
      })
    },
    makeAriaBtns() {
      const links = document.querySelectorAll('a');

      links.forEach(link => {
        link.classList.add('aria-btn');
      })
    }
  },
  created() {
    this.fetchArticle();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#help-center-page {
  padding: $spacing*12 0 0;
}

.body {
  /deep/ h3 {
    margin-top: $spacing*4;
  }

  /deep/ .red {
    h3 {
      color: $primary-pink;
      margin-top: $spacing*6;
    }
  }

  /deep/ p {
    margin-top: $spacing*2;
  }

  /deep/ a {
    text-decoration: underline;
  }

  /deep/ strong {
    font-weight: 600;
  }

  /deep/ .centre {
    text-align: center;
    margin: $spacing*6;

    img {
      width: 80%;
      max-width: 200px;
    }
  }

  /deep/ ul {
    list-style-position: inside;
    margin: $spacing auto $spacing*5 auto;
    max-width: 500px;

    li {
      margin-top: $spacing*2;

      div {
        display: inline;
      }
    }
  }

  /deep/ .tip {
    padding: $spacing*2;
    margin: $spacing*6 0;
    border-left: 6px solid $primary-yellow;
    background: lighten($color: $primary-yellow, $amount: 23%);

    p {
      margin-top: 0;
      position: relative;
      z-index: 10;
    }
  }

  /deep/ .text-img-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: $spacing*6 auto;
    max-width: 500px;

    p {
      margin: 0;
      margin-right: 5%;
    }

    img {
      width: 25%;
      max-width: 100px;
    }
  }

  /deep/ .text-img-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: $spacing*2;

    p {
      width: 90%;
      margin: 0;
    }
  }

  /deep/ table {
    margin-bottom: $spacing*6;

    tr {
      td {
        width: 30%;
        text-align: center;

        p {
          margin: $spacing auto auto;
          width: 90%;
          max-width: 180px;
        }

        img {
          width: 60%;
          max-width: 100px;
          margin: $spacing*3 auto 0 auto;
        }
      }
    }
  }
}

.bottom {
  background: $background;
  margin-top: $spacing*8;
  padding: $spacing*8 0 $spacing*12 0;
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

  .body {
    /deep/ h3 {
      margin-top: $spacing*6;
    }

    /deep/ .red {
      h3 {
        margin-top: $spacing*8;
      }
    }

    /deep/ p {
      margin-top: $spacing*4;
    }

    /deep/ .centre {
      text-align: center;
      margin: $spacing*8;
    }

    /deep/ ul {
      margin: $spacing*2 auto $spacing*8 auto;
    }

    /deep/ .tip {
      margin: $spacing*8 0;
    }
  }

  /deep/ .text-img-left {
    margin-top: $spacing*4;
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
