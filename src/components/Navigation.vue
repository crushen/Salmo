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
              @click.native="open = false"
              :to="{ name: 'home' }" exact>
              <div class="icon"></div>
              Home
            </router-link>
            <template v-if="!isAuthenticated">
              <router-link 
                @click.native="open = false"
                :to="{ name: 'visa-info' }">
                <div class="icon"></div>
                Visas
              </router-link>
              <router-link 
                @click.native="open = false"
                :to="{ name: 'login' }">
                <div class="icon"></div>
                Login
              </router-link>
            </template>
            <template v-else>
              <router-link 
                @click.native="open = false"
                :to="{ name: 'visa-info' }">
                <div class="icon"></div>
                Visas
              </router-link>
              <router-link 
                @click.native="open = false"
                :to="{ name: 'profile', params: { username: user.profile.username } }">
                <div class="icon"></div>
                Profile
              </router-link>
            </template>
            <router-link 
              @click.native="open = false"
              :to="{ name: 'about' }">
              <div class="icon"></div>
              About
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
  background: $primary-blue;
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
  transform: translate3d(-20px, 15px, 0);

  a {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $light-grey;
  }

  .icon {
    width: $spacing*3;
    height: $spacing*3;
    background: $light-grey;
    border-radius: 100px;
  }

}

a.router-link-active { 
  color: $light-font;

  .icon {
    background: $light-font;
  }
}
</style>
