<template>
  <section id="delete-account" class="content">
    <h1>We're sorry to see you go!</h1>

    <div class="placeholder-img"></div>

    <form @submit.prevent="submitFeedback">
      <p>Before you go, please let us know why you're leaving us today:</p>

      <div class="check-boxes">
        <div class="check">
          <pretty-check 
            class="p-smooth p-default p-round" 
            color="primary-o">
          </pretty-check>
          <p>Features are not useful.</p>
        </div>

        <div class="check">
          <pretty-check 
            class="p-smooth p-default p-round" 
            color="primary-o">
          </pretty-check>
          <p>Too many notifications.</p>
        </div>

        <div class="check">
          <pretty-check 
            class="p-smooth p-default p-round" 
            color="primary-o">
          </pretty-check>
          <p>Not personally relevant to me anymore.</p>
        </div>

        <div class="check">
          <pretty-check 
            class="p-smooth p-default p-round" 
            color="primary-o">
          </pretty-check>
          <p><label for="other">Other (please specify below).</label></p>
        </div>

        <textarea id="other" class="form"></textarea>
      </div>

      <div class="submit">
        <input type="submit" value="Submit Feedback" class="secondary">
      </div>
    </form>

    <div class="skip">
      <button class="tertiary"> 
        <p>Skip</p>
        <span>&#8227;</span>
      </button>
    </div>
  </section>
</template>

<script>
import prettyCheck from 'pretty-checkbox-vue/check';

export default {
  components: {
    prettyCheck
  },
  methods: {
    submitFeedback() {
      console.log('submit');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#delete-account {
  padding: $spacing*10 0 $spacing*12 0;
}

h1 {
  text-align: center;
  width: 80%;
  margin: auto;
}

.placeholder-img {
  width: 150px;
  height: 150px;
  background: $light-grey;
  border-radius: 100px;
  margin: $spacing*6 auto 0 auto;
}

form {
  margin-top: $spacing*6;

  .check-boxes {
    margin-top: $spacing*6;
  }

  .check {
    margin-top: $spacing*4;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  label {
    font-weight: 300;
    color: $dark-font;
  }

  textarea {
    margin-top: $spacing*4;
  }

  .submit {
    text-align: center;
    margin-top: $spacing*6;
  }
}

.skip {
  display: flex;
  justify-content: flex-end;
  margin-top: $spacing*6;

  .tertiary {
    padding: 0;
    text-decoration: none;
    display: flex;
    align-items: center;

    span {
      font-size: 45px;
      line-height: 0;
      padding: 0 0 4px 6px;
    }
  }
}
</style>
