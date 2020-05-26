<template>
  <section id="profile">
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
}
</style>
