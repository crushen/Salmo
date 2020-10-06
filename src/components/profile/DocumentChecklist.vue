<template>
  <section class="card">
    <h1>Checklist</h1>
    <h2>Click on any item to fade our your completed task!</h2>

    <ul>
      <li
        v-for="item in user.profile.nextVisa.documentChecklist"
        :key="item.label"
        :class="item.checked ? 'checked' : ''"
        @mouseover="visibleNote = notes.find(note => note.label === item.label).note"
        @mouseout="visibleNote = null">
        <FormulateInput
          v-model="item.checked"
          type="checkbox"
          :label="item.label" />
      </li>
    </ul>

    <p v-if="visibleNote" class="note">{{ visibleNote }}</p>
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
ul {
  list-style: none;
}

li {
  border: 2px solid transparent;

  &:hover {
    border: 2px solid red;
  }

  &.checked {
    opacity: 0.6;
  }
}

.note {
  background: red;
  color: white;
  margin-top: 10px;
}
</style>
