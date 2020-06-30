<template>
  <section id="help-centre">
    <div class="content">
      <h1>Confused?<br class="break"> Need more info?</h1>
    </div>

    <transition-group name="slide" tag="ul">
      <section class="questions content slide-item" key="dynamic">
        <transition-group name="slide" tag="ul">
          <li 
            v-for="(question, index) in questions"
            :key="index"
            @click="selected = selected === index ? null : index"
            class="slide-item">
            <div class="title">
              <img 
                src="@/assets/icons/pink/down.svg" 
                alt=""
                :class="selected === index ? 'active' : ''" 
                class="icon">
              <h3>{{ question.title }}</h3>
            </div>

            <div 
              :class="selected === index ? 'active' : ''"
              class="text">
              <p>{{ question.text }}</p>
            </div>
          </li>
        </transition-group>
      </section>

      <div class="slide-item" key="static">
        <section class="content section-margin">
          <h2>All you need to know about...</h2>

          <div class="buttons">
            <router-link
            class="button"
              v-for="page in helpPages"
              :key="page.title"
              :to="{ name: 'help-centre-page', params: { slug: page.slug } }"
              :style="{ backgroundImage: `url(${page.bg})` }">
              <div>
                <h3>{{ page.title }}</h3>
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
              <p>For a full list of our T&C's or Privacy Policy, please see below.</p>
            </div>

            <div class="terms-buttons">
              <router-link 
                :to="{ name: 'terms' }"
                tag="button"
                class="tertiary">
                Terms & Conditions
              </router-link>

              <router-link 
                :to="{ name: 'privacy' }"
                tag="button"
                class="tertiary">
                Privacy Policy
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </transition-group>
  </section>
</template>

<script>
import arrow from '@/assets/icons/white/down-arrow.svg';
import cross from '@/assets/icons/white/times-solid.svg';

import wave from '@/assets/patterns/wave-2.svg';
import line from '@/assets/patterns/line.svg';
import dashed from '@/assets/patterns/dashed-line.svg';
import confetti from '@/assets/patterns/confetti.svg';

export default {
  data() {
    return {
      arrow,
      cross,
      selected: null,
      questions: [
        {
          title: 'Do I need to submit documents to use Salmo?',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.',
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
          slug: 'biometric-residence-permit',
          bg: dashed
        },
        {
          title: 'Applying with Dependants',
          slug: 'applying-with-dependants',
          bg: confetti
        },
        {
          title: 'Switch VS Extend',
          slug: 'switch-vs-extend',
          bg: wave
        },
        {
          title: 'Indefinite Leave to Remain',
          slug: 'indefinite-leave-to-remain',
          bg: line
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

// Slide transition group
.slide-item {
  transition: 0.4s;
}

.slide-leave-active {
  position: absolute;
}

// Mobile
#help-centre {
  padding: $spacing*12 0 0;
  position: relative;
}

.questions {
  margin-top: $spacing*8;

  ul {
    list-style: none;

    li {
      position: relative;

      &:not(:first-of-type) {
        margin-top: $spacing*5;
      }
    }
  }
  
  .title {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 28px;
    margin-right: $spacing*3;
    transition: 0.4s;

    &.active {
      transform: rotate(-180deg);
    }
  }

  .text {
    margin: $spacing*2 0 0 52px;
    position: absolute;
    transform: translateY(-20px);
    opacity: 0;
    transition: 0.4s;

    &.active {
      position: relative;
      transform: translateY(0);
      opacity: 1;
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
    background: $primary-blue;
    color: $light-font;
    box-shadow: $shadow;
    background-position: center;

    &:nth-of-type(1) {
      background-size: 180px;
    }

    &:nth-of-type(3) {
      background-size: 240px;
      
    }

    &:nth-of-type(4) {
      background-size: 140px;
    }

    h3 {
      text-align: center;
      font-size: 16px;
    }
  }
}

.bottom {
  background: $background;
  margin-top: $spacing*8;
  padding: $spacing*8 0 $spacing*12 0;

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
    padding: 10px;
    border-radius: 4px;
    margin-top: $spacing*6;

    .title {
      font-weight: 600;
      margin-bottom: $spacing*2;
    }

    p {
      &:last-of-type {
        margin-top: $spacing*2;
      }
    }
  }
}

.terms-buttons {
  display: flex;
  flex-direction: column;
  margin-top: $spacing*6;

  button:last-of-type {
    margin-top: $spacing*3;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  #help-centre {
    padding: $spacing*15 0 0;
  }

  .questions {
    margin-top: $spacing*10;
  }

  .buttons {
    max-width: none;
    justify-content: space-between;

    .button {
      width: 100px;
      height: 100px;
    }
  }

  .section-margin {
    margin-top: $spacing*10;
  }

  .bottom {
    margin-top: $spacing*10;
    padding: $spacing*10 0 $spacing*15 0;

    .disclaimer {
      padding: $spacing*2;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .break {
    display: none;
  }

  .questions {
    max-width: 600px;
    margin: $spacing*15 auto 0 auto;
  }

  .section-margin {
    margin-top: $spacing*15;
  }

  .buttons {
    .button {
      width: 140px;
      height: 140px;
    }
  }

  .bottom {
    margin-top: $spacing*15;
    padding: $spacing*15 0 $spacing*15 0;

    .content {
      max-width: 600px;
    }

    .contact-buttons {
      margin-top: $spacing*6;
    }

    .disclaimer {
      margin-top: $spacing*8;
      p {
        &:last-of-type {
          margin-top: $spacing*4;
        }
      }
    }
  }

  .terms-buttons {
    flex-direction: row;
    margin-top: $spacing*6;
    justify-content: center;

    button:last-of-type {
      margin: 0 0 0 $spacing*4;
    }
  }
}
</style>
