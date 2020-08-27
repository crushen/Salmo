<template>
  <div v-if="favoriteVisa">
    <section class="content">
      <h1>Your next step.</h1>

      <section class="results">
        <p class="title">Here's your favourite visa:</p>

        <visa-card
          :visa="favoriteVisa"
          :favouriteVisa="favoriteVisa.name"
          class="visa-card">
        </visa-card>

        <section class="buttons">
          <router-link
            :to="{ name: 'non-eu' }"
            tag="button"
            class="tertiary aria-btn">
            Change Favourite Visa
          </router-link>
          <p>The below can help you keep track of what documentation you need and the process overall. You can also revisit your Quiz Results if you want to see more options.</p>
          <router-link
            :to=" {name: 'results', params: {username: user.username} }"
            tag="button"
            class="secondary aria-btn">
            Quiz results
          </router-link>
        </section>
      </section>

      <section class="documentation section-margin">
        <p class="emphasis">These tools are based off your current favourite visa, so be sure to keep it up to date!</p>

        <div class="row">
          <doc-checklist 
            :visa="favoriteVisa"
            :docChecklist="user.favoriteVisa"
            class="col" />

          <timeline class="col" />

          <img 
            src="@/assets/illustrations/profilePages/visa-planner-2.svg" 
            alt="Illustrations of a woman having an idea">
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import visaCard from '@/components/visa/VisaCard';
import docChecklist from '@/components/profile/DocumentChecklist';
import timeline from '@/components/profile/ApplicationTimeline';

export default {
  components: {
    visaCard,
    docChecklist,
    timeline
  },
  data() {
    return {
      user: this.$store.state.auth.user.profile,
      results: this.$store.state.auth.user.profile.questionnaireResults,
    }
  },
  computed: {
    ...mapState('visas', ['favoriteVisa'])
  },
  created() {
    this.$store.dispatch('visas/getFaveVisa', this.user.favoriteVisa.name);
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
    text-align: center;

    .secondary {
      margin-top: $spacing*2;
    }

    p {
      text-align: left;
      margin-top: $spacing*10;
    }
  }
}

.emphasis {
  font-weight: 600;
  margin: $spacing*3 0 $spacing*5 0;
}

.row {
  img {
    display: none;
  }
}


// Tablet
@media screen and (min-width: 600px) {
  .content {
    padding: $spacing*15 0;
    width: 90%;
  }

  .results {
    margin-top: $spacing*5;

    p {
      margin-bottom: $spacing*3;

      &.title {
        margin: $spacing*6 0 $spacing*4;
      }
    }
  }

  .row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;

    .col {
      width: 48%;
    }

    img {
      display: block;
      width: 40%;
      position: absolute;
      bottom: $spacing*8;
      left: 0;
    }
  }
}
</style>
