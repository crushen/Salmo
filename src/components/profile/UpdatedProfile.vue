<template>
  <div>
    <section class="user-info content">
      <h1>Your current plan.</h1>

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
      <h3>Now you’ve completed your profile, it’s time to take a quiz and begin your visa journey.</h3>

      <p>Completing a quiz is the last step in setting up your profile. You’ll unlock new features such as the Permanent Residency helper and Doucmentaion Checklist.</p>

      <p class="margin">These features will appear here on your profile so be sure to check back once you’ve completed your first quiz!</p>

      <div class="button">
        <router-link
          :to="{name: 'questionnaire', params: {username: user.profile.username}}"
          :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}"
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
            <h3>What's next?</h3>
            <p>Once you’re done calculating your current visa, have a look at what your next step could be by checking out the Visa Planner!</p>
          </div>
          <img :src="visaPlannerImg" class="placeholder-img">
          <div class="button">
            <router-link
              :to="{name: 'visa-planner', params: {username: user.profile.username}}"
              tag="button"
              class="pink"
              :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
              Visa Planner
            </router-link>
          </div>
        </div>
      </section>

      <section class="quiz-results content">
        <p>The results of your latest quiz are saved for you below.</p>
        <router-link
          :to="{name: 'results', params: {username: user.profile.username}}"
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
import waveH from '@/assets/patterns/wave-horizontal.svg';
import waveV from '@/assets/patterns/wave-verticle.svg';

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
      visaPlannerImg,
      waveH,
      waveV
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

  .margin {
    margin-top: $spacing*3;
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
