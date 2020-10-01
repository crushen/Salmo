<template>
  <section id="profile">
    <user-info v-if="!this.user.profile.completeUserInfo" />

    <updated-profile v-else :user="user" />
  </section>
</template>

<script>
import userInfo from '@/components/profile/userInfo/UserInfo'
import updatedProfile from '@/components/profile/UpdatedProfile'

export default {
  components: {
    userInfo,
    updatedProfile
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>
