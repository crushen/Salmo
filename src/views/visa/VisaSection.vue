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

.body {
  /deep/ h2 {
    margin-top: 32px;
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
      max-width: 150px;
    }
  }

  /deep/ .centre-large,
  /deep/ .centre-large-five,
  /deep/ .img-text-centre  {
    text-align: center;
    margin: 32px 0;
  }

  /deep/ .centre-large-five {
    img {
      width: 100%;
      max-width: 350px;
    }
  }

  /deep/ .img-text-centre {
    p {
      margin: 0;
    }
  }

  /deep/ ul,
  /deep/ ol {
    list-style-position: inside;
    margin: 16px auto 0 auto;

    li {
      margin-top: 8px;

      div {
        display: inline;
      }
    }
  }

  /deep/ .tip {
    margin: 32px auto 32px auto;
    max-width: 500px;

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
    margin: 32px auto;
    max-width: 500px;

    p {
      width: 75%;
      margin: 0;
      margin-right: 24px;
    }

    img {
      width: 25%;
      max-width: 100px;
    }
  }

  /deep/ .section {
    margin: 32px auto;

    p {
      margin: 0;
    }

    ul, ol {
      margin: 0 auto;
    }
  }

  /deep/ .table-header {
    p {
      margin-top: 32px;
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
          max-width: 80px;
          margin: 0 auto;
        }
      }
    }
  }
}

@media screen and (min-width: 700px) {
  .body {
    /deep/ .text-img-right {
      p {
        margin-right: 40px;
      }
    }

    /deep/ table {
      tr {
        td {
          p {
            margin: 8px auto 8px auto;
          }
        }
      }
    }
  }
}
</style>
