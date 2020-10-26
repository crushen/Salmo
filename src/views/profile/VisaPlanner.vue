<template>
  <div class="tools-pages">
    <main class="tools-pages page padding top">
      <back-button
        @go-back="$router.push({ name: 'profile', params: { username: user.profile.username } })"
        text="Profile" />

      <div class="background">
        <div class="content">
          <h1 class="margin-s top">Visa Planner</h1>

          <h2 class="margin-s top bottom">{{ user.profile.nextVisa.name }}</h2>
        </div>

        <doc-checklist :user="user" />

        <timeline :user="user" class="margin-m top" />
      </div>
    </main>
  </div>
</template>

<script>
import docChecklist from '@/components/profile/DocumentChecklist'
import timeline from '@/components/profile/ApplicationTimeline'
import backButton from '@/components/BackButton'

export default {
  components: { docChecklist, timeline, backButton },
  data() {
    return {
      user: this.$store.state.auth.user
    }
  },
  //Update documentChecklist in database before route leave
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('auth/updateProfile', this.user.profile).then(next());
  }
}
</script>
