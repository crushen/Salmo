<template>
  <main class="content">
    <h1>Visa Planner</h1>

    <h2>{{ user.profile.nextVisa }}</h2>

    <doc-checklist />
  </main>
</template>

<script>
import docChecklist from '@/components/profile/DocumentChecklist'
import timeline from '@/components/profile/ApplicationTimeline'

export default {
  components: { docChecklist },
  data() {
    return {
      user: this.$store.state.auth.user
    }
  }
  // Update documentChecklist in database before route leave
  // beforeRouteLeave(to, from, next) {
  //   this.$store.dispatch('auth/updateProfile', this.user)
  //     .then(next());
  // }
}
</script>
