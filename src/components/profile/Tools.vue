<template>
  <div class="scroll-container">
    <ul class="margin-s top">
      <li>
        <router-link :to="{ name: 'visa-planner', params: { username: user.profile.username } }">
          <img src="@/assets/illustrations/tools/visa-planner.svg" alt="">
          <p class="title">Visa Planner</p>
        </router-link>
      </li>

      <li>
        <router-link :to="{ name: 'visa-quiz', params: { username: user.profile.username } }">
          <img src="@/assets/illustrations/tools/visa-quiz.svg" alt="">
          <p class="title">Visa Quiz</p>
        </router-link>
      </li>

      <li>
        <router-link :to="{ name: 'visa-book', params: { username: user.profile.username } }">
          <img src="@/assets/illustrations/tools/visa-book.svg" alt="">
          <p class="title">Visa Book</p>
        </router-link>
      </li>

      <li>
        <router-link :to="{ name: 'ilr-tracker', params: { username: user.profile.username } }">
          <img src="@/assets/illustrations/tools/ilr-tracker.svg" alt="">
          <p class="title">ILR Tracker</p>
        </router-link>
      </li>

      <li>
        <router-link :to="{ name: 'settings', params: { username: user.profile.username } }">
          <img src="@/assets/illustrations/tools/ilr-tracker.svg" alt="">
          <p class="title">Settings</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { user: { type: Object, required: true } }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.scroll-container {
  overflow-x: scroll;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

ul {
  margin-left: 3em;
  width: 750px;
}

li {
  position: relative;
  margin-right: 1em;
  display: inline-block;

  p {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    color: $blue;
    width: 60%;
  }
}
</style>
