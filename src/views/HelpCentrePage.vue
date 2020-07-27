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
          class="secondary">
          Back To Help Centre
        </router-link>
      </div>
    </section>  
  </section>
</template>

<script>
import helpCentreFeedback from '@/components/HelpCentreFeedback';

export default {
  components: {
    helpCentreFeedback
  },
  data() {
    return {
      slug: this.$route.params.slug,
      article: null,
      // error: null,
      // loading: true
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      // this.error = null;
      // this.loading = true;
      this.article = null;
      try {
        const response = await fetch(
          'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
          {
            method: 'POST',
            body: JSON.stringify({
              query: `query GetArticle($slug: String){ helpCentreArticle(where: {slug: $slug}) { title content { html } } }`,
              variables: {
                slug: this.$route.params.slug,
              },
            }),
          }
        );
        const { data } = await response.json();
        // this.loading = false;
        // this.error = data.error;
        this.article = data.helpCentreArticle;
        // 404 if no article
        if(!this.article) {
          this.$router.push({name: 'not-found'});
        }
      } catch (e) {
        console.log(e);
      }
    },
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
    margin: $spacing*4 auto;
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
    //background: $primary-yellow;
    //border-radius: 4px;
    //position: relative;

    p {
      margin-top: 0;
      position: relative;
      z-index: 10;
    }

    // &::before,
    // &::after {
    //   width: 50px;
    //   height: 50px;
    //   position: absolute;
    //   z-index: 5;
    //   top: 20%;
    //   background: url('../assets/icons/lightbulbs/tip.svg') center;
    //   background-size: 100% 100%;
    //   content: ''
    // }

    // &::before {
    //   right: 0;
    // }

    // &::after {
    //   left: 0;
    // }
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
      margin: $spacing*6 auto;

      li {
        margin-top: $spacing*4;
      }
    }

    /deep/ .tip {
      margin: $spacing*8 0;
    }

    // /deep/ .text-img-right {
    //   //margin: $spacing*5 0;

    //   img {
    //     max-width: 130px;
    //   }
    // }
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
