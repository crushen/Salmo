<template>
  <div>
    <section class="tools-card">
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
              @click="checkItem(item)"
              class="inner">
              <img
                v-if="item.label.includes('CAS')"
                src="@/assets/illustrations/doc-checklist/cas.svg"
                alt="">

              <img
                v-if="item.label.includes('English')"
                src="@/assets/illustrations/doc-checklist/english.svg"
                alt="">

              <img
                v-if="item.label.includes('Finance')"
                src="@/assets/illustrations/doc-checklist/money.svg"
                alt="">

              <img
                v-if="item.label.includes('Passport')"
                src="@/assets/illustrations/doc-checklist/passport.svg"
                alt="">

              <p>{{ item.label }}</p>
            </div>
        </li>
      </ul>

      <transition name="note" mode="out-in">
        <p v-if="visibleNote" class="note">{{ visibleNote }}</p>
      </transition>
    </section>

    <transition name="dialog" mode="out-in">
      <alert
        v-if="showAlert"
        @confirm="selected.checked = false, showAlert = false"
        @cancel="showAlert = false" />
    </transition>
  </div>
</template>

<script>
import { notes } from '@/assets/js/documentChecklist'
import alert from '@/components/alerts/DocChecklist'

export default {
  components: { alert },
  props: {
    user: { required: true, type: Object }
  },
  data() {
    return {
      notes,
      visibleNote: null,
      showAlert: false
    }
  },
  methods: {
    checkItem(item) {
      this.selected = item

      if(!item.checked) {
        item.checked = true
      } else {
        this.showAlert = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.tools-card {
  padding-bottom: 4em;
  overflow: hidden;
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
