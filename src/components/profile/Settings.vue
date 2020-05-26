<template>
  <section class="help">
    <div class="content">
      <p>For more general advice or help on the UK application process, take a look through our Help Centre.</p>
      <div class="button">
        <router-link 
          :to="{name: 'help-centre'}"
          tag="button">
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
export default {
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
  margin-top: $spacing*8;
  padding: $spacing*8 0 $spacing*10 0;

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
</style>
