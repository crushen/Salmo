<template>
  <div>
    <transition name="dialog" mode="out-in">
      <logged-out-alert v-if="showLoggedOutAlert" />
    </transition>

    <transition name="dialog" mode="out-in">
      <deleted-account v-if="showDeleteAlert" />
    </transition>

    <header>
      <!-- <img src="@/assets/backgrounds/home-background-2.svg" alt="" class="background"> -->

      <div class="logo">
        <img src="@/assets/logo/name.svg" alt="" class="text">
        <img src="@/assets/logo/colour.svg" alt="" class="img">
      </div>
    </header>

    <main>
      <section class="button-center">
        <router-link :to="{ name: 'sign-up' }" tag="button" class="primary">
          Sign Up
        </router-link>

        <router-link :to="{ name: 'sign-in' }" tag="button" class="secondary margin-s top">
          Sign In
        </router-link>
      </section>

      <patreon-message v-if="loggedOut" />

      <div v-else>
        <section class="content margin-l top">
          <h1>Making your visa process an easier journey.</h1>

          <div class="inner">
            <p class=" margin-m top">Whether you have a plan or not, we are here to help you in every step of the way.</p>

            <p class="margin-s top">Research, organisation, preparation. You name it. Just Salmo it.</p>
          </div>
        </section>

        <section class="margin-l top">
          <div class="tools-card">
            <div class="flex">
              <p>Your personal assistance for the next visa.</p>

              <img src="@/assets/mock-ups/iphone-visa-planner.svg" alt="" class="phone">

              <img src="@/assets/illustrations/home/card-1.svg" alt="" class="img">
            </div>
          </div>

          <div class="tools-card">
            <div class="flex">
              <p>A tailored quiz to fit your past, present and future.</p>

              <img src="@/assets/mock-ups/iphone-visa-quiz.svg" alt="" class="phone">

              <img src="@/assets/illustrations/home/card-2.svg" alt="" class="img">
            </div>
          </div>

          <div class="tools-card blue">
            <div class="flex">
              <p>Plus, the most complete & free visa guide. Ever.</p>

              <img src="@/assets/mock-ups/iphone-visa-info.svg" alt="" class="phone">

              <img src="@/assets/illustrations/home/card-3.svg" alt="" class="img">
            </div>
          </div>

          <div class="tools-card yellow">
            <div class="flex">
              <p>More hidden features for limited time, sign up to experience now!</p>

              <img src="@/assets/mock-ups/iphone-ilr-tracker.svg" alt="" class="phone">
            </div>
          </div>
        </section>

        <section class="button-center margin-m top">
          <router-link :to="{ name: 'sign-up' }" tag="button" class="primary">
            Sign Up
          </router-link>
        </section>
      </div>
    </main>

    <footer class="margin-l top">
      <div class="content">
        <img src="@/assets/logo/colour.svg" alt="" class="img">
        
        <ul>
          <li>
            <router-link :to="{ name: 'home' }">
              Home
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'about' }">
              About
            </router-link>
          </li>

          <li class="margin-s top">
            <router-link :to="{ name: 'terms' }">
              Terms and Conditions
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'privacy' }">
              Privacy Policy
            </router-link>
          </li>
        </ul>

        <p class="margin-s top">© 2020 Salmo Visa Limited. All Rights Reserved.</p>

        <p>Salmo Visa Limited is a company registered in England and Wales (No. 12482305).</p>
      </div>
    </footer>
  </div>
</template>

<script>
import patreonMessage from '@/components/PatreonMessage'
import loggedOutAlert from '@/components/alerts/LoggedOut'
import deletedAccount from '@/components/alerts/DeletedAccount'

export default {
  components: { patreonMessage, loggedOutAlert, deletedAccount },
  data() {
    return {
      loggedOut: false,
      showLoggedOutAlert: false,
      showDeleteAlert: false,
      userDeleted: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  mounted() {
    if(this.$store.state.auth.loggedOut) {
      setTimeout(() => {
        this.loggedOut = true
        this.showLoggedOutAlert = true
      }, 500)

      setTimeout(() => this.showLoggedOutAlert = false, 3000)
    }

    if(this.$store.state.auth.userDeleted) {
      setTimeout(() => {
        this.userDeleted = true
        this.showDeleteAlert = true
      }, 500)

      setTimeout(() => this.showDeleteAlert = false, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

header {
  position: relative;
  height: 80vh;
}

p {
  font-weight: 500;
  font-size: 16px;
}

.background {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
}

.logo {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 150px;

  .img {
    width: 60px;
  }
}

.button-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  min-width: 140px;
}

.inner {
  width: 85%;
  margin: auto;
}

.tools-card {
  background: #FBF0EF;
  padding: 16px 26px 0 26px;
  height: 310px;
  margin: auto;

  .flex {
    width: 100%;
    height: 100%;
    max-width: 350px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  &:not(:first-of-type) {
    margin: 1rem auto;
  }

  &.blue {
    background: #E9F2F5;
  }

  &.yellow {
    background: #FFF8EA;
  }

  p {
    width: 40%;
    font-size: 16px;
    padding-bottom: 2rem;
  }

  .img {
    position: absolute;
    bottom: 0;
  }

  &:nth-of-type(1),
  &:nth-of-type(4) {
    .img {
      left: 0;
    }
  }

  &:nth-of-type(2),
  &:nth-of-type(3) {
    .flex {
      flex-direction: row-reverse;
    }
    
    .img {
      right: 0;
    }
  }
}

footer {
  background: $blue;
  padding: 60px 0 80px 0;
  position: relative;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
  }

  a,
  p {
    font-size: 14px;
    color: white;
    font-weight: 300;
  }
}

@media screen and (min-width: 700px) {
  p {
    font-size: 20px;
  }

  .tools-card {
    height: 340px;

    &:not(:first-of-type) {
      margin: 2rem auto;
    }

    .flex {
      overflow: visible;
    }

    p {
      width: 56%;
    }

    .phone {
      width: 40%;
    }

    &:nth-of-type(1) {
      .img {
        width: 100px;
        left: -60px;
      }
    }

    &:nth-of-type(2) {
      .img {
        width: 80px;
        right: -40px;
      }
    }
    
    &:nth-of-type(3) {
      .img {
        width: 120px;
        right: 0;
      }
    }
  }
}
</style>
