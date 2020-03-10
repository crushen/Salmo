<template>
  <section class="content">
    <!-- If user has verified email -->
    <section v-if="user.emailVerified">
      <h1>{{ user.profile.firstName }} {{ user.profile.lastName }}</h1>

      <user-info 
        v-if="!profileUpdate"
        :userProfile="user.profile"
        @openProfileUpdate="openProfileUpdate"/>

      <update-profile
        v-else
        :userProfile="user.profile"
        @closeUpdate="profileUpdate = false"
        @submitProfile=submitProfile />
    </section>

    <!-- If user hasn't verified email -->
    <section v-else>
      <div>
        <p>We've sent a link to your email to verify your email address.</p>
      </div>
    </section>
  </section>
</template>

<script>
import userInfo from '@/components/profile/UserInfo';
import updateProfile from '@/components/profile/UpdateProfile';

export default {
  components: {
    userInfo,
    updateProfile
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      userAge: this.$store.state.auth.user.profile.age,
      profileUpdate: false
    }
  },
  methods: {
    openProfileUpdate() {
      this.profileUpdate = true;
    },
    submitProfile(profile) {
      this.$store.dispatch('auth/updateProfile', profile)
        .then(() => {
          this.userAge = profile.age;
          this.profileUpdate = false;
        })
    }
  }
}
</script>

<style scoped>
.content {
  width: 80%;
  margin: auto;
  text-align: left;
}
</style>
