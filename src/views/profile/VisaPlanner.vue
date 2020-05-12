<template>
  <div>
    <section class="content">
      <router-link :to="{ name: 'profile', params: { username: user.username } }">
        <img :src="arrow" class="arrow">
      </router-link>

      <h1>Your next step.</h1>

      <section class="results">
        <p class="title">Here's your favourite visa:</p>

        <visa-card
          :key="topResult.name"
          :visa="topResult">
          <template #quickTip>
            <quick-tip :visa="topResult"/>
          </template>
        </visa-card>

        <section class="buttons">
          <button class="tertiary">Change Favourite Visa</button>
          <p>The rest of your quiz results are saved here:</p>
          <button class="secondary">
            Quiz Results
          </button>
        </section>
      </section>

      <section class="documentation section-margin">
        <p>The below can help you keep track of what dpcumentation you need and the overall process.</p>
        <p class="emphasis">These tools are based off your current favourite visa, so be sure to keep it up to date!</p>

        <doc-checklist 
          :visa="topResult"/>
      </section>
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

    &.title {
      font-weight: 600;
    }
  }

  .buttons {
    margin: $spacing*3 auto auto;
    width: 220px;
    text-align: center;

    p {
      margin-top: $spacing*5;
    }
  }
}

.emphasis {
  font-weight: 600;
  margin: $spacing*3 0;
}
</style>
