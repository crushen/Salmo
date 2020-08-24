<template>
  <div class="container">
    <h3 class="content">Check this timeline for all the important Brexit dates.</h3>

    <div 
      @mousedown="startDrag" 
      @mousemove="doDrag"
      class="horizontal-scroll-container">
      <div class="line"></div>
      <ul>
        <li 
          v-for="(event, index) in events"
          :key="event.title"
          @click="selectItem(index)"
          @focus="selectItem(index)"
          :class="{'selected': selected === index}"
          class="card"
          tabindex="0">
          <p class="date">{{ event.date }}</p>

          <transition-group name="fade" tag="div">
            <p 
              key="title"
              v-if="selected !== index"
              class="title">
              {{ event.title }}
            </p>

            <p 
              key="text"
              v-else
              class="text">
              {{ event.text }}
            </p>     
          </transition-group>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      dragging: false,
      startX: null,
      scrollLeft: null,
      selected: 0,
      events: [
        {
          date: '23 Jun 2016',
          title: 'UK votes to leave the EU',
          text: 'Despite early polls suggesting otherwise, the Leave campaign won by 1.3 million votes (Leave 51.9% to Remain 48.1%).'
        },
        {
          date: '17 Jan 2017',
          title: 'Brexit must be delivered',
          text: 'Theresa May comes out and says any ties with the EU will hold the UK back and claims she will deliver a "hard Brexit".'
        },
        {
          date: '8 Jun 2017',
          title: 'First general election',
          text: 'In an effort to increase her majorty in parliament, May called an election. However this backfired and the Conservatives lost some power.'
        },
        {
          date: '6 July 2018',
          title: 'Chequers chat',
          text: 'May came up with the "Chequers" deal in a bid to please both Remainers and Leavers. The ineffective deal pleased neither.'
        },
        {
          date: '12 Mar 2019',
          title: "Let's try again",
          text: 'May tries again to get her deal through parliament, but instead suffers another huge defeat.'
        },
        {
          date: '29 Mar 2019',
          title: 'Settlement Scheme opens',
          text: 'Home Office sets up a scheme to help EU people claim residency. However there have been concerns on how clear this system is.'
        },
        {
          date: '24 Jul 2019',
          title: 'Boris steps in',
          text: 'Boris Johnson takes over as PM as May departs Number 10 on the 24 June.'
        },
        {
          date: '12 Dec 2019',
          title: 'Yet another election',
          text: 'Johnson calls for an election to increase his power in parliament. He is successful and his deal brought in. May departs Number 10 on the 24 June.'
        },
        {
          date: '31 Jan 2020',
          title: 'Departure Starter',
          text: 'Britain officially starts the process of leaving the EU. Protests are seen across the captial in support of the EU and calls to cancel Brexit.'
        },
        {
          date: '1 Jun 2020',
          title: 'Stocktaking',
          text: 'A summit to assess the progress of Brexit talks is to take place in June. However COVID-19 has cast doubts whether this will be possible.'
        },
        {
          date: '31 Dec 2020',
          title: 'Free movement ends',
          text: "Johnson's hard attitude to Brexit means that whether or not a deal is reached, free movement will end on this date."
        },
        {
          date: '30 Jun 2021',
          title: 'Last chance',
          text: 'The government has allowed a 6th month "grace period" for individuals to apply for citizenship in the UK. After this date it will become harder to apply.'
        }
      ]
    }
  },
  methods: {
    startDrag(event) {
      const slider = document.querySelector('.horizontal-scroll-container');
      this.dragging = true;
      this.startX = event.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    },
    doDrag(event) {
      const slider = document.querySelector('.horizontal-scroll-container');
      if(this.dragging) {
        event.preventDefault();
        const x = event.pageX - slider.offsetLeft;
        const slide = (x - this.startX) * 2; //scroll-fast
        slider.scrollLeft = this.scrollLeft - slide;
      }
    },
    selectItem(index) {
      this.selected = index;
    }
  },
  mounted() {
    window.addEventListener('mouseup', () => {
      this.dragging = false;
      this.startX = null;
      this.scrollLeft = null;
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.fade-enter-active {
  transition: 0.3s;
  transition-delay: 0.3s;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

.container {
  background: $background;
  margin-top: $spacing*8;
  padding-top: $spacing*8;
}

.horizontal-scroll-container {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 300px;
  padding: 0 7.5%;
  margin-top: $spacing*8;
  position: relative;
}

ul {
  width: 1900px;
  display: flex;
  align-items: flex-start;
}

.line {
  width: 1800px;
  height: 12px;
  background: $secondary-light-blue;
  position: absolute;
  top: 20px;
  left: 7.5%;
  z-index: 0;
}

.card {
  list-style: none;
  width: 120px;
  height: 100px;
  background: $secondary-blue;
  border-radius: $border-radius;
  padding: $spacing*2 $spacing;
  margin-right: 40px;
  position: relative;
  z-index: 10;
  transition: 0.4s;
  cursor: pointer;
  outline: none;

  p {
    color: white;
    font-size: 14px;
    font-weight: 400;

    &.date {
      font-weight: 700;
      margin-bottom: $spacing;
    }

    &.text {
      margin-top: $spacing;
    }
  }

  &.selected {
    background: $primary-blue;
    width: 180px;
    height: 200px;
  }

  &:nth-of-type(5),
  &:nth-of-type(12),
  &:nth-of-type(13) {
    background: $secondary-pink;

    &.selected {
      background: $primary-pink;
    }
  }

  // To add margin to end of timeline
  &:last-child:after {
    content: "";
    width: 40px;
    height: 1px;
    position: absolute;
    left: 100%;
    top: 0px;
  }
}
</style>
