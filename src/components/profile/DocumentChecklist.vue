<template>
  <section class="card">
    <h2>Checklist</h2>
    <h3 class="margin-s top">Click on any item to fade our your completed task!</h3>

    <ul>
      <li
        v-for="item in user.profile.nextVisa.documentChecklist"
        :key="item.label"
        :class="item.checked ? 'checked' : ''">
          <div
            @mouseenter="visibleNote = notes.find(note => note.label === item.label).note"
            @mouseleave="visibleNote = null"
            @click="item.checked = !item.checked"
            class="inner">
            <img
              v-if="item.label.includes('CAS')"
              src="@/assets/version-2/doc-checklist/cas.svg"
              alt="">

            <img
              v-if="item.label.includes('English')"
              src="@/assets/version-2/doc-checklist/english.svg"
              alt="">

            <img
              v-if="item.label.includes('Finance')"
              src="@/assets/version-2/doc-checklist/money.svg"
              alt="">

            <img
              v-if="item.label.includes('Passport')"
              src="@/assets/version-2/doc-checklist/passport.svg"
              alt="">

            <p>{{ item.label }}</p>
          </div>
      </li>
    </ul>

    <transition name="note" mode="out-in">
      <p v-if="visibleNote" class="note">{{ visibleNote }}</p>
    </transition>
  </section>
</template>

<script>
import { notes } from '@/assets/js/documentChecklist'

export default {
  props: {
    user: { required: true, type: Object }
  },
  data() {
    return {
      notes,
      visibleNote: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.card {
  width: 93%;
  margin: auto;
  background: white;
  border-radius: $radius;
  position: relative;
  padding-bottom: 4em;
  overflow: hidden;
}

h2 {
  margin: 4% 4% 0;
}

h3 {
  margin-left: 2em;
}

ul {
  width: 90%;
  margin: 1em auto;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;

  .inner {
    min-height: 130px;
    min-width: 130px;
    border-radius: $radius;
    border: 4px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      border: 4px solid $red;
    }
  }

  p {
    color: $blue;
    font-weight: 400;
    margin-top: 0.5em;
  }

  &.checked {
    opacity: 0.5;
  }
}

.note {
  width: 100%;
  background: $red;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1em;
  border-radius: $radius;
}

.note-enter,
.note-leave-to {
  transform: translateY(100%);
}
.note-enter-active,
.note-leave-active {
  transition: 0.4s;
}

@media screen and (min-width: 370px) {
  li {
    .inner {
      min-height: 150px;
      min-width: 150px;
    }
  }
}
</style>
