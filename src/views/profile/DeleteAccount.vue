<template>
  <section id="delete-account" class="content">
    <h1>We're sorry to see you go!</h1>

    <div class="placeholder-img"></div>

    <stage-one 
      v-if="stage === 1"
      @nextStage="nextStage" />

    <stage-two v-if="stage === 2" />
  </section>
</template>

<script>
import stageOne from '@/components/profile/delete-account/StageOne.vue';
import stageTwo from '@/components/profile/delete-account/StageTwo.vue';

export default {
  components: {
    stageOne,
    stageTwo
  },
  data() {
    return {
      stage: 1
    }
  },
  methods: {
    nextStage() {
      this.stage++;
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#delete-account {
  padding: $spacing*10 0 $spacing*12 0;
}

h1 {
  text-align: center;
  width: 80%;
  margin: auto;
}

.placeholder-img {
  width: 150px;
  height: 150px;
  background: $light-grey;
  border-radius: 100px;
  margin: $spacing*6 auto 0 auto;
  margin-bottom: $spacing*6;
}
</style>