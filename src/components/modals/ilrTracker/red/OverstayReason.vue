<template>
  <base-tip @closeModal="closeModal">
    <h1>Do you have a reason?</h1>

    <FormulateForm @submit="submitForm" class="margin-m top">
      <FormulateInput
        v-model="form.haveReason"
        type="select"
        :options="{yes: 'yes', no: 'no'}"
        label="yes / no"
        validation="required"
        error-behavior="submit"
        class="white-label" />

      <div v-if="form.haveReason === 'yes'">
        <FormulateInput
          v-model="form.reason"
          type="select"
          :options="{
            waitingApplication: 'I’m waiting for my visa application that I’ve sent before my visa expired.',
            appeal: 'I made an adminitrative review or appeal before my visa expired.',
            waitingAppeal: 'I am waiting for the result of my administrative review or appeal.',
            pregnant: 'I or my relative was pregnant (including maternal and paternal leaves) or severely ill (both provided with medical evidence).',
            death: 'My relative passed away suddenly (provided with death certificate).',
            conflict: 'There was a conflict, e.g. abuse, lawsuit etc.',
            disaster: 'There was a natural disaster, e.g. volcanic eruption, tsunami etc.'
          }"
          label="my reason is:"
          validation="required"
          error-behavior="submit"
          class="white-label" />

        <FormulateInput
          v-model="form.note"
          type="textarea"
          label="extra note:"
          validation="max:50,length"
          error-behavior="submit"
          class="white-label" />
      </div>

      <div class="buttons">
        <FormulateInput
          type="submit"
          label="Save"
          error-behavior="submit"
          class="white margin-m top" />

        <button
          @click.prevent="closeModal"
          class="primary">
          Cancel
        </button>
      </div>
    </FormulateForm>
  </base-tip>
</template>

<script>
import baseTip from '@/components/modals/ilrTracker/red/BaseTip'

export default {
  props: {
    overstayHoliday: { type: Object, required: true }
  },
  components: { baseTip },
  data() {
    return {
      form: {
        haveReason: null,
        reason: null,
        note: null
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    submitForm() {
      this.overstayHoliday.reason = this.form

      const holidays = this.profileToUpdate.holiday,
            index = holidays.findIndex(item => item.country === this.overstayHoliday.country && item.leftUk === this.overstayHoliday.leftUk);
      
      holidays[index] = this.overstayHoliday

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('closeModal'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h1,
.tertiary {
  color: white;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tertiary {
  color: white;
  font-size: 20px;
}

.primary {
  border: 3px solid white;

  &:hover {
    background: white;
    color: $red;
  }
}
</style>
