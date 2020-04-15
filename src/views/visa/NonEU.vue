<template>
  <section id="non-eu">
    <router-link :to="{ name: 'visa-info' }">
      <img :src="arrow" class="arrow">
    </router-link>

    <div class="content">
      <h1>What is your main reason to stay in the UK?</h1>
    </div>

    <section class="buttons">
      <router-link
      class="button"
        v-for="page in categories"
        :key="page.text"
        :to="{ name: 'non-eu-category', params: { category: page.text } }">
        <div>
          <img :src="page.icon" class="icon">
          <h3>{{ page.text }}</h3>
        </div>
      </router-link>
    </section>

    <section class="child-options">
      <div class="content">
        <p>All options above are for individuals aged 17+. Follow the link below to check out your options if you're younger than 17.</p>
        <button class="secondary">Child Visa Options</button>
      </div>
      <div class="placeholder-image"></div>
    </section>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import book from '@/assets/icons/white/book-solid.svg';
import briefcase from '@/assets/icons/white/briefcase-solid.svg';
import coins from '@/assets/icons/white/coins-solid.svg';
import heart from '@/assets/icons/white/heart-solid.svg';

export default {
  data() {
    return {
      visas: this.$store.state.visas.visaList,
      arrow,
      categories: [
        {
          icon: book,
          text: 'study'
        },
        {
          icon: briefcase,
          text: 'work'
        },
        {
          icon: coins,
          text: 'business'
        },
        {
          icon: heart,
          text: 'family'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#non-eu {
  padding: $spacing*10 0 0;
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
    text-transform: capitalize;
    box-shadow: $shadow;

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
  margin-top: $spacing*4;
  padding: $spacing*4 0 $bottom-padding 0;
  background: $background;
  position: relative;

  .content {
    display: flex;
    flex-direction: column;
  }
    
  button {
    width: 180px;
    margin: $spacing*4 0;
    align-self: center;
  }

  .placeholder-image {
    position: absolute;
    background: $light-grey;
    width: 60px;
    height: 75px;
    bottom: 3vw;
    left: calc(50vw - 30px);
  }
}
</style>
