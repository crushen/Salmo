<template>
  <section id="home">
    <!-- Logged out alert -->
    <transition name="alert" mode="out-in">
      <alert 
        v-if="loggedOut"
        alert="Logged Out"
        text="You’re now logged out. See you again soon!"
        @confirm="loggedOut = false, delete $store.state.auth.loggedOut" />
    </transition>
    <!-- Deleted account alert -->
    <transition name="alert" mode="out-in">
      <alert 
        v-if="userDeleted"
        alert="Account Deleted"
        text="Thanks for your time with Salmo, if you need us again, we’ll be here!"
        @confirm="userDeleted = false, delete $store.state.auth.userDeleted" />
    </transition>

    <header 
      v-if="innerWidth < 1100"
      :style="{ backgroundImage: `url(${background})` }">
      <div class="content">
        <img 
          src="@/assets/logo/outline.svg"
          alt="Salmo logo outline"
          class="logo-img">
        <div class="logo">
          <h1 class="logo-text">Salmo</h1>
        </div>
        <div class="sub-title">
          <h2 class="caption">A personalised visa experience</h2>
          <img src="@/assets/Home-underline.svg" alt="">
        </div>
        
      </div>
    </header>

    <header v-else>
      <img 
        src="@/assets/Home-desktop.png" alt=""
        class="desktop-header">

      <div class="desktop-logo">
        <img 
          src="@/assets/logo/outline.svg"
          alt="Salmo logo outline"
          class="outline">
        <div class="logo-text-container">
          <h1 class="logo-text">Salmo</h1>
          <h2>A personalised visa experience</h2>
        </div>

        <img src="@/assets/Home-underline.svg" alt="" class="line">
      </div>
    </header>

    <logged-in 
      v-if="isAuthenticated && user.emailVerified"
      :user="user"/>

    <logged-out 
      v-else
      :user="user" />
  </section>
</template>

<script>
import background from '@/assets/Home-vector.svg';
import loggedIn from '@/components/home/LoggedIn';
import loggedOut from '@/components/home/LoggedOut';
import alert from '@/components/Alert';

export default {
  components: {
    loggedIn,
    loggedOut,
    alert
  },
  data() {
    return {
      background,
      loggedOut: false,
      userDeleted: false,
      innerWidth: null
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
  mounted() {
    if(this.$store.state.auth.loggedOut) {
      setTimeout(() => {
        this.loggedOut = true;
      }, 500)
    }

    if(this.$store.state.auth.userDeleted) {
      setTimeout(() => {
        this.userDeleted = true;
      }, 500)
    }

    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

header {
  width: 100%;
  min-height: 430px;
  height: 120vw;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.logo {
  color: $light-font;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 55vw;

  h1 {
    font-size: 23vw;
    line-height: 0;
  }
}

.logo-img {
  width: 30vw;
  position: absolute;
  top: 8vw;
  right: 8vw;
}

h2 {
  color: $light-font;
  font-weight: 600;
  margin-top: $spacing*6;
}

.sub-title {
  img {
    width: 25vw;
    transform: translate3d(-13vw, -1.5vw, 0)
  }
}

// Tablet
@media screen and (min-width: 420px) {
  .logo {
    h1 {
      font-size: 90px;
      line-height: 0;
    }
  }

  .sub-title {
    img {
      width: 135px;
      transform: translate3d(-65px, -8px, 0)
    }
  }
}

@media screen and (min-width: 600px) {
  header {
    min-height: 500px;
    height: 500px;
    background-position: 0 80%;
  }

  .logo {
    padding-top: 150px;
  }

  .logo-img {
    display: none;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  header {
    min-height: 450px;
    height: 450px;
    background-position: 0 80%;
    text-align: left;
  }

  .desktop-header {
    position: absolute;
    top: 0;
    left: -10%;
    width: 90%;
    height: 900px;
    z-index: 0;
  }

  .desktop-logo {
    position: relative;
    z-index: 10;
    padding: 150px 0 0 230px;

    .logo-text-container {
      text-align: center;
      width: 300px;
    }

    .logo-text {
      color: $light-font;
      font-size: 90px;
      line-height: 0;
    }

    h2 {
      font-size: 18px;
    }

    .outline {
      position: absolute;
      width: 95px;
      top: 120px;
      margin-left: 310px;
    }

    .line {
      transform: translate(30px, -5px);
    }
  }
}
</style>
