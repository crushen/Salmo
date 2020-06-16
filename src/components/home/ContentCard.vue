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
  margin-bottom: $spacing*8;

  h3 {
    margin-bottom: $spacing*2;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 32%;
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
@media screen and (min-width: 420px) {
  .card {
    margin-bottom: $spacing*12;

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
        width: 18%;
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

        p {
          margin: 0 35% 0 0;
        }

        img {
          margin: 0;
        }
      }
    }
  }
}
</style>
