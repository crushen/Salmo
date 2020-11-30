<template>
  <div class="message-inner margin-m top">
    <div class="line" />

    <div class="inner-text">
      <p><b>Your 5 year plan can no longer be continued.</b></p>
      <p>Our tracker has detected some changes that has affected the flow of the 5 year plan and cannot continue to calculate this plan anymore.</p>
      
      <p class="margin-s top bottom">Here are some possible reasons:</p>

      <ol>
        <li class="margin-s bottom">
          You have switched to a visa that is not qualified for 5 year plan. For example: switching from Tier 1 Innovator to Tier 4 Student.
        </li>

        <li class="margin-s bottom">
          You have switched to a a visa that is qualified for 5 year plan but requires to restart the count again. For example: switching from Tier 1 Innovator to Tier 1 Investor.
        </li>
      </ol>

      <p class="margin-s bottom">These are some (but the main) reasons that leads us to this moment, in which we recommend you to switch to 10 year plan instead, for your own benefits. <b>Your days will still be counted. None of them will be lost for 10 year plan. You can reset the changes by clicking the <span><img src="@/assets/icons/red/edit.svg" alt=""></span> button beside “ILR Tracker”.</b></p>
      
      <p><b>For more information on the ILR rules and how we calculate your travels, please visit this Help Centre article. </b></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.message-inner {
  .line {
    background: $red;
  }
}

img {
  width: 20px;
}
</style>
