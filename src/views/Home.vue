<template>
  <main>
    <div
      class="background"
      :style="{ backgroundImage: `url(${require('@/assets/backgrounds/home-background.svg')})` }" />

    <section id="home" class="content padding bottom">
      <div class="buttons">
        <router-link
          :to="{ name: 'sign-up' }"
          tag="button"
          class="primary wave-background">
          Sign Up
        </router-link>
        <!-- :style="{ backgroundImage: `url(${require('@/assets/patterns/wave-horizontal.svg')})` }" -->

        <router-link
          :to="{ name: 'sign-in' }"
          tag="button"
          
          class="secondary wave-background">
          Sign In
        </router-link>
        <!-- :style="{ backgroundImage: `url(${require('@/assets/patterns/wave-verticle.svg')})` }" -->
      </div>

      <p>by signing up on Salmo, you agree to our Terms & Conditions and Privacy Policies.</p>
    </section>
  </main>
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

.background {
  width: 100%;
  height: calc(100vh - 120px);
  margin-top: 120px;
  position: absolute;
  opacity: 0.2;
  background-position: right top;
  z-index: 0;
}

#home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  z-index: 5;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 152px;

    &:last-of-type {
      margin: 8px 0 32px 0;
    }
  }
}

p {
  text-align: center;
}
</style>
