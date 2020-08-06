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
              v-for="(section, index) in tempVisa.sections"
              :key="index"
              @click="selectedTab = selectedTab === index ? null : index"
              class="top">
              {{ section.title }}
              <div class="tab" />

              <ul
                :class="selectedTab === index ? 'active' : ''"
                class="inner-list">
                <li
                  v-for="route in section.routes"
                  :key="route.slug">
                  {{ route.title }}
                </li>
              </ul>
            </li>
          </transition-group>
        </div>     
      </transition-group>
    </div>


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
      selectedTab: null,
      tempVisa: {
        sections: [
          {
            title: 'Introduction',
            routes: [
              {
                title: 'What can I do with this visa?',
                slug: 'what-can-I-do-with-this-visa'
              },
              {
                title: 'What are the requirements?',
                slug: 'what-are-the-requirements'
              },
              {
                title: 'How long can I stay?',
                slug: 'how-long-can-I-stay'
              },
              {
                title: ' What are my chances of getting this visa?',
                slug: 'what-are-my-chances'
              },
              {
                title: 'Why is it so hard?',
                slug: 'why-is-it-so-hard'
              },
              {
                title: 'What happens if I successfully get the visa?',
                slug: 'what-happens-if-im-successful'
              },
              {
                title: 'What happens if I’m unsuccessful?',
                slug: 'what-happens-if-im-unsuccessful'
              }
            ]
          }, 
          {
            title: 'Documentation',
            routes: [
              {
                title: 'What can I do with this visa?',
                slug: 'what-can-I-do-with-this-visa'
              },
              {
                title: 'What are the requirements?',
                slug: 'what-are-the-requirements'
              },
              {
                title: 'How long can I stay?',
                slug: 'how-long-can-I-stay'
              },
              {
                title: ' What are my chances of getting this visa?',
                slug: 'what-are-my-chances'
              }
            ]
          },
          {
            title: 'Process'
          },
          {
            title: 'Apply, Switch & Extend'
          },
          {
            title: 'Dependants'
          }
        ]
      },
      card: {
        pages: [
          {
            sections: [
              {
                title: 'Why this visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              },
              {
                title: 'Is this visa right for me?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              }
            ]
          },
          {
            sections: [
              {
                title: 'How long is the visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              },
              {
                title: 'When can I apply?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              }
            ]
          },
          {
            sections: [
              {
                title: 'Why this visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              },
              {
                title: 'Is this visa right for me?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              }
            ]
          },
          {
            sections: [
              {
                title: 'How long is the visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              },
              {
                title: 'When can I apply?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              }
            ]
          },
          {
            sections: [
              {
                title: 'Why this visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              },
              {
                title: 'Is this visa right for me?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              }
            ]
          }
        ]
      }
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
  position: relative;

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
