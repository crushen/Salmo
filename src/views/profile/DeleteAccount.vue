<template>
  <section id="delete-account" >
    <div class="content">
      <h1>We're sorry to see you go!</h1>

      <img 
        src="@/assets/illustrations/alternateStates/Delete account 1.svg" 
        alt="An illustration of two people hugging goodbye"
        class="img-one">

      <stage-one 
        v-if="stage === 1"
        @nextStage="nextStage" />

      <stage-two v-if="stage === 2" />

      <img 
        v-if="stage === 1"
        src="@/assets/illustrations/alternateStates/Leaving user 2.svg" 
        alt="An illustration of a person waving"
        class="img-two">
    </div>
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
  padding: $spacing*12 0 0 0;
}

.content {
  position: relative;
  z-index: 0;
  padding-bottom: $spacing*12;
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

.img-one {
  display: block;
  width: 45vw;
  margin: $spacing*6 auto 0 auto;
  margin-bottom: $spacing*6;
}

.img-two {
  width: 40vw;
  height: 40vw;
  position: absolute;
  bottom: 0;
  left: -12vw;
  object-fit: cover;
  object-position: -5vw 5vw;
}

</style>
