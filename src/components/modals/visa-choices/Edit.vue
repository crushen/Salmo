<template>
  <base-modal @closeModal="closeModal">
    <h2>Edit my next visa</h2>

    <div v-if="!selected">
      <h3>Your current choice is:</h3>

      <div class="center">
        <div class="visa-card margin-s top">
          <p>{{ nextVisa }}</p>
        </div>
      </div>

      <h3 class="margin-m top">Your new choice will be:</h3>

      <div class="scroll-container">
        <ul class="margin-s top">
          <li
            @click="selected = visa.label"
            v-for="visa in visaOptions"
            :key="visa.label"
            class="visa-card">
            {{ visa.label }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <h3>Your change of visa:</h3>

      <div class="center">
        <div class="visa-card margin-s top">
          <p>{{ nextVisa }}</p>
        </div>
      </div>

      <p>to</p>

      <div class="center">
        <div class="visa-card margin-s top">
          <p>{{ selected }}</p>
        </div>
      </div>

      <p class="margin-s top">Changing your next visa will restart your visa planner and anything on it will be lost forever.</p>
      <p class="margin-s top"><b>Are you sure you want to change your next visa?</b></p>

      <div class="center buttons margin-m top">
        <button
          @click="handleSubmit"
          class="primary">
          Save
        </button>

        <button
          @click="selected = null"
          class="outline margin-s top">
          Back
        </button>
      </div>
    </div>
  </base-modal>
</template>

<script>
import baseModal from '@/components/modals/BaseModal'
import { visaOptions } from '@/assets/js/visaOptions'

export default {
  props: {
    profileToUpdate: { required: true, type: Object }
  },
  components: { baseModal },
  data() {
    return {
      visaOptions,
      nextVisa: this.profileToUpdate.nextVisa.name,
      selected: null
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.scroll-container {
  overflow-x: scroll;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

ul {
  margin-left: 3em;
  width: 1200px;
  display: flex;
  overflow-y: visible;
}

li {
  position: relative;
  margin-right: 1em;
  display: inline-block;
}

.visa-card {
  width: 150px;
  height: 150px;
  padding: 1em;
  border-radius: $radius;
  background: white;
  display: flex;
  align-items: flex-end;
}

.center {
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: column;

  button {
    min-width: 120px;
  }
}
</style>
