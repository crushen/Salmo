<template>
  <main v-if="this.user" id="profile">
    <transition name="slide" mode="out-in">
      <user-info v-if="!this.user.profile.completeUserInfo" key="info" />

      <updated-profile v-else :user="user" key="updated" />
    </transition>

    <!-- <img
      v-if="!this.user.profile.completeUserInfo"
      src="@/assets/backgrounds/bottom-wave.svg"
      alt=""> -->
  </main>
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
