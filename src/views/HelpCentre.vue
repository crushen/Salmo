<template>
  <section class="content">
    <h1>Confused?<br> Need more info?</h1>

    <section class="questions">
      <div 
        v-for="(question, index) in questions"
        :key="index"
        class="container"
        :class="{'selected': index === selected, 'disabled': index !== selected && selected !== null}">
        <div class="button">
          <button @click="toggleSelected(index, $event)">
            <img v-if="selected !== index" :src="arrow" class="icon">
            <img v-if="selected === index" :src="cross" class="icon cross">
          </button>
        </div>
        
        <div class="text">
          <h3>{{ question.title }}</h3>
          <p v-if="selected === index">{{ question.text }}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-down-solid.svg';
import cross from '@/assets/icons/white/times-solid.svg';

export default {
  data() {
    return {
      arrow,
      cross,
      selected: null,
      questions: [
        {
          title: 'Do I need to submit documents to use Salmo?',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "How much can I trust Salmo's information?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "What if my application gets rejected?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "If necessary, can I contact a human for help?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        },
        {
          title: "Why should I use Salmo?",
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates velit dolorem expedita, placeat ratione.'
        }
      ]
    }
  },
  methods: {
    toggleSelected(index, event) {
      if(event.target.tagName === 'IMG') {
        if(event.target.classList.contains('cross')) {
          this.selected = null;
        } else {
          this.selected = index;
        }
      } else if(event.target.tagName === 'BUTTON') {
        if(event.target.firstElementChild.classList.contains('cross')) {
          this.selected = null;
        } else {
          this.selected = index;
        } 
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*10 0;
}

.questions {
  margin-top: $spacing*8;
}

.container {
  margin-top: $spacing*5;
  padding: $spacing;
  border-radius: 4px;
  position: relative;

  .button {
    position: absolute;
    top: 0;
    right: 0;
  }

  button {
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    img {
      width: 24px;
      margin-top: 4px;

      &.cross {
        width: 20px;
      }
    }
  }


  &.selected {
    background: $primary-yellow;

    button {
      box-shadow: none;
    }
  }

  &.disabled {
    color: $light-grey;

    button {
      background: $light-grey;
    }
  }

  .text {
    h3 {
      width: 80%; 
    }

    p {
      margin-top: $spacing*2;
    }
  }
}
</style>
