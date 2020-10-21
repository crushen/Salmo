<template>
  <div class="tools-pages">
    <main class="tools-pages page padding top">
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

export default {
  components: { docChecklist, timeline },
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
