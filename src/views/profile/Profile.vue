<template>
  <main v-if="this.user" id="profile">
    <user-info v-if="!this.user.profile.completeUserInfo" />

    <updated-profile v-else :user="user" />

    <settings />
    <img
      v-if="!this.user.profile.completeUserInfo"
      src="@/assets/backgrounds/bottom-wave.svg"
      alt="">
  </main>
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

<style lang="scss" scoped>
#profile {
  min-height: 100vh;
  position: relative;
}

img {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
