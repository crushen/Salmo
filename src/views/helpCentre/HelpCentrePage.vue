<template>
  <main id="help-center-page" v-if="article" class="page padding top bottom">
    <back-button
      @go-back="$router.push({ name: 'help-centre' })"
      text="Help Centre" />

    <article class="content">
      <h1>{{ article.title }}</h1>

      <div v-html="article.content.html" class="body" />
    </article> 

    <section class="content margin-m top">
      <help-centre-feedback />
    </section>  
  </main>
</template>

<script>
import { mapState } from 'vuex'
import helpCentreFeedback from '@/components/cards/HelpCentreFeedback'
import backButton from '@/components/BackButton'

export default {
  components: { helpCentreFeedback, backButton },
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
  /deep/ h2 {
    margin-top: 36px;
  }

  /deep/ .red {
    h3 {
      font-weight: 500;
      color: $red;
      margin-top: 32px;
    }
  }

  /deep/ p {
    margin-top: 16px;
  }

  /deep/ a {
    color: $dark-font;
    text-decoration: underline;
  }

  /deep/ strong {
    font-weight: 600;
  }

  /deep/ .centre {
    text-align: center;
    margin: 32px;

    img {
      width: 70%;
      max-width: 200px;
    }
  }

  /deep/ ul {
    list-style-position: inside;
    margin: 8px auto;
    max-width: 500px;

    li {
      margin-top: 16px;

      div {
        display: inline;
      }
    }
  }

  /deep/ .tip {
    margin-top: 36px;

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
    margin: 36px auto;
    max-width: 500px;

    p {
      width: 75%;
      margin: 0;
      margin-right: 8px;
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
    margin-top: 16px;

    p {
      width: 90%;
      margin: 0;
    }
  }

  /deep/ table {
    margin-bottom: 36px;

    tr {
      td {
        width: 30%;
        text-align: center;

        p {
          margin: 8px auto auto;
          width: 90%;
          max-width: 180px;
        }

        img {
          width: 60%;
          max-width: 100px;
          margin: 8px auto 0 auto;
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
