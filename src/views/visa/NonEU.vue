<template>
  <section class="content">
    <router-link :to="{ name: 'visa-info' }">
      <img :src="arrow" class="arrow">
    </router-link>
    <h1>What is your main reason to stay in the UK?</h1>

    <section class="buttons">
      <router-link
      class="button"
        v-for="button in buttons"
        :key="button.text"
        :to="button.link">
        <div>
          <img :src="button.icon" class="icon">
          <h3>{{ button.text }}</h3>
        </div>
      </router-link>
    </section>

    <section class="child-options">
      <p>All options above are for individuals aged 17+. Follow the link below to check out your options if you're younger than 17.</p>
      <button>Child Visa Options</button>
    </section>
  </section>
</template>

<script>
import arrow from '@/assets/chevron-left-solid.svg';
import book from '@/assets/book-solid.svg';
import briefcase from '@/assets/briefcase-solid.svg';
import coins from '@/assets/coins-solid.svg';
import heart from '@/assets/heart-solid.svg';

export default {
  data() {
    return {
      arrow,
      buttons: [
        {
          icon: book,
          text: 'Study',
          link: { name: 'non-eu-study' }
        },
        {
          icon: briefcase,
          text: 'Work',
          link: { name: 'non-eu-work' }
        },
        {
          icon: coins,
          text: 'Business',
          link: { name: 'non-eu-business' }
        },
        {
          icon: heart,
          text: 'Family',
          link: { name: 'non-eu-family' }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: 70px 0 $top-padding 0;
}

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: $spacing*4;

  .button {
    width: 110px;
    height: 110px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin: $spacing;
    padding: $spacing;
    border-radius: $border-radius;
    background: $dark-font;
    color: $light-font;

    div {
      display: flex;
      align-items: center;
    }

    .icon {
      width: 16px;
      margin-right: 4px;
    }
  }
}

.child-options {
  margin-top: $spacing*6;
  display: flex;
  flex-direction: column;

  button {
    width: 180px;
    margin-top: $spacing*4;
    align-self: center;
  }
}
</style>
