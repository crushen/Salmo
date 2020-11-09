<template>
  <div>
    <header>
      <img src="@/assets/backgrounds/home-background-2.svg" alt="" class="background">

      <div class="logo">
        <img src="@/assets/logo/name.svg" alt="" class="text">
        <img src="@/assets/logo/colour.svg" alt="" class="img">
      </div>
    </header>

    <main>
      <section class="button-center">
        <router-link :to="{ name: 'register' }" tag="button" class="primary">
          Sign Up
        </router-link>
      </section>

      <section class="content margin-l top">
        <h1>Making your visa process an easier journey.</h1>

        <div class="inner">
          <p class=" margin-m top">Whether you have a plan or not, we are here to help you in every step of the way.</p>

          <p class="margin-s top">Research, organisation, preparation. You name it. Just Salmo it.</p>
        </div>
      </section>

      <section class="margin-l top">
        <div class="tools-card">
          <p>Your personal assistance for the next visa.</p>

          <img src="@/assets/illustrations/home/card-1.svg" alt="" class="img">
        </div>

        <div class="tools-card">
          <p>A tailored quiz to fit your past, present and future.</p>

          <img src="@/assets/illustrations/home/card-2.svg" alt="" class="img">
        </div>

        <div class="tools-card blue">
          <p>Plus, the most complete & free visa guide. Ever.</p>

          <img src="@/assets/illustrations/home/card-3.svg" alt="" class="img">
        </div>

        <div class="tools-card yellow">
          <p>More hidden features for limited time, sign up to experience now!</p>
        </div>
      </section>

      <section class="button-center margin-m top">
        <router-link :to="{ name: 'register' }" tag="button" class="primary">
          Sign Up
        </router-link>
      </section>
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
// export default {
//   data() {
//     return {
//       loggedOut: false,
//       userDeleted: false,
//       innerWidth: null
//     }
//   },
//   computed: {
//     user() {
//       return this.$store.state.auth.user;
//     },
//     isAuthenticated() {
//       return this.$store.getters['auth/isAuthenticated'];
//     }
//   },
//   methods: {
//     changeBtnFocus(buttons, focus) {
//       buttons.forEach(btn => {
//         btn.setAttribute('tabindex', focus);
//       })
//     }
//   },
//   mounted() {
//     if(this.$store.state.auth.loggedOut) {
//       setTimeout(() => {
//         this.loggedOut = true;

//         const ariaBtns = document.querySelectorAll('.aria-btn');
//         this.changeBtnFocus(ariaBtns, '-1');
//       }, 500)
//     }

//     if(this.$store.state.auth.userDeleted) {
//       setTimeout(() => {
//         this.userDeleted = true;

//         const ariaBtns = document.querySelectorAll('.aria-btn');
//         this.changeBtnFocus(ariaBtns, '-1');
//       }, 500)
//     }

//     this.innerWidth = window.innerWidth;
//     window.addEventListener('resize', () => {
//       this.innerWidth = window.innerWidth;
//     })
//   }
// }
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

header {
  position: relative;
  height: 80vh;
}

p {
  font-weight: 500;
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

button {
  min-width: 140px;
}

.inner {
  width: 85%;
  margin: auto;
}

.tools-card {
  background: $pink;
  padding: 16px 26px;
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;

  &:not(:first-of-type) {
    margin: 1rem;
  }

  &.blue {
    background: $light-blue;
  }

  &.yellow {
    background: $yellow;
  }

  p {
    width: 40%;
    font-size: 16px;
    padding-bottom: 2rem;
  }

  .img {
    position: absolute;
    left: 2rem;
    bottom: 0;
  }

  &:nth-of-type(2) {
    .img {
      left: 6rem;
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

  a {
    color: white;
  }

  p {
    color: white;
    font-weight: 300;
  }
}
</style>
