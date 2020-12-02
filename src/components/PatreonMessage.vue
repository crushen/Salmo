<template>
  <div>
    <section class="content margin-l top">
      <h1>A little support from you.</h1>

      <div class="inner">
        <p class=" margin-m top">Salmo is created out of savings, piggy banks and pure determination to help the others.</p>

        <p class="margin-s top">However, this method isn’t the most sustainable way. Sometimes it feels like we’re struggling in the water with a sprained angle, trying to catch some fresh air.</p>
      </div>
    </section>

    <section class="margin-l top">
      <div class="tools-card">
          <div class="imgs">
            <img src="@/assets/logo/patreon.svg" alt="" class="logo">

            <img src="@/assets/icons/grey/cross.svg" alt="">

            <img src="@/assets/logo/colour.svg" alt="" class="logo">
          </div>

          <p class="margin-m top">This is why we have created a Patreon platform! If you like our service and want to keep using it, you can share the love by sponsoring us as little as a cup of coffee or even a pint of beer.</p> 

          <p class="margin-s top">All you need to do is click below and become a Salmo Patron (it might involve rewards too)!</p>

          <div class="button-center">
            <a href="https://www.patreon.com/user?u=46124437" target="_blank">
              <button
                href="https://www.patreon.com/user?u=46124437"
                target="_blank"
                class="primary">
                Click Me
              </button>
            </a>
          </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

p {
  font-weight: 500;
  font-size: 16px;
}

a {
  text-decoration: none;
}

.inner {
  width: 85%;
  margin: auto;
}

.tools-card {
  background: #FBF0EF;
  padding: 26px;
  margin: auto;

  .imgs {
    width: 70%;
    max-width: 250px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .logo {
    width: 80px;
  }

  .button-center {
    margin-top: 2rem;
  }
}

@media screen and (min-width: 700px) {
  p {
    font-size: 20px;
  }
}
</style>
