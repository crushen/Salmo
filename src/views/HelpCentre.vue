<template>
  <section id="help-centre">
    <div class="content">
      <h1>Confused?<br> Need more info?</h1>
    </div>

    <section class="questions content">
      <div 
        v-for="(question, index) in questions"
        :key="index"
        class="container"
        :class="{'selected': index === selected, 'disabled': index !== selected && selected !== null}">
        <div class="button">
          <button @click="toggleSelected(index, $event)">
            <img v-if="selected !== index" :src="arrow" class="icon">
            <img v-if="selected === index" :src="cross" class="icon cross">
          </button>
        </div>
        
        <div class="text">
          <h3>{{ question.title }}</h3>
          <p v-if="selected === index">{{ question.text }}</p>
        </div>
      </div>
    </section>

    <section class="section-margin content">
      <h2>All you need to know about...</h2>

      <div class="buttons">
        <router-link
        class="button"
          v-for="page in helpPages"
          :key="page.title"
          :to="{ name: 'help-centre-page', params: { page: page.slug } }">
          <div>
            <h3>{{ page.title }}</h3>
            <!-- <img :src="page.icon" class="icon"> -->
          </div>
        </router-link>
      </div>
    </section>

    <section class="bottom">
      <div class="content">
        <h2>Need to talk to us?</h2>

        <div class="contact-buttons">
          <button class="secondary">Call Us</button>
          <button class="secondary">Email Us</button>
        </div>

        <div class="disclaimer">
          <p class="title">Disclaimer</p>
          <p>We are a team of enthusiastic individuals with the aim of conveying exsisting visa information in a more digestable format. Please do not get in touch for legal advice as we are not qualified to give this at the moment.</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-down-solid.svg';
import cross from '@/assets/icons/white/times-solid.svg';

export default {
  data() {
    return {
      arrow,
      cross,
      selected: null,
      questions: [
        {
          title: 'Do I need to submit documents to use Salmo?',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "How much can I trust Salmo's information?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "What if my application gets rejected?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "If necessary, can I contact a human for help?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "Why should I use Salmo?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        }
      ],
      helpPages: [
        {
          title: 'Biometric Residence Permit',
          slug: 'biometric-residence-permit'
        },
        {
          title: 'Applying with Dependants',
          slug: 'applying-with-dependants'
        },
        {
          title: 'Switch VS Extend',
          slug: 'switch-vs-extend'
        },
        {
          title: 'Indefinite Leave to Remain',
          slug: 'indefinite-leave-to-remain'
        }
      ]
    }
  },
  methods: {
    toggleSelected(index, event) {
      if(event.target.tagName === 'IMG') {
        if(event.target.classList.contains('cross')) {
          this.selected = null;
        } else {
          this.selected = index;
        }
      } else if(event.target.tagName === 'BUTTON') {
        if(event.target.firstElementChild.classList.contains('cross')) {
          this.selected = null;
        } else {
          this.selected = index;
        } 
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#help-centre {
  padding: $spacing*10 0 0;
}

.questions {
  margin-top: $spacing*8;
}

.container {
  margin-top: $spacing*5;
  padding: $spacing;
  border-radius: 4px;
  position: relative;

  .button {
    position: absolute;
    top: 0;
    right: 0;
  }

  button {
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    img {
      width: 24px;
      margin-top: 4px;

      &.cross {
        width: 20px;
      }
    }
  }

  &.selected {
    background: $primary-yellow;

    button {
      box-shadow: none;
    }
  }

  &.disabled {
    color: $light-grey;
    pointer-events: none;

    button {
      background: $light-grey;
    }
  }

  .text {
    h3 {
      width: 80%; 
    }

    p {
      margin-top: $spacing*2;
    }
  }
}

.buttons {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: $spacing*4 auto auto;

  .button {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: $spacing;
    padding: $spacing;
    border-radius: $border-radius;
    background: $dark-font;
    color: $light-font;
    box-shadow: $shadow;

    h3 {
      text-align: center;
      font-size: 16px;
    }

    // .icon {
    //   width: 16px;
    // }
  }
}

.bottom {
  background: $background;
  margin-top: $spacing*8;
  padding: $spacing*8 0 $spacing*10 0;

  .contact-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: $spacing*4;

    button {
      min-width: 45%;
    }
  }

  .disclaimer {
    background: $light-grey;
    padding: 10px $spacing;
    border-radius: 4px;
    margin-top: $spacing*6;

    .title {
      font-weight: 600;
      margin-bottom: $spacing*2;
    }
  }
}
</style>
