<template>
  <div class="horizontal-scroll-container section-margin">
    <div class="timeline">
      <div class="top"></div>
      <div class="middle"></div>

      <div class="bottom">
        <div class="years">
          <div class="medium one">
            <p>2016</p>
          </div>
          <div class="small two">
            <p>2017</p>
            <p>2018</p>
            <p>2019</p>
          </div>
          <div class="big three">
            <p>2020</p>
          </div>
          <div class="medium four">
            <p>2021</p>
          </div>
        </div>

        <div class="months">
          <div class="one">
            <div class="inner">
              <p>June</p>
            </div>
          </div>

          <div class="two">
            <div class="inner"></div>
          </div>

          <div class="three">
            <div class="inner">
              <p 
                v-for="month in months"
                :key="month">
                {{ month }}
              </p>
            </div>
          </div>

          <div class="four">
            <div class="inner">
              <p>July</p>
            </div>
          </div>
        </div>

        <div class="events">
          <div 
            v-for="(event, index) in events"
            :key="index"
            class="event">
            <div class="line"></div>
            <div
              @click="open(index)"
              :class="{'open': index === selectedTab}" 
              class="tab">
              <p v-if="!openTab || index !== selectedTab">{{ event.date }}</p>
              <div v-else-if="openTab && index === selectedTab">
                <p>{{ event.date }}</p>
                <p class="text">{{ event.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      openTab: false,
      selectedTab: null,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      events: [
        {
          date: '23 Jun',
          text: 'UK votes to leave the European Union.'
        },
        {
          date: '31 Jan',
          text: 'UK votes to leave the European Union.'
        },
        {
          date: '1 Mar',
          text: 'UK votes to leave the European Union.'
        },
        {
          date: '1 June',
          text: 'UK votes to leave the European Union.'
        },
        {
          date: '1 July',
          text: 'UK votes to leave the European Union.'
        },
        {
          date: '26 Nov',
          text: 'UK votes to leave the European Union.'
        },
        {
          date: '31 Dec',
          text: 'UK votes to leave the European Union.'
        }
      ]
    }
  },
  methods: {
    open(index) {
      this.selectedTab = index;
      this.openTab = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.horizontal-scroll-container {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding-top: 20px;

  p {
    font-weight: 500;
  }
}

.timeline {
  height: 180px;
  width: 1580px;
  background: white;
  .top,
  .middle {
    height: 38%;
    border-top: 3px solid $light-grey;
  }

  .bottom {
    height: 24%;
  }
}

.years {
  display: flex;
  color: $light-grey;
  margin-left: 70px;

  p {
    font-weight: 900;
  }

  .one {
    margin-right: 50px;
    color: darken($light-grey, 13%);
  }

  .two {
    margin-right: 40px;
    color: lighten($light-grey, 3%);
  }

  .three {
    margin-right: 964px;
    color: darken($light-grey, 5%);
  }

  .four {
    color: darken($light-grey, 13%);
  }

  .small {
    display: flex;

    p {
      font-size: 16px;
      transform: translateY(-18px);
      margin-right: 4px;      
    }
  }

  .medium {
    display: flex;

    p {
      font-size: 35px;
      transform: translateY(-39px);
    }
  }

  .big {
    display: flex;

    p {
      font-size: 60px;
      transform: translateY(-67px);
    }
  }
}

.months {
  display: flex;
  height: 100%;
  transform: translateY(-86px);

  .one {
    background: lighten($light-grey, 3%);
    width: 170px;

    .inner {
      height: 100%;
      padding-top: 8px;
      background: darken($light-grey, 13%);
      border-bottom-right-radius: 25px;
    }

    p {
      margin-left: 72px;
    }
  }

  .two {
    background: darken($light-grey, 5%);
    width: 150px;

    .inner {
      height: 100%;
      padding-top: 8px;
      background: lighten($light-grey, 3%);
      border-bottom-right-radius: 25px;
    }
    
  }

  .three {
    background: darken($light-grey, 13%);
    width: 1060px;

    .inner {
      height: 100%;
      padding: 8px 0 0 32px;
      display: flex;
      background: darken($light-grey, 5%);
      border-bottom-right-radius: 25px;
    }

    p:not(:first-of-type) {
      margin-left: 32px;
    } 
    
  }


  .four {
    background: darken($light-grey, 13%);
    width: 200px;

    .inner {
      height: 100%;
      padding: 8px 0 0 72px;
      background: darken($light-grey, 13%);
      border-bottom-right-radius: 25px;
    }
  }
}

.events {
  transform: translateY(-210px);
  display: flex;

  .event {
    position: absolute;
    width: 60px;

    &:nth-of-type(even) {
      .tab {
        &.open {
          bottom: -30px;
        }
      }
    }
  }

  .tab {
    background: $secondary-blue;
    color: $light-font;
    border-radius: 4px;
    padding: 3px 6px;
    white-space: normal;
    transition: 0.2s;
    position: absolute;
    z-index: 5;

    &.open {
      width: 150px;
      left: -75%;
    }

    .text {
      font-weight: 300;
    }
  }

  .line {
    width: 3px;
    height: 81px;
    background: $secondary-blue;
    position: absolute;
    z-index: 0;
    top: 0;
    left: calc(50% - 3px);
  }

  .event:nth-of-type(odd) {
    top: -69px;
    margin-left: 58px;

    .line {
      height: 150px;
    }
  }

  .event:nth-of-type(2) {
    margin-left: 350px;
  }

  .event:nth-of-type(3) {
    margin-left: 530px;
  }

  .event:nth-of-type(4) {
    margin-left: 720px;
  }

  .event:nth-of-type(5) {
    margin-left: 810px;
  }

  .event:nth-of-type(6) {
    margin-left: 1170px;
  }
}
</style>
