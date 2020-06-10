<template>
  <div class="card">
    <div class="title">
      <h3>Documentation checklist <br>
        <span>{{ visa.name }}</span>
      </h3>
    </div>
    <div class="body">
      <div class="check-list">
        <div 
          v-for="(item, index) in docChecklist.checklist"
          :key="index"
          :class="docChecklist.checklist[index].checked ? 'checked' : ''"
          class="field">
          <label class="container" :for="`check-${index}`">{{item.label}}</label>

          <pretty-check 
            v-model="item.checked"
            :id="`check-${index}`"
            class="p-icon p-smooth" 
            color="danger">
            <i slot="extra" class="icon fa fa-check"></i>
          </pretty-check>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import prettyCheck from 'pretty-checkbox-vue/check';

export default {
  props: {
    visa: { required: true, type: Object },
    docChecklist: { required: true, type: Object }
  },
  components: {
    prettyCheck
  },
  computed: {

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.card {
  background: white;
  border: 4px solid $primary-yellow;
  color: $dark-font;
  border-radius: $border-radius;
  position: relative;
  box-shadow: $shadow;

  .title {
    background: $primary-yellow;
    color: $dark-font;
    text-align: center;
    padding: $spacing;

    h3 {
      font-weight: 400;

      span {
        font-weight: 600;
      }
    }
  }

  .body {
    padding: $spacing*2 $spacing;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.field {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding: $spacing;
  font-size: 20px;
  background: $background;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: 0.3s;

  &.checked {
    background: transparent;
  }

  label {
    @include font(16px, 300);
    color: $dark-font;
    width: 100%;
  }

  &:not(:first-of-type) {
    margin-top: $spacing*2;
  }
}
</style>
