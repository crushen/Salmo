<template>
  <div>
    <main id="help-centre" class="page padding top" :class="{'bottom': user}">
      <back-button
        @go-back="$router.push({ name: 'about' })"
        text="About" />

      <div class="content">
        <h1>Help Centre</h1>
        <h2 class="margin-s top">You can find all the information here to answer your questions!</h2>
      </div>

      <transition-group name="slide" tag="div">
        <section class="questions content slide-item margin-l top" key="dynamic">
          <transition-group name="slide" tag="ul">
            <li 
              v-for="(question, index) in questions"
              :key="index"
              class="slide-item">
              <button
                @click="selected = selected === index ? null : index, setAria(index)"
                :id="`button-${index}`"
                aria-expanded="false"
                aria-controls="text"
                class="title">
                <h3>{{ question.title }}</h3>

                <img 
                  src="@/assets/icons/red/arrow-down.svg" 
                  alt=""
                  :class="selected === index ? 'active' : ''" 
                  class="icon">
              </button>

              <div 
                :class="selected === index ? 'active' : ''"
                id="text"
                class="text"
                role="region"
                :aria-labelledby="`button-${index}`">
                <p>{{ question.text }}</p>
              </div>
            </li>
          </transition-group>
        </section>

        <div class="slide-item" key="static">
          <section class="content buttons-content margin-l top">
            <h2 class="margin-m bottom">Want in-depth information? Check out the articles below!</h2>

            <FormulateInput
              v-model="search"
              type="search"
              name="sample"
              label="Search"
              placeholder="Try visa, dependants, country.." />

            <div v-if="!filteredPages.length" class="no-results">
              <p>No results found.</p>
            </div>

            <div class="buttons">
              <router-link
                class="button"
                v-for="page in filteredPages"
                :key="page.title"
                :to="{ name: 'help-centre-page', params: { slug: page.slug } }"
                tag="button"
                :style="{ 
                  backgroundImage: getBackground(page.background),
                  backgroundSize: getSize(page.background) 
                }">
                {{ page.title }}
              </router-link>
            </div>

            <div v-if="!search" class="see-more">
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

          <section class="content margin-l top">
            <disclaimer />
          </section>
        </div>
      </transition-group>
    </main>

    <app-footer v-if="!user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import disclaimer from '@/components/cards/Disclaimer'
import backButton from '@/components/BackButton'
import appFooter from '@/components/Footer'

import wave from '@/assets/patterns/wave-2.svg'
import line from '@/assets/patterns/line.svg'
import dashed from '@/assets/patterns/dashed-line.svg'
import confetti from '@/assets/patterns/confetti.svg'

export default {
  components: { disclaimer, backButton, appFooter },
  data() {
    return {
      selected: null,
      questions: [
        {
          title: 'Do I need to submit documents to use Salmo?',
          text: 'Not at all! In fact Salmo is an information only web app (for now!). We don’t accept any applications so please do not send us any of your documents.',
        },
        {
          title: "How much can I trust Salmo's information?",
          text: 'You certainly shouldn’t automatically trust everything you read online, so we’re glad you’re checking your sources! For Salmo we have curated all of our information directly from the same legal documents that are used to process your application. This has then been cross check by an OISC regulated lawyer, to ensure clarity and accurate information. We also check over our information regularly to ensure nothing is out of date.'
        },
        {
          title: "What if my application gets rejected?",
          text: 'Oh no! We’re sorry to hear this. We understand how hard it is to apply for visas. Be sure to look after your mental health in these stressful times, and check out our article on rejected applications for more detailed advice.'
        },
        {
          title: "If necessary, can I contact a human for help?",
          text: 'Human contact is always a great thing! Sadly we can’t offer this quite yet, it is in our grand plan though!'
        },
        {
          title: "Why should I use Salmo?",
          text: 'Great question. Salmo is made by immigrants, for immigrants with user-led design and a friendly feel. We think it’s great for anyone who is tired of trawling through GOV.UK and is looking for a more informative alternative. But don’t just take our word for it, go over to our visa section now and take a look.'
        }
      ],
      search: null,
      showMore: false,
      wave,
      line,
      dashed,
      confetti
    }
  },
  computed: {
    ...mapState('helpCentre', ['buttons']),
    user() {
      return this.$store.state.auth.user
    },
    filteredPages() {
      let pages = this.buttons
      let filtered = []

      if(pages) {
        if(this.search) {
          // Check to see if page title has been searched
          pages.forEach(page => {
            if(page.title.toLowerCase().includes(this.search.toLowerCase())) {
              // Only add to filtered array if page hasn't already been pushed
              if(!filtered.includes(page)) {
                filtered.push(page)
              }
            }
            
            // Check to see if any of the tags have been searched
            page.tags.forEach(tag => {
              if(tag.toLowerCase().includes(this.search.toLowerCase())) {
                // Only add to filtered array if page hasn't already been pushed
                if(!filtered.includes(page)) {
                  filtered.push(page)
                }
              }
            })
          })

          return filtered
        } else {
          if(!this.showMore) {
            return pages.slice(0, 8)
          } else {
            return pages
          }
        }
      }

      return pages
    }
  },
  methods: {
    toggleSelected(index, event) {
      if(event.target.tagName === 'IMG') {
        if(event.target.classList.contains('cross')) {
          this.selected = null
        } else {
          this.selected = index
        }
      } else if(event.target.tagName === 'BUTTON') {
        if(event.target.firstElementChild.classList.contains('cross')) {
          this.selected = null
        } else {
          this.selected = index
        } 
      }
    },
    getBackground(bg) {
      switch(bg) {
        case 'dashed':
          return `url(${this.dashed})`
        case 'confetti':
          return `url(${this.confetti})`
        case 'wave':
          return `url(${this.wave})`
       default:
          return `url(${this.line})`
      }
    },
    getSize(bg) {
      switch(bg) {
        case 'dashed':
          return '180px'
        case 'wave':
          return '240px'
        case 'line': 
          return '140px;'
       default:
          return 'auto'
      }
    },
    setAria(index) {
      const button = document.querySelector(`#button-${index}`)

      this.selected === index ? button.setAttribute('aria-expanded', 'true') : button.setAttribute('aria-expanded', 'false') 
    }
  },
  created() {
    this.$store.dispatch('helpCentre/getButtons')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

* {
  overflow: visible;
}

h3 {
  font-weight: 500;
}

.questions {
  ul {
    list-style: none;
    width: 85%;
    margin: 2em auto 0 auto;

    li {
      position: relative;

      &:not(:first-of-type) {
        margin-top: 2em;
      }
    }
  }
  
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    box-shadow: none;
    padding: 0;
    text-align: left;
  }

  .icon {
    width: 28px;
    transition: 0.4s;
    margin-left: 1em;

    &.active {
      transform: rotate(-180deg);
    }
  }

  .text {
    position: absolute;
    transform: translateY(-10px);
    opacity: 0;
    transition: 0.4s;
    margin-top: 1em;

    &.active {
      position: relative;
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.no-results {
  margin-top: 2em;
}

.buttons-content {
  .see-more {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: $spacing*4;
  }
}

.buttons {
  width: 100%;
	display: flex;
	flex-wrap: wrap;
  justify-content: center;

  .button {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5em;
    padding: 0.5em;
    border-radius: $radius;
    background: $blue;
    color: $light-font;
    box-shadow: $shadow;
    background-position: center;
    transition: 0.3s;

    h3 {
      text-align: center;
      font-size: 16px;
    }

    &:hover {
      background-color: lighten($color: $primary-blue, $amount: 5%);
    }
  }
}

// Slide transition group
.slide-item {
  transition: 0.4s;
}

.slide-leave-active {
  position: absolute;
}

.buttons-enter,
.buttons-leave-to {
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

// @media screen and (min-width: 600px) {

//   .questions {
//     margin-top: $spacing*10;
//   }

//   .buttons-content {
//     width: 90%;
//     max-width: 600px;
//   }

//   .buttons {
//     max-width: none;
//   }

//   .section-margin {
//     margin-top: $spacing*10;
//   }

//   .bottom {


//     .disclaimer {
//       padding: $spacing*2;
//     }
//   }
// }

// @media screen and (min-width: 1100px) {
//   .break {
//     display: none;
//   }

//   .questions {
//     max-width: 600px;
//     margin: $spacing*15 auto 0 auto;
//   }

//   .section-margin {
//     margin-top: $spacing*15;
//   }

//   .bottom {


//     .content {
//       max-width: 600px;
//     }

//     .contact-buttons {
//       margin-top: $spacing*6;
//     }

//     .disclaimer {
//       margin-top: $spacing*8;
//       p {
//         &:last-of-type {
//           margin-top: $spacing*4;
//         }
//       }
//     }
//   }

//   .terms-buttons {
//     flex-direction: row;
//     margin-top: $spacing*6;
//     justify-content: center;

//     button:last-of-type {
//       margin: 0 0 0 $spacing*4;
//     }
//   }
// }
</style>
