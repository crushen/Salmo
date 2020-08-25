<template>
  <div>
    <div class="content">
      <h1>Your current plan.</h1>
    </div>

    <section class="content wrapper">
      <div class="row">
        <div class="col">
          <profile-card :user="user" />

          <div class="edit-button">
            <router-link 
              :to="{ name: 'update-profile'}"
              class="edit-button aria-btn">
              Edit Profile
            </router-link> 
          </div>
        </div>

        <div 
          v-if="!user.profile.questionnaireResults.length"
          class="text col">
          <h3>Now you’ve completed your profile, it’s time to take a quiz and begin your visa journey.</h3>

          <p>Completing a quiz is the last step in setting up your profile. You’ll unlock new features such as the Permanent Residency helper and Doucmentaion Checklist.</p>

          <p class="margin">These features will appear here on your profile so be sure to check back once you’ve completed your first quiz!</p>
        </div>

        <div 
          v-else
          class="text col">
          <h3>Here you can keep up to date on all things relating to your current and future visas.</h3>

          <p>Our tools rely on your profile being accurate to work properly. Be sure to keep everything up to date to get the most use out of everything!</p>

          <p class="margin">Below you can find all the tools you’ll need to keep track, edit and document everything visa related.</p>
        </div>
      </div>

      <!-- If user hasn't completed quiz -->
      <div 
        v-if="!user.profile.questionnaireResults.length"
        class="no-quiz">

        <!-- Will show on mobile -->
        <div class="button">
          <router-link
            :to="{name: 'questionnaire', params: {username: user.profile.username}}"
            :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}"
            tag="button"
            class="pink">
            Take First Quiz!
          </router-link>
        </div>

        <!-- Will show on tablet+ -->
        <div class="moving-btn">
          <router-link :to="{name: 'questionnaire', params: {username: user.profile.username}}">
            <div class="container"> 
              <p>Take First Quiz!</p> 

              <div class='wave one'></div>
              <div class='wave two'></div>
              <div class='wave three'></div>
              <div class='wave four'></div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- If user has completed quiz -->
      <div v-else>
        <section class="visa-tools">
          <pr-calculator class="pr-calc" />

          <visa-dates-card class="dates-card" :user="user" />

          <img 
            src="@/assets/illustrations/profilePages/guy-laptop.svg" 
            alt="An illustrations of a man using a laptop">
        </section>

        <section class="">
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
                class="pink aria-btn"
                :style="{backgroundImage: `url(${waveH})`, backgroundSize: '110%', backgroundPosition: 'center'}">
                Visa Planner
              </router-link>
            </div>
          </div>
        </section>

        <section class="quiz-results">
          <p>You can also check out your latest quiz results, or take the quiz again.</p>
          <p>Remember each time you take the quiz, your last results will be lost.</p>

          <div class="buttons">
            <router-link
              :to="{name: 'questionnaire', params: {username: user.profile.username}}"
              tag="button"
              class="tertiary aria-btn">
              Re-Take Quiz
            </router-link>

            <router-link
              :to="{name: 'results', params: {username: user.profile.username}}"
              tag="button"
              class="secondary aria-btn">
              Quiz results
            </router-link>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard';
import visaDatesCard from '@/components/profile/visa-dates/VisaDatesCard';
import prCalculator from '@/components/profile/prCalc/PrCalculator';
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

.edit-button {
  width: 100%;
  text-align: center;
  margin-top: $spacing*2;
  text-decoration: underline;
}

.text {
  margin-top: $spacing*6;

  h3 {
    margin-bottom: $spacing*3;
  }

  .margin {
    margin-top: $spacing*3;
  }
}

.no-quiz {
  margin-top: $spacing*6;

  .button {
    text-align: center;
  }
}

.visa-tools {
  margin-top: $spacing*6;

  .dates-card {
    margin-top: $spacing*5;
  }

  img {
    display: none;
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
  margin-top: $spacing*8;

  p:last-of-type {
    margin-top: $spacing*3;
  }

  .buttons {
    margin-top: $spacing*5;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .tertiary {
      color: $primary-pink;
    }
  }
}

.moving-btn {
  width: 100%;
  // Set as flex for tablet+
  display: none;
  justify-content: center;
  align-items: center;

  .container {
    width: 300px;
    height: 300px;
    position: relative;

    p {
      position: absolute;
      z-index: 1;
      font-size: 32px;
      line-height: 0;
      font-weight: 700;
      color: $light-font;
      top: 48%;
      left: 12%;
    }

    .wave {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: $primary-pink;
      border-radius: 50%;
      animation: rotate 12s infinite linear;
      transform-origin: 50% 48%;

      &.two {
        animation: rotate 9s infinite linear;
      }

      &.three {
        animation: rotate 6s infinite linear;
      }

      &.four {
        animation: rotate 3s infinite linear;
      }
    }
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
}

// Tablet
@media screen and (min-width: 600px) {
  .content {
    width: 90%;
  }

  .row {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: space-between;

    .col.text {
      width: 45%;
    }
  }

  .no-quiz {
    margin-top: $spacing*8;

    .button {
      display: none;
    }
  }

  .moving-btn {
    display: flex;
  }

  .visa-tools {
    margin-top: $spacing*10;
    position: relative;

    .dates-card {
      margin-bottom: 0;
      margin-left: 52%;
      width: 48%;
    }

    img {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 48%;
    }
  }

  .next-step {
    border: 3px solid $primary-yellow;
    border-radius: $border-radius;
    padding: 0 8% $spacing*4;
    align-items: flex-end;

    h3 {
      margin-bottom: $spacing*2;
    }

    .text {
      width: 55%;
    }

    .placeholder-img {
      width: 160px;
      transform: translateY(30%);
    }

    .button {
      width: 50%;
    }
  }

  .quiz-results {
    margin-top: $spacing*12;

    p {
      text-align: center;
    }

    .buttons {
      margin-top: $spacing*6;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .wrapper {
    max-width: 800px;
    margin: $spacing*8 auto 0 auto;
  }

  .moving-btn {
    margin-top: $spacing*12;
  }
}
</style>
