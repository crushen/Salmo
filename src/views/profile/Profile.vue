<template>
  <section id="profile">
    <user-info v-if="this.user && !this.user.profile.completeUserInfo" />

    <updated-profile v-else :user="user" />

    <settings />
  </section>
</template>

<script>
import userInfo from '@/components/profile/userInfo/UserInfo'
import updatedProfile from '@/components/profile/UpdatedProfile'
import settings from '@/components/profile/Settings'

export default {
  components: {
    userInfo,
    updatedProfile,
    settings
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>
