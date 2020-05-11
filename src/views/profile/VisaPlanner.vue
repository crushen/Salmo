<template>
  <div>
    <section class="content">
      <router-link :to="{ name: 'profile', params: { username: user.username } }">
        <img :src="arrow" class="arrow">
      </router-link>

      <h1>Your next step.</h1>
      <h3>Here is everything you need to work out your next step with your visa!</h3>

      <div class="results">
        <p>Top results of latest quiz:</p>

        <visa-card
          :key="topResult.name"
          :visa="topResult">
          <template #quickTip>
            <quick-tip :visa="topResult"/>
          </template>
        </visa-card>

        <section class="button">
          <p>The rest of your quiz results are saved here:</p>
          <button class="secondary">
            Quiz Results
          </button>
        </section>

        <section class="documentation section-margin">
          <p>Once you've decided on a visa the below can help you keep track of what documentation you need and the process overall.</p>

          <doc-checklist 
            :visa="topResult"/>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import visaCard from '@/components/visa/VisaCard';
import quickTip from '@/components/visa/QuickTip';
import docChecklist from '@/components/profile/DocumentChecklist';

export default {
  components: {
    visaCard,
    quickTip,
    docChecklist
  },
  data() {
    return {
      arrow,
      user: this.$store.state.auth.user.profile,
      visaList: this.$store.state.visas.visaList,
      results: this.$store.state.auth.user.profile.questionnaireResults,
    }
  },
  computed: {
    mostRecentResult() {
      return this.results.slice(-1)[0]; 
    },
    topResult() {
      if(this.mostRecentResult) {
        return this.visaList.filter(item => this.mostRecentResult.recommendedVisa.includes(item.name))[0];
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0;
}

h3 {
  margin-top: $spacing*2;
}

.results {
  margin-top: $spacing*5;

  p {
    margin-bottom: $spacing*3;
  }

  .button {
    margin: $spacing*5 auto auto;
    width: 220px;
    text-align: center;
  }
}
</style>
