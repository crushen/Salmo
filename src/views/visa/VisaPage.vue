<template>
  <div v-if="visa">
    <back-button
      @go-back="$router.push({ name: 'non-eu-category', params: { category: visa.category } })"
      text="Visas" />

    <section class="content page padding top bottom" v-if="validVisa">
      <h1 class="margin-s top">{{ visa.name }}</h1>

      <visa-menu
        :menuOpen="menuOpen"
        :visa="visa"
        :selectedTab="selectedTab"
        @toggle="toggle"
        @close="close"
        @select-tab="selectTab"
        class="margin-m top" />

      <section class="visa-sections">
        <transition :name="animateOn" mode="out-in">
          <h2 :key="title" class="title">{{ title }}</h2>
        </transition>

        <transition :name="animateOn" mode="out-in">
          <router-view :key="key" />
        </transition>

        <div
          :class="$route.params.section === firstSection ? 'first-section' : ''"
          class="buttons margin-m top">
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

    <section v-else class="content page padding top bottom">
      <p>{{ invalidVisa.name }}</p>

      <p>{{ invalidVisa.url }}</p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { visas } from '@/assets/js/invalidVisas'
import visaMenu from '@/components/visa/Menu'
import backButton from '@/components/BackButton'

export default {
  components: { visaMenu, backButton },
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
    selectTab({event, index}) {
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

.title {
  margin-bottom: 32px;
}

.visa-sections {
  padding-top: 100px;

  h2 {
    color: $red;
  }

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.first-section {
      justify-content: flex-end;
    }
  }
}

@media screen and (min-width: 700px) {
  .visa-sections {
    padding-top: 110px;
  }
}
</style>
