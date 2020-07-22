<template>
  <section id="help-centre">
    <div class="content">
      <h1>Confused?<br class="break"> Need more info?</h1>
    </div>

    <transition-group name="slide" tag="div">
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
        <section class="content buttons-content section-margin">
          <h2>Need more in-depth information? Check out our help centre articles!</h2>

          <div class="field">
            <label for="search" class="form-label">Search</label>
            <input
              v-model="search"
              type="search"
              placeholder="Try visa, dependants, country.."
              id="search"
              class="form"
              autocomplete="off">
          </div>

          <div v-if="!filteredPages.length" class="no-results">
            <p>No results found.</p>
          </div>

          <transition-group class="projects buttons" name="buttons">
            <router-link
              class="button buttons-item"
              v-for="page in filteredPages"
              :key="page.title"
              :to="{ name: 'help-centre-page', params: { slug: page.slug } }"
              :style="{ 
                backgroundImage: getBackground(page.background),
                backgroundSize: getSize(page.background) 
              }">
              <div>
                <h3>{{ page.title }}</h3>
              </div>
            </router-link>
          </transition-group>

          <div 
            v-if="!search"
            class="see-more">
            <button 
              v-if="!showMore"
              @click="showMore = true"
              class="tertiary">
              Show More
            </button>

            <button 
              v-else
              @click="showMore = false"
              class="tertiary">
              Show Less
            </button>
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

import { mapState } from 'vuex';

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
      search: null,
      showMore: false,
      wave,
      line,
      dashed,
      confetti,
      helpCentreArticles: []
    }
  },
  computed: {
    //...mapState('helpCentre', ['helpPages']),
    filteredPages() {
      let pages = this.helpCentreArticles;

      if(this.search) {
        return pages.filter(page => page.title.toLowerCase().includes(this.search.toLowerCase()));
      } else {
        if(!this.showMore) {
          return pages.slice(0, 4);
        } else {
          return pages;
        }
      }
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
    },
    getBackground(bg) {
      switch(bg) {
        case 'dashed':
          return `url(${this.dashed})`;
        case 'confetti':
          return `url(${this.confetti})`;
        case 'wave':
          return `url(${this.wave})`;
       default:
          return `url(${this.line})`;
      }
    },
    getSize(bg) {
      switch(bg) {
        case 'dashed':
          return '180px';
        case 'wave':
          return '240px';
        case 'line': 
          return '140px;';
       default:
          return 'auto';
      }
    }
  },
  async created() {
    const response = await fetch(
      'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
      {
        method: 'POST',
        body: JSON.stringify({
          query: `{ helpCentreArticles { title slug background tags } }`,
        }),
      }
    );
    const { data } = await response.json();
    // this.errors = data.errors;
    // this.loading = false;
    this.helpCentreArticles = data.helpCentreArticles;
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

.buttons-enter, .buttons-leave-to {
	transform: scale(0.5) translateY(-80px);
	opacity: 0;
}

.buttons-leave-to {
	transform: translateY(30px);
	opacity: 0;
}

.buttons-leave-active {
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
    cursor: pointer;
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
    transform: translateY(-10px);
    opacity: 0;
    transition: 0.4s;

    &.active {
      position: relative;
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.no-results {
  margin-top: $spacing*4;
}

.buttons-content {
  h2 {
    margin-bottom: $spacing*4;
  }

  .see-more {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: $spacing*4;
  }
}

.buttons {
  width: 100%;
  max-width: 300px;
  //min-height: 136px;
  margin: $spacing*4 auto auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

  &.search {
    justify-content: flex-start;
  }

  .button {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    padding: $spacing;
    border-radius: $border-radius;
    background: $primary-blue;
    color: $light-font;
    box-shadow: $shadow;
    background-position: center;
    transition: transform 0.4s, opacity 0.2s;

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

  .buttons-content {
    width: 90%;
    max-width: 600px;
  }

  .buttons {
    max-width: none;
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
