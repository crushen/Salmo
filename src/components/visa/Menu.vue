<template>
  <div>
    <div class="menu">
      <button
        @click="$emit('toggle')"
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
                @click="select($event, index)"
                class="section-title">
                {{ section.title }}
              </p>

              <ul
                :class="selectedTab === index ? 'active' : ''"
                class="inner-list">
                <li
                  v-for="subsection in section.subsections"
                  :key="subsection.id"
                  @click="$emit('close')">
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
  </div>

</template>

<script>
export default {
  props: ['menuOpen', 'visa', 'selectedTab'],
  methods: {
    select(event, index) {
      this.$emit('select-tab', {event, index})
    }
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

.menu {
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 15;

  button {
    padding: 12px;
    border-radius: 0;
    background: white;
    border-bottom: 3px solid $red;
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
      padding: 1rem;
      list-style: none;
      
      &.top {
        width: 100%;
        margin: auto;
        background: $red;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
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
      margin-top: 1rem;
      position: relative;

      &.top {
        font-weight: 600;
      }

      &:first-of-type {
        margin-top: 0;
      }
    }
  }

  p {
    font-weight: 600;

    &.section-title {
      color: $light-font;
    }
  }

  a {
    text-decoration: none;
    color: $light-font;
    font-weight: 300;

    &.router-link-active {
      text-decoration: underline;
    }
  }
}

@media screen and (min-width: 700px) {
  .menu {
    width: 70%;
    left: 15%;
  } 
}
</style>
