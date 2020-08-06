<template>
  <section class="content" v-if="visa">
    <h1>{{ visa.name }}</h1>

    <div class="menu">
      <button
        @click="menuOpen = !menuOpen"
        :class="menuOpen ? 'active' : ''">
        Jump To Section
        <img 
          src="@/assets/icons/pink/down.svg"
          :class="menuOpen ? 'active' : ''" 
          alt=""
          class="icon">
      </button>

      <!-- page content start here, should slide down with menu -->
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
              @click="selectedTab = selectedTab === index ? null : index"
              class="top">
              <router-link
                :to="{ name: 'visa-section', params: { section: section.slug } }">
                {{ section.title }}
              </router-link>
              <div class="tab" />

              <ul
                :class="selectedTab === index ? 'active' : ''"
                class="inner-list">
                <li
                  v-for="subsection in section.subsections"
                  :key="subsection.id">
                  {{ subsection.title }}
                </li>
              </ul>
            </li>
          </transition-group>
        </div>  
      </transition-group> 
    </div>

    <section class="visa-sections">
      <router-view />
    </section>  
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  data() {
    return {
      slug: this.$route.params.slug,
      menuOpen: false,
      selectedTab: null
    }
  },
  computed: {
    ...mapState('visas', ['visa'])
    // visa() {
    //   return this.visaList.find(item => item.slug === this.slug);
    // }
  },
  methods: {
    fetchVisa() {
      this.$store.dispatch('visas/getVisa', this.slug)
      .then(() => {
        if(!this.visa) {
          this.$router.push({name: 'not-found'});
        }
      })
    }
  }, 
  created() {
    this.fetchVisa();
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

.content {
  padding: $spacing*15 0;
  height: 200vh;
}

h1 {
  margin-bottom: $spacing*5;
}

.menu {
  width: 85%;
  margin: auto;
  position: absolute;

  button {
    padding: 12px;
    border-radius: 4px;
    background: white;
    border: 3px solid $primary-pink;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: 0.4s;
    outline: none;
    position: relative;
    z-index: 10;

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
    opacity: 0;

    &.active {
      position: relative;
      transform: translateY(0);
      opacity: 1;
    }

    ul {
      color: $light-font;
      padding: $spacing*2;
      list-style: none;
      
      &.top {
        width: 92%;
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
        transition: 0s;
      }

      &.inner-list.active {
        position: relative;
        transform: translateY(0);
        opacity: 1;
        transition: 0.4s;
      }
    }

    li {
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
