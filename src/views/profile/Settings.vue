<template>
  <section id="settings" class="content">
    <!-- <h1>Settings</h1>

    <div class="wrapper">
      <section class="notifications section">
        <h3>Notifications</h3>

        <div class="switches">
          <div class="switch">
            <pretty-check class="p-switch p-fill"></pretty-check>
            <p>Notify you about important dates by email.</p>
          </div>

          <div class="switch">
            <pretty-check class="p-switch p-fill"></pretty-check>
            <p>Notify you about important dates by email.</p>
          </div>
    
          <div class="switch">
            <pretty-check class="p-switch p-fill"></pretty-check>
            <p>Notify you about important dates by email.</p>
          </div>
        </div>
      </section>

      <section class="privacy section">
        <h3>Privacy</h3>

        <div class="switches">
          <div class="switch">
            <pretty-check class="p-switch p-fill"></pretty-check>
            <p>Notify you about important dates by email.</p>
          </div>

          <div class="switch">
            <pretty-check class="p-switch p-fill"></pretty-check>
            <p>Notify you about important dates by email.</p>
          </div>
        </div>
      </section>

      <section class="delete section">
        <h3>Delete Account</h3>

        <p>If you're having issues with any aspect of our service, please do 
          <router-link
            :to="{ name: 'help-centre' }"
            tag="button"
            class="tertiary">
            get in touch 
          </router-link> 
        with us now and we will do our best to help!</p>
        <p class="warning">THIS ACTION IS IRREVERSIBLE</p>

        <div class="button">
          <router-link
            :to="{ name: 'delete-account' }"
            tag="button"
            class="tertiary">
            Delete Account 
          </router-link> 
        </div>
      </section>
    </div> -->
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#settings {
  padding: $spacing*12 0;
}

.section {
  margin-top: $spacing*5;
}

.switches {
  display: flex;
  flex-direction: column;
  padding: 0 $spacing;
}

.switch {
  margin-top: $spacing*3;
  display: flex;
  align-items: center;
  font-size: 20px;

  p {
    margin-left: $spacing*2;
  }
}

.delete {
  h3 {
    margin-bottom: $spacing*3;
  }

  .warning {
    background: $light-grey;
    padding: $spacing;
    text-align: center;
    margin: $spacing*4 0 $spacing*6 0;
  }

  .button {
    text-align: center;

    button {
      color: $primary-pink;
      font-size: 18px;
      font-weight: 700;
    }
  }
}

// Tablet
@media screen and (min-width: 600px) {
  #settings {
    padding: $spacing*15 0;
  }

  .section {
    margin-top: $spacing*8;
  }

  .switch {
    margin-top: $spacing*5;

    p {
      margin-left: $spacing*3;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .wrapper {
    max-width: 700px;
    margin: auto;
  }
}
</style>
