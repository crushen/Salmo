<template>
  <section id="profile">
    <img
      v-if="!user.emailVerified"
      src="@/assets/grey-background.png" alt=""
      class="background-1">
    <img 
      v-if="!user.emailVerified"
      src="@/assets/grey-background-bottom.png" alt=""
      class="background-2">
    <!-- Check if user has verified email and accepted T&C's -->
    <verify-email 
      v-if="!user.emailVerified" 
      :user="user"/>

    <div v-else>
      <!-- Check if user has filled out profile info -->
      <updated-profile 
        v-if="user.profile.age"
        :user="user" />

      <non-updated-profile v-else/>

      <!-- Links to help center and settings & log out button -->
      <settings />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import verifyEmail from '@/components/profile/VerifyEmail';
import updatedProfile from '@/components/profile/UpdatedProfile';
import nonUpdatedProfile from '@/components/profile/NonUpdatedProfile';
import settings from '@/components/profile/Settings';

export default {
  components: {
    verifyEmail,
    updatedProfile,
    nonUpdatedProfile,
    settings
  },
  data() {
    return {
      user: this.$store.state.auth.user
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

#profile {
  padding: $spacing*12 0 0;
  position: relative;
}

.background-1,
.background-2 {
  display: none;
  position: relative;
  z-index: 1;
}

// Tablet
@media screen and (min-width: 600px) {
  #profile {
    padding: $spacing*15 0 0;
    height: 100vh;
    overflow: hidden;
  }

  .background-1 {
    display: block;
    position: absolute;
    left: 0;
    top: -30px;
    width: 100%;
    height: 250px;
    overflow: hidden;
  }

  .background-2 {
    display: block;
    position: absolute;
    left: 0;
    bottom: -30px;
    width: 100%;
    height: 270px;
    overflow: hidden;
  }
}
</style>
