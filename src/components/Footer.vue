<template>
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
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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
</style>
