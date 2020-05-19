<template>
  <div>
    <section class="content">
      <h1>Your next step.</h1>

      <section class="results">
        <p class="title">Here's your favourite visa:</p>

        <visa-card :visa="faveVisa">
          <template #quickTip>
            <quick-tip :visa="faveVisa"/>
          </template>
        </visa-card>

        <section class="buttons">
          <button class="tertiary">Change Favourite Visa</button>
          <p>The rest of your quiz results are saved here:</p>
          <router-link
            :to=" {name: 'results' }"
            tag="button"
            class="secondary">
            Quiz results
          </router-link>
        </section>
      </section>

      <section class="documentation section-margin">
        <p>The below can help you keep track of what dpcumentation you need and the overall process.</p>
        <p class="emphasis">These tools are based off your current favourite visa, so be sure to keep it up to date!</p>

        <doc-checklist 
          :visa="faveVisa"
          :docChecklist="user.favoriteVisa"/>
      </section>

      <timeline />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import visaCard from '@/components/visa/VisaCard';
import quickTip from '@/components/visa/QuickTip';
import docChecklist from '@/components/profile/DocumentChecklist';
import timeline from '@/components/profile/ApplicationTimeline';

export default {
  components: {
    visaCard,
    quickTip,
    docChecklist,
    timeline
  },
  data() {
    return {
      user: this.$store.state.auth.user.profile,
      visaList: this.$store.state.visas.visaList,
      results: this.$store.state.auth.user.profile.questionnaireResults,
    }
  },
  computed: {
    faveVisa() {
      if(this.user.favoriteVisa) {
        return this.visaList.filter(item => item.name === this.user.favoriteVisa.name)[0];
      } else {
        return false;
      }
    }
  },
  // Update documentChecklist in database before route leave
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('auth/updateProfile', this.user)
      .then(next());
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
  margin: $spacing*3 0 $spacing*5 0;
}
</style>
