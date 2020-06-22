<template>
  <section class="content single-page">
    <div>
      <h1>Let us help you find the perfect visa.</h1>

      <p class="subtitle">This quiz will work our your best options to remain in the UK.</p>
      <p class="text">The following questions are based off your <span class="bold">current visa</span>, so please ensure that your current visa is up to date in <router-link :to="{name: 'profile', params: {username: user.profile.username}}">your profile.</router-link></p>
    </div>

    <div class="button">
      <button @click="startQuestionnaire">
        Start Quiz
      </button>
      <p>This quiz will take<br> 2-5 minutes to complete.</p>
    </div>

    <div class="moving-btn">
      <a @click="startQuestionnaire">
        <div class="container"> 
          <p>Start Quiz</p> 

          <div class='wave one'></div>
          <div class='wave two'></div>
          <div class='wave three'></div>
          <div class='wave four'></div>
        </div>
      </a>
    </div>

    <img 
      src="@/assets/illustrations/quiz/Quiz Begin.svg" 
      alt="An illustration of a person with their thumb up">
  </section>
</template>

<script>
export default {
  props: {
    user: { required: true, type: Object }
  },
  methods: {
    startQuestionnaire() {
      this.$emit('startQuestionnaire');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.subtitle {
  font-weight: 600;
  margin-top: 10vw;
}

.text {
  margin-top: $spacing*2;
}

.bold {
  font-weight: 600;
}

a {
  text-decoration: underline;
}

.button {
  margin-top: $spacing*2;
  text-align: center;

  p {
    font-weight: 300;
    margin:  $spacing*4 auto 0 auto;
  }
}

img {
  width: 30vw;
  height: 30vw;
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: 0 0;
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
      color: $dark-font;
      top: 48%;
      left: 23%;
    }

    .wave {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: $primary-yellow;
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
  .button {
    display: none;
  }

  .moving-btn {
    display: flex;
  }

  img {
    width: 27vw;
    height: 27vw;
    position: absolute;
    bottom: 0;
    left: 90px;
    object-fit: cover;
    object-position: 0 0;
  }
}
</style>
