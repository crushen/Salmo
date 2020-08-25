<template>
  <section class="help">
    <transition name="alert" mode="out-in">
      <alert 
        v-if="showAlert"
        alert="Are you sure you want to log out?"
        text="You can always log back in at any time."
        :buttons="['Cancel', 'Log out']"
        @cancel="showAlert = false"
        @confirm="handleLogout" />
    </transition>

    <img 
      v-if="!user.emailVerified || !user.profile.questionnaireResults.length"
      src="@/assets/illustrations/alternateStates/Profile before sign in etc.svg" 
      alt="An illustration of a person thinking">

    <div class="content">
      <div class="col">
        <p class="help-text">If you’ve got a specific question about a visa related topic, our Help Centre has lots of helpful guides to all things visa!</p>
        <div class="button">
          <router-link 
            :to="{name: 'help-centre'}"
            tag="button"
            class="aria-btn"
            :style="{backgroundImage: `url(${dots})`, backgroundSize: '100%', backgroundPosition: 'center'}">
            Help Centre
          </router-link>
        </div>
      </div>

      <div class="col">
        <div class="notificaitons">
          <div class="inner">
            <p>You can also change your preferences and how we get in touch on your 
              <router-link 
                :to="{ name: 'settings' }"
                tag="button"
                class="tertiary aria-btn">
                Settings
              </router-link>
              page.</p>
          </div>
        </div>
        <div class="button log-out">
          <button 
            @click="logOut" 
            type="button"
            class="secondary aria-btn">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import alert from '@/components/Alert';
import dots from '@/assets/patterns/dots.svg';

export default {
  components: {
    alert
  },
  data() {
    return {
      showAlert: false,
      dots,
      user: this.$store.state.auth.user
    }
  },
  methods: {
    logOut() {
      this.showAlert = true;
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';
    },
    handleLogout() {
      this.$store.dispatch('auth/logOut')
      .then(() => {
        this.$store. commit('auth/setLoggedOut')
        if(this.$route.path !== '/') {
          this.$router.push('/')
        }
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
    margin-top: $spacing*6;

    .inner {
      background: $light-grey;
      padding: $spacing*2;
      border-radius: 4px;
    }
  }
}

img {
  width: 25vw;
  position: absolute;
  right: 0;
  top: -23vw;
}

// Tablet
@media screen and (min-width: 600px) {
  img {
    width: 120px;
    position: absolute;
    right: 10px;
    top: -115px;
  }

  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 90%;

    .col {
      width: 49%;
    }
  }

  .help {
    margin-top: $spacing*12;
    padding: $spacing*12 0 $spacing*15 0;

    .help-text {
      padding: $spacing*2;
      min-height: 112px;
    }

    .notificaitons {
      margin-top: 0;
      min-height: 112px;
    }

    .button {
      margin-top: $spacing*4;

      &.log-out {
        margin-top: $spacing*4;
      }
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  img {
    left: 20%;
    top: -115px;
    transform: scaleX(-1);
  }

  .help {
    .button {
      margin-top: $spacing*6;

      &.log-out {
        margin-top: $spacing*6;
      }
    }
  }
}
</style>
