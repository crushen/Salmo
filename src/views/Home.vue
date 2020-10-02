<template>
  <section id="home" class="content">
    <router-link :to="{ name: 'sign-up' }" tag="button">
      Sign Up
    </router-link>

    <router-link :to="{ name: 'sign-in' }" tag="button">
      Sign In
    </router-link>

    <p>by signing up on Salmo, you agree to our Terms & Conditions and Privacy Policies.</p>
  </section>
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
