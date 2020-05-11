<template>
  <div class="card">
    <div class="title">
      <h3>Documentation checklist <br>
        <span>{{ visa.name }}</span>
      </h3>
    </div>
    <div class="body">
      <div class="check-list">
        <div class="field">
          <input 
            id="check"
            class="form" 
            type="checkbox">
          <label for="check">
            Current passport (or travel documentation with blank page)
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visa: { required: true, type: Object }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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

.check-list {
  .field {
    width: 100%;
    background: $background;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  label {
    width: 90%;
  }
}
</style>
