<template>
  <div class="section">
    <h3>{{ section.title }}</h3>

    <div v-html="section.content.html" class="body" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('visas', ['visa']),
    section() {
      let obj = {};

      this.visa.sections.forEach(section => {
        section.subsections.forEach(subsection => {
          if(subsection.slug === this.$route.params.section) {
            obj = subsection;
          }
        })
      });

      return obj;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h3 {
  color: $primary-pink;
  font-weight: 300;
}

.body {
  /deep/ p {
    margin-top: $spacing*2;
  }

  /deep/ a {
    text-decoration: underline;
  }

  /deep/ strong {
    font-weight: 600;
  }

  // /deep/ .centre {
  //   text-align: center;
  //   margin: $spacing*6;

  //   img {
  //     width: 80%;
  //     max-width: 200px;
  //   }
  // }

  /deep/ ul,
  /deep/ ol {
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

    p {
      margin-top: 0;
      position: relative;
      z-index: 10;
    }
  }

  // /deep/ .text-img-right {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   margin: $spacing*6 auto;
  //   max-width: 500px;

  //   p {
  //     margin: 0;
  //     margin-right: 5%;
  //   }

  //   img {
  //     width: 25%;
  //     max-width: 100px;
  //   }
  // }

  // /deep/ .text-img-left {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   margin-top: $spacing*2;

  //   p {
  //     width: 90%;
  //     margin: 0;
  //   }
  // }

  // /deep/ table {
  //   margin-bottom: $spacing*6;

  //   tr {
  //     td {
  //       width: 30%;
  //       text-align: center;

  //       p {
  //         margin: $spacing auto auto;
  //         width: 90%;
  //         max-width: 180px;
  //       }

  //       img {
  //         width: 60%;
  //         max-width: 100px;
  //         margin: $spacing*3 auto 0 auto;
  //       }
  //     }
  //   }
  // }
}
</style>
