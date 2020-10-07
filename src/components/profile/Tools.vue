<template>
  <ul>
    <li>
      <router-link :to="{ name: 'visa-planner', params: { username: user.profile.username } }">
        Visa Planner
      </router-link>
    </li>

    <li>
      <router-link :to="{ name: 'visa-quiz', params: { username: user.profile.username } }">
        Visa Quiz
      </router-link>
    </li>

    <li>
      <router-link :to="{ name: 'visa-book', params: { username: user.profile.username } }">
        Visa Book
      </router-link>
    </li>

    <li>
      <router-link :to="{ name: 'ilr-tracker', params: { username: user.profile.username } }">
        ILR Tracker
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: { user: { type: Object, required: true } }
}
</script>
