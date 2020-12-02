<template>
  <base-modal
    @closeModal="closeModal"
    class="next-visa-select">
    <h2>Choose my next visa</h2>

    <div
      v-if="!nextVisa && !selected"
      class="margin-s top">
      <h3>What is your next visa going to be?</h3>

      <div class="scroll-container" :class="{'allow-scroll': innerWidth > 700}">
        <ul class="margin-s top">
          <li
            @click="selected = visa"
            v-for="visa in visaOptions"
            :key="visa.label"
            class="visa-card">
            <img :src="visa.img" alt="">
            {{ visa.label }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="!nextVisa && selected" class="margin-s top">
      <h3>You've chosen...</h3>

      <div class="center">
        <div class="visa-card margin-s top">
          <img :src="selected.img" alt="">
          <p>{{ selected.label }}</p>
        </div>

        <p class="margin-s top">We will plan everything for you based on your visa choice. Press <b>‘save’</b> to proceed or <b>‘back’</b> to choose again.</p>

        <div class="buttons margin-m top">
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
      selected: null,
      innerWidth: null
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.selected.label)
    }
  },
  mounted() {
    this.innerWidth = window.innerWidth
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth
    })
  }
}
</script>

<style lang="scss" scoped>
.next-visa-select {
  .scroll-container {
    overflow-x: scroll;
    scrollbar-width: auto;
  }
  
  // .scroll-container::-webkit-scrollbar {
  //   display: unset;
  // }
}
</style>
