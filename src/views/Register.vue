<template>
  <main>
    <!-- <div
      class="background"
      :style="{ backgroundImage: `url(${require('@/assets/backgrounds/home-background.svg')})` }" /> -->

    <img src="@/assets/logo/name-blue.svg" alt="" class="logo">

    <section id="home" class="content page padding bottom">
      <div class="buttons">
        <router-link
          :to="{ name: 'sign-in' }"
          tag="button"
          
          class="primary">
          Sign In
        </router-link>

        <router-link
          :to="{ name: 'sign-up' }"
          tag="button"
          class="secondary">
          Sign Up
        </router-link>
      </div>

      <p>by signing up on Salmo, you agree to our Terms & Conditions and Privacy Policies.</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>

// .background {
//   width: 100%;
//   height: calc(100vh - 120px);
//   margin-top: 120px;
//   position: absolute;
//   opacity: 0.2;
//   background-position: right top;
//   z-index: 0;
// }

.logo {
  position: absolute;
  top: 30vh;
  left: calc(50vw - 122.5px);
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

@media screen and (min-width: 700px) {
  .logo {
    top: 35vh;
  }

  .buttons {
    button {
      &:last-of-type {
        margin: 8px 0 12vh 0;
      }
    }
  }
}
</style>
