<template>
  <section>
    <div
      v-on-clickaway="close"
      :class="this.open ? 'open' : ''"
      id="nav">
      <div class="nav-content">
        <transition 
          mode="out-in"
          name="fade">
          <button
            v-if="!open"
            @click="open = true">
            <div class="open">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </button>

          <nav v-else>
            <router-link 
              @click.native="nextPage"
              :to="{ name: 'home' }" exact>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                <path class="background" d="M26.46,38.94l9.92.12a1.31,1.31,0,0,0,1.34-1.31V20.42a1.3,1.3,0,0,0-.5-1L24.85,9.61a1.34,1.34,0,0,0-1.69,0L10.72,20.34a1.31,1.31,0,0,0-.46,1v16.3a1.33,1.33,0,0,0,1.33,1.31H26.46" fill="#77b3c4"/>
                <path d="M38.2,19.27,24.46,8.41a.77.77,0,0,0-1,0L9.78,20.23a.77.77,0,0,0-.26.57V39a.75.75,0,0,0,.75.74H26.91a.74.74,0,0,0,.75-.74V28.63a.74.74,0,0,0-.75-.74H21.07a.75.75,0,0,0-.75.74v9.63H11V21.14L24,10,37,20.21v8.42a.75.75,0,1,0,1.5,0V19.85A.72.72,0,0,0,38.2,19.27ZM21.82,29.38h4.34v8.88H21.82Z" fill="#fff"/>
              </svg>
              <p>Home</p>
            </router-link>

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

            <template v-if="!isAuthenticated">
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
            </template>

            <template v-else>
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

            <router-link 
              @click.native="nextPage"
              :to="{ name: 'about' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                <circle class="background" cx="23.87" cy="24" r="15.09" fill="#77b3c4"/>
                <path d="M23.69,29.11a3,3,0,0,0-2.9,3.12,2.93,2.93,0,0,0,1,2.1,3,3,0,0,0,2,.74H24a3,3,0,1,0-.3-6Zm.24,4.75a1.87,1.87,0,0,1-1.33-.44A1.75,1.75,0,0,1,22,32.17a1.77,1.77,0,0,1,1.76-1.86,1.8,1.8,0,0,1,2,1.66A1.83,1.83,0,0,1,23.93,33.86Z" fill="#fff"/>
                <path d="M29.17,14.39a7,7,0,0,0-4.85-1.47,6.46,6.46,0,0,0-6.42,7.2.62.62,0,0,0,.2.42.61.61,0,0,0,.43.15l3.6-.18a.6.6,0,0,0,.57-.62,2,2,0,0,1,3.17-1.72,1.58,1.58,0,0,1,.54,1.2A1.69,1.69,0,0,1,25.34,21l-1.05.47c-2.43,1.15-3.29,2.79-2.88,5.5l0,.56a.6.6,0,0,0,.6.57h0l3.16-.16a.6.6,0,0,0,.57-.6v-.59c0-.73.26-.93,1.45-1.4a6.32,6.32,0,0,0,4.07-6.37A6.14,6.14,0,0,0,29.17,14.39Zm-2.37,9.8c-1.07.43-2.28.91-2.2,2.54l-2,.1a.43.43,0,0,0,0,0c-.34-2.22.23-3.34,2.19-4.26l1.05-.47a2.91,2.91,0,0,0,1.77-2.75,2.72,2.72,0,0,0-1-2.06,3.05,3.05,0,0,0-1.94-.63h-.21a3.11,3.11,0,0,0-2.95,2.73l-2.44.12a5.22,5.22,0,0,1,5.29-5.34,5.73,5.73,0,0,1,4,1.19A5,5,0,0,1,30.12,19,5.08,5.08,0,0,1,26.8,24.19Z" fill="#fff"/>
                <path d="M34.58,12.29A15.77,15.77,0,0,0,13.44,35.71,15.64,15.64,0,0,0,24,39.77c.27,0,.55,0,.82,0a.74.74,0,0,0,.71-.78.78.78,0,0,0-.78-.72,14.27,14.27,0,1,1-1.46-28.5,14.27,14.27,0,0,1,15,13.52A.75.75,0,0,0,39,24h0a.76.76,0,0,0,.71-.79A15.66,15.66,0,0,0,34.58,12.29Z" fill="#fff"/>
              </svg>
              <p>About</p>
            </router-link>
          </nav>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  data() {
    return {
      open: false
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
    close() {
      this.open = false;
    },
    nextPage() {
      setTimeout(() => {
        this.open = false;
      }, 300);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.fade-enter-active {
  transition: 0.3s;
  transition-delay: 0.3s;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

#nav {
  width: 120px;
  height: 120px;
  background: $secondary-pink;
  border-radius: 100px;
  position: fixed;
  z-index: 20;
  bottom: -50px;
  right: -50px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
  transition: 0.3s;

  &.open {
    width: calc(100% + 50px);
  }

  button {
    width: 120px;
    height: 120px;
    padding: 0 26px;
    background: none;
    border-radius: 100px;

    .line {
      transform: translateY(-20px);
      width: 28px;
      height: 3px;
      background: $light-font;
    }
    
    .line:not(:last-of-type) {
      margin-bottom: 4px;
    }
  }
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0 10vw;
  transform: translate3d(-20px, 5px, 0);

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 12px;
    font-weight: 600;
    color: $light-font;
    transform: translate3d(0, -4px, 0);
    pointer-events: none;
  }

  svg {
    pointer-events: none;
  }
}

.background {
  fill: none;
}

a.router-link-active {
  .background {
    fill: $primary-blue;
  }
}
</style>
