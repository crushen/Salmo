<template>
  <section id="help-center-page">
    <section class="content">
      <h1>{{ currentPage.title }}</h1>
      <h3>{{ currentPage.subTitle }}</h3>

      <div class="placeholder-img"></div>

      <div class="text">
        <p 
          v-for="(p, index) in currentPage.text"
          :key="index">
          {{ p }}
        </p>
      </div>
       
    </section> 

    <section class="bottom">
      <div class="content">
        <h3>Was this article helpful?</h3>

        <router-link 
          :to="{name: 'help-centre'}"
          tag="button"
          class="secondary">
          Back to Help Centre
        </router-link>
      </div>
    </section>  
  </section>
</template>

<script>
export default {
  data() {
    return {
      slug: this.$route.params.slug,
      pages: [
        {
          title: 'Biometric Residence Permit',
          slug: 'biometric-residence-permit',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ]
        },
        {
          title: 'Applying with Dependants',
          slug: 'applying-with-dependants',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ]
        },
        {
          title: 'Switch VS Extend',
          slug: 'switch-vs-extend',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ]
        },
        {
          title: 'Indefinite Leave to Remain',
          slug: 'indefinite-leave-to-remain',
          subTitle: 'Sometimes reffered to as a BRP, this process is necessary for anyone on a visa in the UK.',
          text: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae perferendis quo deserunt neque optio, quaerat, ipsam quia enim voluptatem magni illum facere atque explicabo voluptas porro ducimus eos aperiam nulla?'
          ]
        }
      ]
    }
  },
  computed: {
    currentPage() {
      return this.pages.find(page => page.slug === this.slug);
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

.placeholder-img {
  width: 50vw;
  height: 50vw;
  background: $light-grey;
  border-radius: 100px;
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
</style>
