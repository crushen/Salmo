<template>
  <div class="message-inner margin-m top">
    <div class="line" />

    <div class="inner-text">
      <p><b>You have overstayed your visa by a few days.</b> This means that after your visa expired, you continued to stay in the UK before you left. Luckily, because this happened before the change of rules (if you would like to know more, please read this Help Centre article), which means there are some exemptions.</p>

      <p class="margin-s top bottom">The old exemptions were (all rules must be met):</p>

      <ol>
        <li>
          You have left the UK with or without an expired visa.
        </li>

        <li>
          You have applied for a new visa within 28 days of the expiry date of your previous visa.
        </li>

        <li class="margin-s bottom">
          Your application was successful and re-entered the country with your new visa.
        </li>
      </ol>

      <p>You have met all the requirements of the old rules, therefore your ILR is still on track. However, the overstayed duration cannot be counted towards your stay in the UK. We will deduct the days off for you!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.message-inner {
  .line {
    background: $blue;
  }
}

img {
  width: 20px;
}
</style>
