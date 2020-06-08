<template>
  <div v-if="selectedTab === index + 1" :key="index + 100">
    <section 
      v-for="section in sections"
      :key="section.title"
      class="section">
      <h2>{{ section.title }}</h2>
      <p class="text">{{ section.text }}</p>

      <tip 
        v-if="section.tipText"
        :text="section.tipText" />
    </section>

    <div 
      @click="$emit('next')"
      class="next-button"
      :class="selectedTab === 5 ? 'disabled' : ''">
      <p>Next Section</p>
      <span>&#8227;</span>
    </div>
  </div>
</template>

<script>
import tip from '@/components/Tip';

export default {
  props: {
    sections: { required: true, type: Array },
    selectedTab: { required: true, type: Number },
    index: { required: true, type: Number }
  },
  components: {
    tip
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h2 {
  color: $primary-pink;
  padding: 0 $spacing*2;
}

p {
  padding: 0 $spacing*2;
}

.text {
  margin: $spacing*2 0;
}

.next-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $spacing*4 $spacing*2 0;
  transition: 0.2s;

  p {
    text-decoration: underline;
    font-weight: 600;
    padding: 0;
  }

  span {
    font-size: 55px;
    line-height: 0;
    padding: 0 0 6px 6px;
  }

  &.disabled {
    color: $light-grey;
  }
}
</style>
