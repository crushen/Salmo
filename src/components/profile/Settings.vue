<template>
  <section class="help">
    <img 
      v-if="!user.emailVerified || !user.profile.questionnaireResults.length"
      src="@/assets/illustrations/alternateStates/Profile before sign in etc.svg" 
      alt="An illustration of a person thinking">

    <div class="content">
      <p>For more general advice or help on the UK application process, take a look through our Help Centre.</p>
      <div class="button">
        <router-link 
          :to="{name: 'help-centre'}"
          tag="button"
          :style="{backgroundImage: `url(${dots})`, backgroundSize: '60px 60px'}">
          Help Centre
        </router-link>
      </div>
      <div class="notificaitons">
        <p>You can also change your preferences and how we get in touch on your 
          <router-link 
            :to="{ name: 'settings' }"
            tag="button"
            class="tertiary">
            Settings
          </router-link>
          page.</p>
      </div>
      <div class="button log-out">
        <button 
          @click="handleLogout" 
          type="button"
          class="secondary">
          Log Out
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import dots from '@/assets/illustrations/patterns/dots.svg';

export default {
  data() {
    return {
      user: this.$store.state.auth.user,
      dots
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logOut')
      .then(() => {
        if(this.$route.path !== '/') {
          this.$router.push('/')
        }
        alert('You have been logged out')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.help {
  background: $background;
  margin-top: $spacing*12;
  padding: $spacing*8 0 $spacing*10 0;
  position: relative;

  .button {
    margin-top: $spacing*2;
    text-align: center;

    &.log-out {
      margin-top: $spacing*8;
      
      button {
        width: 120px;
      }
    }
  }

  .notificaitons {
    background: $light-grey;
    padding: $spacing*2;
    border-radius: 4px;
    margin-top: $spacing*6;
  }
}

img {
  width: 25vw;
  position: absolute;
  right: 0;
  top: -23vw;
}
</style>
