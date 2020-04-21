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
              <p>January</p>
              <p>February</p>
            </div>
          </div>

          <div class="four">
            <div class="inner"></div>
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
}

.timeline {
  height: 180px;
  width: 1200px;
  background: white;
  .top,
  .middle {
    height: 38%;
    border-top: 3px solid $light-grey;
  }

  .bottom {
    height: 24%;
    background: lighten($light-grey, 3%);
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
    margin-right: 620px;
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
      transform: translateY(-40px);
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

  p {
    font-weight: 500;
  }

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
    width: 750px;

    .inner {
      height: 100%;
      padding: 8px 0 0 30px;
      display: flex;
      background: darken($light-grey, 5%);
      border-bottom-right-radius: 25px;
    }

    p {
      &:nth-of-type(2) {
        margin-left: 60px;
      }
    }
  }


  .four {
    background: lighten($light-grey, 3%);
    width: 120px;

    .inner {
      height: 100%;
      padding-top: 8px;
      background: darken($light-grey, 13%);
      border-bottom-right-radius: 25px;
    }
  }
}
</style>
