<template>
  <div>
    <section class="user-info content">
      <h1>Your current plan.</h1>
      <h3>Here's where you're at right now with your visa and living situation in the UK.</h3>

      <profile-card :user="user" />

      <div class="edit-button">
        <router-link 
          :to="{ name: 'update-profile'}"
          class="edit-button">
          Edit Profile
        </router-link>
      </div>
    </section>

    <div 
      v-if="!user.profile.questionnaireResults.length"
      class="content no-quiz">
      <h3>When you complete your first quiz, the results will appear below!</h3>

      <p>Once you’ve completed the quiz, you’ll also gain access to other features such as your own Visa Stats and Facts page.</p>

      <div class="button">
        <router-link
          :to="{ name: 'questionnaire' }"
          tag="button"
          class="pink">
          Take Quiz!
        </router-link>
      </div>
    </div>

    <div v-else>
      <section class="visa-tools content">
        <p>Make sure your profile is accurate to help you calculate your future plans.</p>
        <p>Below are seom features which should help you work through your current visa.</p>

        <visa-dates-card class="dates-card" :user="user" />

        <pr-calculator />
      </section>

      <section class="content">
        <div class="next-step section-margin">
          <div class="text">
            <h3>Your next step...</h3>
            <p>When you're dont calculating everything and want to figure out your next step, do through to your visa planner!</p>
          </div>
          <img :src="visaPlannerImg" class="placeholder-img">
          <div class="button">
            <router-link
              :to="{name: 'visa-planner', params: {username: user.profile.username}}"
              tag="button"
              class="pink">
              Visa Planner
            </router-link>
          </div>
        </div>
      </section>

      <section class="quiz-results content">
        <p>The results of your latest quiz are saved for you below.</p>
        <router-link
          :to=" {name: 'results' }"
          tag="button"
          class="secondary">
          Quiz results
        </router-link>
      </section>
    </div>


  </div>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard';
import visaDatesCard from '@/components/profile/visa-dates/VisaDatesCard';
import prCalculator from '@/components/profile/PrCalculator';
import visaPlannerImg from '@/assets/illustrations/visa-planner.svg';

export default {
  props: {
    user: { required: true, type: Object }
  },
  components: {
    profileCard,
    visaDatesCard,
    prCalculator
  },
  data() {
    return {
      visaPlannerImg
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

h1 {
  margin-bottom: $spacing*4;
}

.user-info {
  margin-bottom: $spacing*6;

  .edit-button {
    width: 100%;
    text-align: center;
    margin-top: $spacing*2;
    text-decoration: underline;
  }
}

.no-quiz {
  h3 {
    margin-bottom: $spacing*3;
  }

  .button {
    margin-top: $spacing*5;
    text-align: center;
  }
}

.visa-tools {
  p:first-of-type {
    margin-bottom: $spacing*3;
  }

  p:last-of-type {
    margin-bottom: $spacing*5;
  }

  .dates-card {
    margin-bottom: $spacing*5;
  }
}

.next-step {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin-bottom: $spacing;
  }

  .text {
    width: 60%;
  }

  .placeholder-img {
    width: 120px;
  }

  .button {
    width: 100%;
    text-align: center;
    margin-top: $spacing*4;
  }
}

.quiz-results {
  width: 60%;
  margin: auto;
  margin-top: $spacing*8;
  text-align: center;

  button {
    margin-top: $spacing*2;
  }
}
</style>
