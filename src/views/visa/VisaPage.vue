<template>
  <div v-if="visa">
    <back-button
      @go-back="$router.push({ name: 'non-eu-category', params: { category: visa.category } })"
      text="Visas" />

    <section class="content" v-if="validVisa">
      <h1>{{ visa.name }}</h1>

      <div class="menu">
        <button
          @click="toggle"
          :class="menuOpen ? 'active' : ''">
          Jump To Section
          <img 
            src="@/assets/icons/red/arrow-down.svg"
            :class="menuOpen ? 'active' : ''"
            alt=""
            class="icon">
        </button>

        <transition-group name="slide">
          <div
            class="slide-item"
            :class="menuOpen ? 'active' : ''"
            key="outer">
            <transition-group
              name="slide-2" 
              tag="ul"
              class="top outer-list">
              <li
                v-for="(section, index) in visa.sections"
                :key="section.id"
                class="top">
                <p
                  @click="selectTab($event, index)"
                  class="section-title">
                  {{ section.title }}
                </p>
                <div class="tab" />

                <ul
                  :class="selectedTab === index ? 'active' : ''"
                  class="inner-list">
                  <li
                    v-for="subsection in section.subsections"
                    :key="subsection.id"
                    @click="close">
                    <router-link :to="{ name: 'visa-section', params: { section: subsection.slug } }">
                      {{ subsection.title }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </transition-group>
          </div>
        </transition-group>
      </div>

      <section class="visa-sections">
        <transition :name="animateOn" mode="out-in">
          <h2 :key="title">{{ title }}</h2>
        </transition>

        <transition :name="animateOn" mode="out-in">
          <router-view :key="key" />
        </transition>

        <div
          :class="$route.params.section === firstSection ? 'first-section' : ''"
          class="buttons">
          <button
            v-if="$route.params.section !== firstSection"
            @click="prevSection"
            class="tertiary">
            Previous
          </button>

          <button
            v-if="$route.params.section !== lastSection"
            @click="nextSection"
            class="tertiary">
            Next
          </button>
        </div>
      </section>  
    </section>

    <section v-else class="content">
      <p>{{ invalidVisa.name }}</p>

      <p>{{ invalidVisa.url }}</p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { visas } from '@/assets/js/invalidVisas'
import backButton from '@/components/BackButton'

export default {
  components: { backButton },
  data() {
    return {
      slug: this.$route.params.slug,
      menuOpen: false,
      selectedTab: null,
      key: 0,
      animateOn: 'none',
      invalidVisas: visas
    }
  },
  computed: {
    ...mapState('visas', ['visa']),
    validVisa() {
      switch(this.visa.name) {
        case 'Tier 1 : Global Talent':
          return true
        case 'Tier 1 : Innovator':
          return true
        case 'Tier 1 : Investor':
          return true
        case 'Tier 1 : Startup':
          return true
        case 'Tier 2 : General Work':
          return true
        case 'Tier 2 : Health and Care':
          return true
        case 'Tier 4 : Student':
          return true
        case 'Tier 5 : Youth Mobility':
          return true
        default:
          return false
      }
    },
    invalidVisa() {
      return this.invalidVisas.find(v => v.name === this.visa.name)
    },
    firstSection() {
      return this.visa.sections[0].subsections[0].slug
    },
    lastSection() {
      const lastSection = this.visa.sections[this.visa.sections.length - 1]
      const subsections = lastSection.subsections

      return subsections[subsections.length - 1].slug
    },
    title() {
      let title = ''

      this.visa.sections.forEach((section, index) => {
        section.subsections.forEach(subsection => {
          if(subsection.slug === this.$route.params.section) {
            title = this.visa.sections[index].title;
          }
        })
      })

      return title
    }
  },
  methods: {
    toggle() {
      this.menuOpen = !this.menuOpen
    },
    close() {
      this.menuOpen = false
      this.key++
    },
    selectTab(event, index) {
      if(event.target.classList.contains('section-title')) {
        this.selectedTab = this.selectedTab === index ? null : index
      }
    },
    nextSection() {
      let pushToSub = true

      this.visa.sections.forEach((section, index) => {
        if(this.title === section.title) {
          const currentSubsection = section.subsections.find(subsection => this.$route.params.section === subsection.slug),
                currentIndex = section.subsections.indexOf(currentSubsection);

          // If current subsection is last in subsection array
          // but section isn't last in section array - go to next section
          if(currentSubsection === section.subsections[section.subsections.length - 1]) {
            if(section !== this.visa.sections[this.visa.sections.length - 1]) {
              const nextSection = this.visa.sections[index + 1]

              this.key ++
              
              this.$router.push({
                name: 'visa-section',
                params: { section: nextSection.subsections[0].slug }
              })

              // Dont push to next subsection when going to next section
              pushToSub = false
            }
          } else {
            // If current subsection isn't last in array, go to next subsection
            if(pushToSub) {
              this.key ++

              this.$router.push({
                name: 'visa-section',
                params: { section: section.subsections[currentIndex + 1].slug }
              })
            }
          }
        }
      });
    },
    prevSection() {
      let pushToSub = true

      this.visa.sections.forEach((section, index) => {
        if(this.title === section.title) {
          const currentSubsection = section.subsections.find(subsection => this.$route.params.section === subsection.slug),
                currentIndex = section.subsections.indexOf(currentSubsection);

          // If current subsection is first in subsection array
          // but section isn't first in section array - go to next section
          if(currentSubsection === section.subsections[0]) {
            if(section !== this.visa.sections[0]) {
              const prevSection = this.visa.sections[index - 1]

              this.key ++
              
              this.$router.push({
                name: 'visa-section',
                params: { section: prevSection.subsections[prevSection.subsections.length - 1].slug }
              })

              // Dont push to prev subsection when going to prev section
              pushToSub = false
            }
          } else {
            // If current subsection isn't first in array, go to prev subsection
            if(pushToSub) {
              this.key ++

              this.$router.push({
                name: 'visa-section',
                params: { section: section.subsections[currentIndex - 1].slug }
              })
            }
          }
        }
      })
    },
    fetchVisa() {
      this.$store.dispatch('visas/getVisa', this.slug)
      .then(() => {
        // if no visa found, 404 page
        if(!this.visa) {
          this.$router.push({name: 'not-found'})
        } else {
          // if no section defined, go to first section... otherwise continue to defined section.
          if(!this.$route.params.section && this.validVisa) {
            this.$router.push({
              name: 'visa-section',
              params: { section: this.firstSection }
            })
          }
        }
      })
    }
  }, 
  created() {
    this.fetchVisa()
    
    setTimeout(() => {
      this.animateOn = 'section'
    }, 1500)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

// Transitions
.slide-item {
  transition: 0.4s;
}

.slide-leave-active {
  position: absolute;
}

.section-enter,
.section-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.section-enter-active,
.section-leave-active {
  transition: 0.7s;
  transition-timing-function: cubic-bezier(0,1.15,1,.99);
}

// Styles
.content {
  padding: $spacing*15 0 $spacing*12 0;
}

h1 {
  margin-bottom: $spacing*5;
}

.menu {
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 20;

  button {
    padding: 12px;
    border-radius: 0;
    background: white;
    border-bottom: 3px solid $primary-pink;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.4s;
    position: relative;
    z-index: 10;
    color: $dark-font;

    &.active {
      color: #b3b3b5;
    }

    .icon {
      width: 24px;
      transition: 0.4s;

      &.active {
        transform: rotate(-180deg);
      }
    }
  }

  .slide-item {
    width: 100%;
    position: absolute;
    transform: translateY(-20px);
    visibility: hidden;
    pointer-events: none;
    opacity: 0;

    &.active {
      position: relative;
      transform: translateY(0);
      visibility: visible;
      pointer-events: initial;
      opacity: 1;
    }

    ul {
      color: $light-font;
      padding: $spacing*2;
      list-style: none;
      
      &.top {
        width: 100%;
        margin: auto;
        background: $primary-pink;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        box-shadow: $shadow;
        transition: 0.4s;
      }

      &.inner-list {
        position: absolute;
        transform: translateY(-20px);
        opacity: 0;
        visibility: hidden;
        transition: 0s;
      }

      &.inner-list.active {
        position: relative;
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
        transition: 0.4s;
      }
    }

    li {
      overflow: hidden;
      margin-top: $spacing*2;
      position: relative;

      &.top {
        font-weight: 600;
      }

      &:first-of-type {
        margin-top: 0;
      }
    }

    .tab {
      width: 20px;
      height: 100%;
      background: $primary-pink;
      border-radius: $spacing;
      position: absolute;
      left: -24px;
      top: 0;
    }
  }

  p {
    font-weight: 600;

    &.section-title {
      color: $light-font;
    }
  }

  a {
    color: $light-font;
    font-weight: 300;

    &.router-link-active {
      text-decoration: underline;
    }
  }
}

.visa-sections {
  padding-top: $spacing*12;

  h2 {
    color: $primary-pink;
    margin-bottom: $spacing*3;
  }

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: $spacing*6;

    &.first-section {
      justify-content: flex-end;
    }
  }
}

a {
  text-decoration: none;
}

a.router-link-active {
  text-decoration: underline;
}

// Tablet
@media screen and (min-width: 600px) {
  h1 {
    margin-bottom: $spacing*8;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  h1 {
    margin-bottom: $spacing*10;
  }
  
  .card {
    width: 75%;
    margin: auto;
  }
}
</style>
