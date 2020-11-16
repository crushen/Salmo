<template>
  <base-tip @closeModal="closeModal">
    <h2>The Golden ILR Rules</h2>    

    <ol class="margin-s top bottom">
      <li>
        <b>You cannot leave the UK for more than 180 whole days in a single trip.</b>
        <p>One whole day counts as 24 hours, when we calculate your travel log, we do not count the half days (such as departure or arrival days) and only the whole days.</p>
      </li>

      <li class="margin-s top">
        <b>You cannot leave for more than 180 days in ANY 12 months of your 5 years period.</b>
      </li>

      <li class="margin-s top">
        <b>You maintain continuous legal leave in the UK for 5 years.</b>
        <p>The word “leave” means the duration you can stay in the UK during the validity of you visa. </p>
      </li>

      <li class="margin-s top">
        <b>If your current visa is expiring and you are required to make an application from your home country, you must leave the UK before your visa’s expiry date and re-enter to the UK with the new visa within 180 days from the day you depart.</b>
        <p>Example: Re-entry includes returning into the UK as a visitor whether you need a visitor visa or not.</p>
      </li>
    </ol>

    <p>For more information on the ILR rules and how we calculate your travels, please visit this Help Centre article.</p>
  </base-tip>
</template>

<script>
import baseTip from '@/components/modals/ilrTracker/tips/BaseTip'

export default {
  components: { baseTip },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

ol {
  list-style-type: decimal;
}
</style>
