<template>
  <div>
    <section class="user-info content">
      <h1>Your current plan.</h1>
      <h2>Here's where you're at right now with your visa and living situation in the UK.</h2>

      <profile-card :user="user" />

      <div class="edit-button">
        <router-link 
          v-if="user.profile.age"
          :to="{ name: 'update-profile'}"
          class="edit-button">
          Edit Profile
        </router-link>

        <router-link 
          v-else
          tag="button"
          :to="{ name: 'update-profile'}">
          Create Profile
        </router-link>
      </div>
    </section>

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
        <div class="placeholder-img"></div>
        <div class="button">
          <button class="pink">Visa Planner</button>
        </div>
      </div>
    </section>

    <section class="quiz-results content">
      <p>The results of your latest quiz are saved for you below.</p>
      <button class="secondary">Quiz Results</button>
    </section>
  </div>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard';
import visaDatesCard from '@/components/profile/VisaDatesCard';
import prCalculator from '@/components/profile/PrCalculator';

export default {
  props: {
    user: { required: true, type: Object }
  },
  components: {
    profileCard,
    visaDatesCard,
    prCalculator
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

h1 {
  margin-bottom: $spacing*2;
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
    height: 120px;
    background: $light-grey;
    border-radius: 200px;
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
