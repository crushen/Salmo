<template>
  <div class="message">
    <div class="button-center">
      <button
        @click="open = !open"
        class="tertiary">
        {{ buttonText }}
      </button>
    </div>


    <div v-if="open">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: { type: String, required: true }
  },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.message {
  background: $med-blue;
  padding: 1rem;
  border-radius: $radius;
}

.tertiary {
  color: white;
  font-weight: 600;
  font-size: 18px;
}

ol {
  li {
    font-weight: 500;
    list-style-position: inside;
    list-style-type: decimal;
  }
}

.message-inner {
  position: relative;
  
  .line {
    position: absolute;
    width: 8px;
    height: 100%;
    border-radius: $radius;
  }

  .inner-text {
    margin-left: 1rem;

    p, li {
      color: white;
    }
  }
}
</style>
