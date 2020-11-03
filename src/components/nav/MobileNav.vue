<template>
  <div>
    <transition name="dialog" mode="out-in">
      <logout-alert
        v-if="showLogoutAlert"
        @confirm="handleLogout"
        @cancel="showLogoutAlert = false" />
    </transition>

    <svg id="morph" width="375" height="667" viewBox="0 0 375 667" fill="none" preserveAspectRatio="none">
      <path class="morph" d="M241 641.5C146.5 667 33 662 0 662V667L375 667V601C337 577 305.026 624.223 241 641.5Z" fill="#077594"/>
    </svg>

    <transition mode="out-in" name="fade">
      <button v-if="!open" @click="openNav" class="burger none aria-btn">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </button>

      <nav v-on-clickaway="closeNav" v-else>
        <router-link 
          @click.native="nextPage"
          :to="{ name: 'home' }" exact>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
            <path class="background" d="M26.46,38.94l9.92.12a1.31,1.31,0,0,0,1.34-1.31V20.42a1.3,1.3,0,0,0-.5-1L24.85,9.61a1.34,1.34,0,0,0-1.69,0L10.72,20.34a1.31,1.31,0,0,0-.46,1v16.3a1.33,1.33,0,0,0,1.33,1.31H26.46" fill="#77b3c4"/>
            <path d="M38.2,19.27,24.46,8.41a.77.77,0,0,0-1,0L9.78,20.23a.77.77,0,0,0-.26.57V39a.75.75,0,0,0,.75.74H26.91a.74.74,0,0,0,.75-.74V28.63a.74.74,0,0,0-.75-.74H21.07a.75.75,0,0,0-.75.74v9.63H11V21.14L24,10,37,20.21v8.42a.75.75,0,1,0,1.5,0V19.85A.72.72,0,0,0,38.2,19.27ZM21.82,29.38h4.34v8.88H21.82Z" fill="#fff"/>
          </svg>
          <p>Home</p>
        </router-link>

        <template v-if="$route.meta.onlyVerifiedUser">
          <router-link 
            @click.native="nextPage"
            :to="{ name: 'visa-info' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path class="background" d="M35.39,21.16V36.34a2.7,2.7,0,0,1-2.7,2.7H12.61V9H32.68a2.84,2.84,0,0,1,2.71,2.74C35.42,14.86,35.39,21.16,35.39,21.16Z" fill="#77b3c4"/>
              <path d="M35.39,20.43a.76.76,0,0,0-.75.75v15.1a2,2,0,0,1-2,1.95H13.36V9.77H32.68A.74.74,0,0,0,33.43,9a.75.75,0,0,0-.75-.75H12.61a.75.75,0,0,0-.75.75V39a.75.75,0,0,0,.75.75H32.69a3.45,3.45,0,0,0,3.45-3.44V21.18A.75.75,0,0,0,35.39,20.43Z" fill="#fff"/>
              <path d="M24,12.46a7.21,7.21,0,1,0,7.18,7.21A7.2,7.2,0,0,0,24,12.46Zm0,12.91a5.71,5.71,0,1,1,5.68-5.7A5.7,5.7,0,0,1,24,25.37Z" fill="#fff"/>
              <path d="M18.78,30.36a.76.76,0,0,0-.75.75v3.65a.76.76,0,0,0,.75.75H29.22a.76.76,0,0,0,.75-.75V31.11a.76.76,0,0,0-.75-.75ZM28.47,34H19.53V31.86h8.94Z" fill="#fff"/>
            </svg>
            <p>Visas</p>
          </router-link>
        </template>

        <router-link 
          @click.native="nextPage"
          :to="{ name: 'about' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
            <circle class="background" cx="19.7051" cy="19.5" r="18.5" fill="#77B3C4"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 17.1335C20.5 17.1335 25.496 15.8488 29.4963 18.7267C33.4965 21.6047 33.4793 25.9199 33.4793 25.9199C33.4793 25.9199 28.6035 25.8793 24.9295 23.6759C21.7224 21.7535 20.5 17.1335 20.5 17.1335Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.48799 7.08207C4.2545 7.23902 3.0527 9.00173 2.95312 9.22139C3.68107 8.86851 4.87944 8.33292 6.21171 7.92275C7.59205 7.49664 9.12004 7.19359 10.3733 7.43054C13.292 7.98037 15.699 9.60445 19.0399 17.3356C21.6083 23.2733 26.4464 25.7407 30.6458 26.4495C33.2829 26.8946 35.8787 26.2604 37.4617 25.719C37.7604 24.8841 37.8394 24.7048 38.0076 24.0604C36.9844 24.5275 33.9593 25.6329 30.8793 25.1133C27.0473 24.4668 22.6419 22.2146 20.3036 16.8034C16.6398 8.33054 13.8276 6.70105 10.6343 6.09868C9.17497 5.8241 7.4032 6.13462 5.79966 6.62852C5.34298 6.76954 4.90347 6.92445 4.48799 7.08207Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4509 0C30.0713 0 38.6967 8.51356 38.6967 19C38.6967 29.4864 30.0713 38 19.4509 38C8.8305 38 0.205078 29.4864 0.205078 19C0.205078 8.51356 8.8305 0 19.4509 0ZM19.4509 1.28847C29.3571 1.28847 37.4091 9.22 37.4091 19C37.4091 28.78 29.3571 36.7115 19.4509 36.7115C9.5447 36.7115 1.49271 28.78 1.49271 19C1.49271 9.22 9.5447 1.28847 19.4509 1.28847Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.5108 28.6903C33.4765 29.0629 33.14 29.3361 32.7623 29.3005C32.3846 29.2646 32.1064 28.9334 32.1442 28.5608C32.1442 28.5608 32.3433 26.5378 32.0274 24.7561C31.9313 24.2083 31.7871 23.6839 31.5605 23.2628C31.3922 22.9483 31.1862 22.6917 30.8841 22.5876C30.527 22.4639 30.3381 22.0771 30.4617 21.7239C30.5887 21.3706 30.9802 21.1842 31.3373 21.3076C32.2094 21.6093 32.8104 22.4506 33.1469 23.5415C33.7993 25.651 33.5108 28.6903 33.5108 28.6903Z" fill="white"/>
          </svg>
          <p>About</p>
        </router-link>

        <!-- <template v-if="!isAuthenticated">
          <router-link 
            @click.native="nextPage"
            :to="{ name: 'login' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path class="background" d="M8.19,39.74C10,37.87,14.57,32.19,24,32.19a20.28,20.28,0,0,1,15.81,7.55" fill="#77b3c4"/>
              <ellipse class="background" cx="24" cy="19.26" rx="9.92" ry="9.96" fill="#77b3c4"/>
              <path d="M40.39,38.54A21,21,0,0,0,24,30.84,20.81,20.81,0,0,0,8.14,38l-.48.5a.72.72,0,0,0,0,1,.76.76,0,0,0,1.06,0l.5-.51A19.14,19.14,0,0,1,24,32.32a19.49,19.49,0,0,1,15.22,7.15.76.76,0,0,0,.59.27.74.74,0,0,0,.58-1.2Z" fill="#fff"/>
              <path d="M24,29.68A10.71,10.71,0,1,0,13.33,19,10.71,10.71,0,0,0,24,29.68ZM24,9.76A9.21,9.21,0,1,1,14.83,19,9.2,9.2,0,0,1,24,9.76Z" fill="#fff"/>
            </svg>
            <p>Login</p>
          </router-link>
        </template> -->

        <template v-if="$route.meta.onlyVerifiedUser">
          <router-link 
            @click.native="nextPage"
            :to="{ name: 'profile', params: { username: user.profile.username } }">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path class="background" d="M8.19,39.74C10,37.87,14.57,32.19,24,32.19a20.28,20.28,0,0,1,15.81,7.55" fill="#77b3c4"/>
              <ellipse class="background" cx="24" cy="19.26" rx="9.92" ry="9.96" fill="#77b3c4"/>
              <path d="M40.39,38.54A21,21,0,0,0,24,30.84,20.81,20.81,0,0,0,8.14,38l-.48.5a.72.72,0,0,0,0,1,.76.76,0,0,0,1.06,0l.5-.51A19.14,19.14,0,0,1,24,32.32a19.49,19.49,0,0,1,15.22,7.15.76.76,0,0,0,.59.27.74.74,0,0,0,.58-1.2Z" fill="#fff"/>
              <path d="M24,29.68A10.71,10.71,0,1,0,13.33,19,10.71,10.71,0,0,0,24,29.68ZM24,9.76A9.21,9.21,0,1,1,14.83,19,9.2,9.2,0,0,1,24,9.76Z" fill="#fff"/>
            </svg>
            <p>Profile</p>
          </router-link>
        </template>

        <template v-if="$route.meta.onlyVerifiedUser">
          <a @click="showLogoutAlert = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path class="background" d="M8.19,39.74C10,37.87,14.57,32.19,24,32.19a20.28,20.28,0,0,1,15.81,7.55" fill="#77b3c4"/>
              <ellipse class="background" cx="24" cy="19.26" rx="9.92" ry="9.96" fill="#77b3c4"/>
              <path d="M40.39,38.54A21,21,0,0,0,24,30.84,20.81,20.81,0,0,0,8.14,38l-.48.5a.72.72,0,0,0,0,1,.76.76,0,0,0,1.06,0l.5-.51A19.14,19.14,0,0,1,24,32.32a19.49,19.49,0,0,1,15.22,7.15.76.76,0,0,0,.59.27.74.74,0,0,0,.58-1.2Z" fill="#fff"/>
              <path d="M24,29.68A10.71,10.71,0,1,0,13.33,19,10.71,10.71,0,0,0,24,29.68ZM24,9.76A9.21,9.21,0,1,1,14.83,19,9.2,9.2,0,0,1,24,9.76Z" fill="#fff"/>
            </svg>
            <p>Sign Out</p>
          </a>
        </template>

        <template v-else>
          <router-link 
            @click.native="nextPage"
            :to="{ name: 'sign-in' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path class="background" d="M8.19,39.74C10,37.87,14.57,32.19,24,32.19a20.28,20.28,0,0,1,15.81,7.55" fill="#77b3c4"/>
              <ellipse class="background" cx="24" cy="19.26" rx="9.92" ry="9.96" fill="#77b3c4"/>
              <path d="M40.39,38.54A21,21,0,0,0,24,30.84,20.81,20.81,0,0,0,8.14,38l-.48.5a.72.72,0,0,0,0,1,.76.76,0,0,0,1.06,0l.5-.51A19.14,19.14,0,0,1,24,32.32a19.49,19.49,0,0,1,15.22,7.15.76.76,0,0,0,.59.27.74.74,0,0,0,.58-1.2Z" fill="#fff"/>
              <path d="M24,29.68A10.71,10.71,0,1,0,13.33,19,10.71,10.71,0,0,0,24,29.68ZM24,9.76A9.21,9.21,0,1,1,14.83,19,9.2,9.2,0,0,1,24,9.76Z" fill="#fff"/>
            </svg>
            <p>Sign In</p>
          </router-link>
        </template>
      </nav>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import anime from 'animejs'
import logoutAlert from '@/components/alerts/logout/ConfirmLogout'

export default {
  mixins: [ clickaway ],
  components: { logoutAlert },
  data() {
    return {
      open: false,
      showLogoutAlert: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    openNav() {
      this.open = true
      this.animate()
    },
    closeNav() {
      this.open = false
      this.animate()
    },
    nextPage() {
      setTimeout(() => { 
        this.open = false
        this.animate()
      }, 300)
    },
    animate() {
      if(this.open) {
        anime({
          targets: '.morph',
          d: [{ value: 'M213 584C115.12 583.999 33 584 0 584V667L375 667V584C319 584 234 584 213 584Z' }],//
          easing: 'easeInOutQuint',
          duration: 700
        })
      } else {
        anime({
          targets: '.morph',
          d: [{ value: 'M241 641.5C146.5 667 33 662 0 662V667L375 667V601C337 577 305.026 624.223 241 641.5Z' }],
          easing: 'easeInOutQuint',
          duration: 700
        })
      }
    },
    handleLogout() {
      this.showLogoutAlert = false

      setTimeout(() => {
        this.$store.dispatch('auth/logOut')
        .then(() => {
          this.$store. commit('auth/setLoggedOut')
          this.$store.commit('wave/setWaveAway', false)
          this.$store.commit('wave/setFullScreen', false)
          this.$store.dispatch('wave/handleTransition')

          if(this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
      }, 800)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

#morph {
  width: 100%;
  pointer-events: none;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 20;
  transition: 0.4s;
}

.burger {
  position: fixed;
  bottom: 0.8em;
  right: 5vw;
  z-index: 25;
  width: 40px;
  height: 40px;
  transition: 0.4s;

  .line {
    width: 70%;
    height: 3px;
    margin: auto;
    background: $light-font;
  }
  
  .line:not(:last-of-type) {
    margin-bottom: 4px;
  }
}

nav {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 21;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 0.8em;
    font-weight: 600;
    color: $light-font;
    pointer-events: none;
    transform: translate3d(0, -0.5em, 0);
  }

  svg {
    pointer-events: none;
  }
}

a {
  text-decoration: none;
}

.background {
  fill: none;
}

a.router-link-active {
  .background {
    fill: $secondary-blue;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>
