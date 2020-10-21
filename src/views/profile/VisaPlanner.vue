<template>
  <main class="page padding top">
    <div class="background">
      <div class="content">
        <h1 class="margin-s top">Visa Planner</h1>

        <h2 class="margin-s top bottom">{{ user.profile.nextVisa.name }}</h2>
      </div>

      <doc-checklist :user="user" />

      <timeline />
    </div>
  </main>
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.background {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 85px;
  left: 0;
  background: $yellow;
  border-top-left-radius: $radius;
  border-top-right-radius: $radius;
}
</style>
