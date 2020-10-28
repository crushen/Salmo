<template>
  <div>
    <div class="tools-card">
      <div class="header">
        <h2>Travel Log</h2>
        <button class="none">
          <img src="@/assets/icons/red/plus.svg" alt="">
        </button>
      </div>

      <div class="body">
        <div class="holiday-input">
          <ul 
            v-if="user.profile.holiday.length"
            class="inner">
            <li
              v-for="(item, index) in sortByDate"
              :key="index"
              class="item">
              <p class="location">{{ item.location }}</p>
              <p
                class="dates" 
                :aria-label="`${item.location} start and end`">
                {{ date(item.start) }} - {{ date(item.end) }}
              </p>

              <!-- <div v-if="editHoliday" class="edit-delete">
                <button
                  :id="`edit-btn-${index}`"
                  @click="openEdit(index)"
                  class="tertiary aria-btn edit-btn"
                  :aria-label="`Edit ${item.location}`"
                  aria-expanded="false">
                  Edit
                </button>
                <button 
                  @click="openAlert(index)"
                  class="tertiary aria-btn"
                  :aria-label="`Delete ${item.location}`">
                  Delete
                </button>
              </div> -->
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <button @click="$emit('calculate')">Calculate</button> -->
  </div>

    <!-- <transition name="modal" mode="out-in">
      <add-holiday
        id="add-holiday-modal"
        v-if="modalOpen"
        @closeModal="modalOpen = false, closeEdits()"
        @addHoliday="updateHoliday" />

      <edit-holiday
        id="edit-holiday-modal"
        v-if="editOpen"
        :holiday="sortByDate"
        :index="index"
        @closeModal="editOpen = false, editHoliday = false;"
        @updateHoliday="updateHoliday" />
    </transition>

    <transition name="alert" mode="out-in">
      <alert 
        v-if="showAlert"
        alert="Delete Holiday"
        text="Are you sure you want to delete this holiday?"
        :buttons="['Cancel', 'Delete Holiday']"
        @cancel="showAlert = false"
        @confirm="deleteHoliday" />
    </transition> -->
</template>

<script>
export default {
  props: ['user', 'sortByDate'],
  methods: {
    date(date) {
      return date.split('-').reverse().join('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.header {
  padding: 16px 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }

}





// .modal-enter,
// .modal-leave-to {
//   transform: translate(-50%, -55%);
//   opacity: 0;
// }
// .modal-enter-active,
// .modal-leave-active {
//   transition: 0.6s;
// }

// .card {
//   background: white;
//   border: 4px solid $primary-yellow;
//   border-radius: $border-radius;
//   position: relative;
//   box-shadow: $shadow;

//   .title {
//     background: $primary-yellow;
//     text-align: center;
//     padding: $spacing;
//   }

//   .body {
//     padding: $spacing*3 $spacing*2;

//     .text {
//       margin-bottom: $spacing*2;
//     }
//   }
// }

// .holiday-input {
//   .item {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     padding: $spacing;
//     margin-top: $spacing;
//     background: $lightest-grey;
//     border-radius: 4px;
    
//     p {
//       font-size: 16px;
//     }

//     .location {
//       font-weight: 600;
//     }

//     .edit-delete {
//       width: 100%;
//       display: flex;
//       justify-content: space-evenly;
//       margin-top: $spacing*2;
      
//       button {
//         color: $primary-pink;
//       }
//     }
//   }
// }

// .add-holiday {
//   margin: $spacing*3 auto auto;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   max-width: 350px;

//   button {
//     width: 135px;
//   }
// }

// .result {
//   background: $primary-yellow;
//   padding: $spacing*3 $spacing*2;

//   h3 {
//     margin-bottom: $spacing*2;
//   }

//   .description {
//     margin-bottom: $spacing*4;

//     .button {
//       margin: $spacing*4;
//       text-align: center;
//     }
//   }

//   .date {
//     background: darken($primary-yellow, 12%);
//     padding: 6px 8px;
//     border-radius: 4px;
//     margin: $spacing 0 $spacing*2 0;

//     &:first-of-type {
//       margin: 0 0 $spacing*2 0;
//     }

//     p {
//       font-size: 22px;
//       font-family: 'mrs-eaves-roman-all-small-ca', $serif;
//     } 
//   }

//   span {
//     font-weight: 600;
//   }

//   .holiday-result {
//     margin-top: $spacing*2;
//     background: darken($color: $primary-yellow, $amount: 10%);
//     border-radius: 4px;
//     padding: $spacing;
//     position: relative;

//     h3 {
//       color: $primary-pink;
//       text-decoration: underline;
//     }

//     .year {
//       margin: $spacing 0;
//     }

//     .icon {
//       position: absolute;
//       bottom: 10px;
//       right: 10px;
//     }
//   }
// }

// .underline {
//   text-decoration: underline;
// }

// .margin {
//   margin-top: $spacing*2;
// }

// // Tablet
// @media screen and (min-width: 600px) {
//   .card {
//     .body {
//       min-height: 240px;
//     }

//     .result {
//       min-height: 215px;
//     }

//     .years {
//       display: flex;
//       justify-content: space-between;

//       &.center {
//         justify-content: center;
//       }

//       section {
//         width: 48%;
//       }
//     }
//   }

//   .holiday-input {
//     margin-top: $spacing*3;

//     .inner {
//       display: flex;
//       flex-wrap: wrap;
//       align-items: center;
//       justify-content: space-between;
//     }

//     .item {
//       width: 48%;
//     }
//   }

//   .add-holiday {
//     margin: $spacing*5 auto auto;
//   }
// }
</style>
