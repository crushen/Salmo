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
  font-size: 18px;
  font-weight: 300;
}

// .body {
//   /deep/ p {
//     margin-top: $spacing*2;
//   }

//   /deep/ a {
//     text-decoration: underline;
//   }

//   /deep/ strong {
//     font-weight: 600;
//   }

//   // /deep/ .centre {
//   //   text-align: center;
//   //   margin: $spacing*6;

//   //   img {
//   //     width: 80%;
//   //     max-width: 200px;
//   //   }
//   // }

//   /deep/ ul,
//   /deep/ ol {
//     list-style-position: inside;
//     margin: $spacing*4 auto;
//     max-width: 500px;

//     li {
//       margin-top: $spacing*2;

//       div {
//         display: inline;
//       }
//     }
//   }

//   /deep/ .tip {
//     padding: $spacing*2;
//     margin: $spacing*6 0;
//     border-left: 6px solid $primary-yellow;
//     background: lighten($color: $primary-yellow, $amount: 23%);

//     p {
//       margin-top: 0;
//       position: relative;
//       z-index: 10;
//     }
//   }

//   // /deep/ .text-img-right {
//   //   display: flex;
//   //   align-items: center;
//   //   justify-content: space-between;
//   //   margin: $spacing*6 auto;
//   //   max-width: 500px;

//   //   p {
//   //     margin: 0;
//   //     margin-right: 5%;
//   //   }

//   //   img {
//   //     width: 25%;
//   //     max-width: 100px;
//   //   }
//   // }

//   // /deep/ .text-img-left {
//   //   display: flex;
//   //   align-items: center;
//   //   justify-content: space-between;
//   //   margin-top: $spacing*2;

//   //   p {
//   //     width: 90%;
//   //     margin: 0;
//   //   }
//   // }

//   // /deep/ table {
//   //   margin-bottom: $spacing*6;

//   //   tr {
//   //     td {
//   //       width: 30%;
//   //       text-align: center;

//   //       p {
//   //         margin: $spacing auto auto;
//   //         width: 90%;
//   //         max-width: 180px;
//   //       }

//   //       img {
//   //         width: 60%;
//   //         max-width: 100px;
//   //         margin: $spacing*3 auto 0 auto;
//   //       }
//   //     }
//   //   }
//   // }
// }

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
    font-weight: 500;
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

  /deep/ ul,
  /deep/ ol {
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
    margin: 8px 0 0 0;

    tr {
      td {
        width: 30%;
        text-align: center;
        vertical-align: top;

        p {
          margin: 8px auto auto;
          width: 90%;
          max-width: 180px;
        }

        img {
          width: 60%;
          max-width: 100px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
