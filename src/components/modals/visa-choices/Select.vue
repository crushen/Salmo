<template>
  <base-modal @closeModal="closeModal">
    <h2>Choose my next visa</h2>

    <div
      v-if="!nextVisa && !selected"
      class="margin-s top">
      <h3>What is your next visa going to be?</h3>

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

    <div v-else-if="!nextVisa && selected" class="margin-s top">
      <h3>You've chosen...</h3>

      <div class="center">
        <div class="visa-card margin-s top">
          <p>{{ selected }}</p>
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

    <div v-else-if="nextVisa && !selected">
      <p>hello</p>
    </div>


    <!-- <FormulateForm @submit="handleSubmit" class="margin-s top">
      <FormulateInput
        v-model="form.nextVisa"
        type="select"
        :options="visaOptions"
        label="Choose your next visa:"
        placeholder="visa name"
        class="grey-label" />
      
      <FormulateInput
        type="submit"
        label="Save"
        class="margin-m top button" />
    </FormulateForm> -->
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
// .button {
//   text-align: right;
// }

// .interested {
//   display: flex;
//   align-items: center;

//   p {
//     padding-bottom: 0.2em;
//   }

//   button {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-left: 0.5em;
//   }

//   &:not(:first-of-type) {
//     margin-top: 0.5em;
//   }
// }


</style>