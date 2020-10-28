<template>
  <div class="card">
    <h3 v-html="title"></h3>
    <div class="inner">
      <img :src="img" alt="">
      <p>{{ subTitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { required: true, type: String },
    subTitle: { required: true, type: String },
    img: { required: true, type: String }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto $spacing*8 auto;

  h3 {
    font-size: 20px;
    margin-bottom: $spacing*2;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      width: 60%;
    }

    img {
      width: 100px;
      margin: 0 4vw 0 0;
    }
  }

  &:nth-of-type(2) {
    .inner {
      flex-direction: row-reverse;

      img {
        margin: 0 0 0 4vw;
      }
    }
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .card {
    margin: 0 auto $spacing*12 auto;
    max-width: none;

    h3 {
      margin: 0 0 $spacing*2 35%;
      width: 65%;
    }

    .inner {
      p {
        width: 65%;
        margin: 0 0 0 35%;
      }

      img {
        width: 140px;
        transform: translateY(-30px);
        position: absolute;
        margin: 0;
      }
    }

    &:nth-of-type(2) {
      h3 {
        margin: 0 35% $spacing*2 0;
      }

      .inner {
        flex-direction: row-reverse;
        position: relative;

        p {
          margin: 0 35% 0 0;
        }

        img {
          margin: 0;
          right: 0;
        }
      }
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .card {
    margin: 0 auto $spacing*15 auto;

    h3 {
      margin: 0 0 $spacing*2 30%;
      width: 70%;
    }

    .inner {
      p {
        width: 70%;
        margin: 0 0 0 30%;
      }

      img {
        width: 180px;
        transform: translate(-150px, -30px);
      }
    }

    &:nth-of-type(2) {
      h3 {
        margin: 0 30% $spacing*2 0;
      }

      .inner {
        flex-direction: row-reverse;

        p {
          margin: 0 30% 0 0;
        }

        img {
          margin: 0;
          transform: translate(150px, -30px);
        }
      }
    }
  }
}
</style>
