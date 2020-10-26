<template>
  <main id="help-center-page" v-if="article" class="page padding top bottom">
    <article class="content">
      <h1>{{ article.title }}</h1>

      <div v-html="article.content.html" class="body" />
    </article> 

    <section class="content">
      <help-centre-feedback />
    </section>  
  </main>
</template>

<script>
import { mapState } from 'vuex'
import helpCentreFeedback from '@/components/cards/HelpCentreFeedback'

export default {
  components: { helpCentreFeedback },
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
  computed: {
    ...mapState('helpCentre', ['article'])
  },
  watch: {
    $route: 'fetchArticle'
  },
  methods: {
    fetchArticle() {
      this.$store.dispatch('helpCentre/getArticle', this.slug)
      .then(() => {
        if(!this.article) {
          this.$router.push({name: 'not-found'})
        } else {
          this.makeAriaBtns()
        }
      })
    },
    makeAriaBtns() {
      const links = document.querySelectorAll('a')

      links.forEach(link => {
        link.classList.add('aria-btn')
      })
    }
  },
  created() {
    this.fetchArticle()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.body {
  /deep/ h3 {
    margin-top: 2em;
  }

  /deep/ .red {
    h3 {
      color: $red;
      margin-top: 3em;
    }
  }

  /deep/ p {
    margin-top: 1em;
  }

  /deep/ a {
    text-decoration: underline;
  }

  /deep/ strong {
    font-weight: 600;
  }

  /deep/ .centre {
    text-align: center;
    margin: 3em;

    img {
      width: 80%;
      max-width: 200px;
    }
  }

  /deep/ ul {
    list-style-position: inside;
    margin: 0.5em auto 2.5em auto;
    max-width: 500px;

    li {
      margin-top: 1em;

      div {
        display: inline;
      }
    }
  }

  /deep/ .tip {
    margin: 3em 0;

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
    margin: 3em auto;
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
    margin-top: 1em;

    p {
      width: 90%;
      margin: 0;
    }
  }

  /deep/ table {
    margin-bottom: 3em;

    tr {
      td {
        width: 30%;
        text-align: center;

        p {
          margin: 0.5em auto auto;
          width: 90%;
          max-width: 180px;
        }

        img {
          width: 60%;
          max-width: 100px;
          margin: 1.5em auto 0 auto;
        }
      }
    }
  }
}

// @media screen and (min-width: 600px) {
//   .body {
//     /deep/ h3 {
//       margin-top: $spacing*6;
//     }

//     /deep/ .red {
//       h3 {
//         margin-top: $spacing*8;
//       }
//     }

//     /deep/ p {
//       margin-top: $spacing*4;
//     }

//     /deep/ .centre {
//       text-align: center;
//       margin: $spacing*8;
//     }

//     /deep/ ul {
//       margin: $spacing*2 auto $spacing*8 auto;
//     }

//     /deep/ .tip {
//       margin: $spacing*8 0;
//     }
//   }

//   /deep/ .text-img-left {
//     margin-top: $spacing*4;
//   }

//   .bottom {
//     margin-top: $spacing*10;
//     padding: $spacing*10 0 $spacing*15 0;
//     text-align: center;

//     button {
//       margin-top: $spacing*6;
//     }
//   }
// }

// @media screen and (min-width: 1100px) {
//   .body {
//     max-width: 600px;
//     margin: $spacing*10 auto 0 auto;
//   }

//   .bottom {
//     margin-top: $spacing*15;
//     padding: $spacing*15 0 $spacing*15 0;
//     text-align: center;

//     button {
//       margin-top: $spacing*6;
//     }
//   }
// }
</style>
