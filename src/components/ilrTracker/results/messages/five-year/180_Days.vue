<template>
  <div class="message-inner margin-m top">
    <div class="line" />

    <div class="inner-text">
      <p><b>Bad news</b>, you have recorded a trip (or more) that turns one of your 12 month brackets over 180 days outside the UK, which means your residency is <b>no longer</b> continuous to be considered for ILR.</p>
      
      <p class="margin-s top bottom">You now have two options:</p>

      <ol>
        <li class="margin-s bottom">
          Reset the starting day of your ILR to the day you arrived in the UK from the 180+ days trip. You can reset the changes by clicking the <span><img src="@/assets/icons/red/edit.svg" alt=""></span> button beside “ILR Tracker”. Example: Starting date was 01/01/2011, you came back from the 180+ days trip on 30/06/2014. Your restarting date is 30/06/2014.
        </li>

        <li>
          Provide compassionate or compelling circumstances. If you’re not sure, please read this Help Centre article.
        </li>
      </ol>
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
