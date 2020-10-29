<template>
  <base-modal @closeModal="closeModal" class="next-visa-select">
    <h2>Edit my next visa</h2>

    <div v-if="!selected" class="margin-s top">
      <h3>Your current choice is:</h3>

      <div class="center">
        <div class="visa-card margin-s top">
          <img :src="nextVisa.img" alt="">
          <p>{{ nextVisa.label }}</p>
        </div>
      </div>

      <h3 class="margin-m top">Your new choice will be:</h3>

      <div class="scroll-container">
        <ul class="margin-s top">
          <li
            @click="selected = visa"
            v-for="visa in noDuplicateVisaOptions"
            :key="visa.label"
            class="visa-card">
            <img :src="visa.img" alt="">
            {{ visa.label }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="margin-s top">
      <h3>Your change of visa:</h3>

      <div class="center">
        <div class="visa-card margin-s top">
          <img :src="nextVisa.img" alt="">
          <p>{{ nextVisa.label }}</p>
        </div>

        <img src="@/assets/icons/grey/arrow-down.svg" alt="" class="margin-s top">

        <div class="visa-card margin-s top">
          <img :src="selected.img" alt="">
          <p>{{ selected.label }}</p>
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
      selected: null
    }
  },
  computed: {
    nextVisa() {
      return this.visaOptions.find(visa => visa.label === this.profileToUpdate.nextVisa.name)
    },
    noDuplicateVisaOptions() {
      return this.visaOptions.filter(visa => visa.label !== this.profileToUpdate.nextVisa.name)
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.selected.label)
    }
  }
}
</script>
