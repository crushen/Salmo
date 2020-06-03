<template>
  <div>
    <section class="content">
      <transition name="alert" mode="out-in">
        <alert 
          v-if="showAlert"
          alert="Progress will be lost"
          text="Are you sure you want to go leave this page? Your progress will be lost if you continue."
          :buttons="['Leave page', 'Stay on page']"
          @cancel="showAlert = false, $router.push(to)"
          @confirm="showAlert = false, to = null, $router.go(1)" />
      </transition>

      <h1>Edit profile.</h1>

      <form 
        @submit.prevent="validateForm"
        class="container">

        <div class="field">
          <label for="dob" class="form-label">Username</label>
          <input 
            v-model.trim="profileToUpdate.username"
            type="text"
            placeholder="Username"
            autocomplete="username"
            class="form">
          <div v-if="$v.profileToUpdate.username.$error">
            <p v-if="!$v.profileToUpdate.username.required" class="error">Username is required</p>
            <p v-if="!$v.profileToUpdate.username.minLength" class="error">Username should be at least 6 characters</p>
            <p v-if="!$v.profileToUpdate.username.maxLength" class="error">Username should be no more than 10 characters</p>
          </div>
        </div>


        <div class="field">
          <label for="dob" class="form-label">Birthday</label>
          <input 
            v-model="profileToUpdate.birthday"
            type="date" 
            placeholder="Birthday"
            id="dob"
            class="form unstyled">
            <p v-if="errors.birthday" class="error">Birthday is required</p>
        </div>

        <div class="field">
          <label for="dependants">Dependants</label>
          <select 
            v-model="profileToUpdate.dependants"
            name="Dependants"
            id="dependants"
            class="form">
            <option
              v-for="dependant in dependantsList"
              :key="dependant"
              :value="dependant">
              {{ dependant }}
            </option>
          </select>
          <p v-if="errors.dependants" class="error">Dependants is required</p>
        </div>

        <div class="field">
          <label for="nationality">Nationality</label>
          <select 
            class="form"
            v-model="profileToUpdate.nationality"
            name="Nationality"
            id="nationality">
            <option
              v-for="country in countries"
              :key="country"
              :value="country">
              {{ country }}
            </option>
          </select>
          <p v-if="errors.nationality" class="error">Nationality is required</p>
        </div>

        <div class="field current-visa">
          <label for="current-visa">Current visa</label>
          <select
            class="form" 
            v-model="profileToUpdate.currentVisa.name"
            name="Current Visa"
            id="current-visa">
            <option
              v-for="visa in visas"
              :key="visa"
              :value="visa">
              {{ visa }}
            </option>
          </select>
        </div>

        <div class="field visa-dates">
          <div>
            <label for="current-start" class="form-label">Start date</label>
            <input 
              v-model="profileToUpdate.currentVisa.start"
              type="date"
              id="current-start"
              class="form unstyled">
          </div>

          <div>
            <label for="current-end" class="form-label">End date</label>
            <input 
              v-model="profileToUpdate.currentVisa.end"
              type="date"
              id="current-end"
              class="form unstyled">
          </div>
        </div>
        <p v-if="errors.currentVisa.required" class="error">Current visa name and dates are required</p>
        <p v-if="errors.currentVisa.dates" class="error">Current visa start date can't be after end date</p>

        <div
          v-for="(visa, index) in profileToUpdate.pastVisas"
          :key="index">
          <div class="field past-visa">
            <label :for="`past-visa-${index}`">Past visa</label>
            <select
              class="form" 
              v-model="visa.name"
              name="Current Visa"
              :id="`past-visa-${index}`">
              <option
                v-for="item in visas"
                :key="item"
                :value="item">
                {{ item }}
              </option>
            </select>
          </div>

          <div class="field visa-dates">
            <div>
              <label :for="`past-start-${index}`" class="form-label">Start date</label>
              <input 
                v-model="visa.start"
                type="date"
                :id="`past-start-${index}`"
                class="form unstyled">
            </div>

            <div>
              <label :for="`current-end-${index}`" class="form-label">End date</label>
              <input
                v-model="visa.end"
                type="date"
                :id="`current-end-${index}`"
                class="form unstyled">
            </div>
          </div>
        </div>
        <p v-if="errors.pastVisas.required" class="error">Past visa name and dates are required</p>
        <p v-if="errors.pastVisas.dates" class="error">Past visa start date can't be after end date</p>

        <button 
          @click="addPastVisa"
          class="tertiary"
          type="button">
          + Add Past Visa
        </button>

        <div class="save-changes">
          <input 
            type="submit" 
            value="Save Changes"
            class="pink"
            :style="{backgroundImage: `url(${waveV})`, backgroundSize: '110%', backgroundPosition: 'center'}">
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import alert from '@/components/Alert';
import waveV from '@/assets/patterns/wave-verticle.svg';

export default {
  components: {
    alert
  },
  data() {
    return {
      waveV,
      showAlert: false,
      to: null,
      user: this.$store.state.auth.user.profile,
      finished: false,
      newVisaAdded: false,
      currentPastVisas: null,
      errors: {
        birthday: false,
        nationality: false,
        dependants: false,
        currentVisa: {
          required: false,
          dates: false,
        },
        pastVisas: {
          required: false,
          dates: false
        } 
      },
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire/St Eustatius/Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "British overseas territories citizen",
        "British national (overseas)",
        "British overseas citizen",
        "British protected person",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Cote d'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Northern Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (Malvinas)",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hong Kong (British national overseas)",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Loas",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestinian Territory",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn Island",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint-Barthélemy",
        "Samoa",
        "San Marino",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "St Helena, Ascension and Tristan da Cunha",
        "St Kitts and Nevis",
        "St Lucia",
        "St Maarten",
        "St Martin",
        "St Vincent and The Grenadines",
        "Stateless or Refugee",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "São Tomé and Principe",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "USA",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Viet Nam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
      visas: [
        // 'None',
        // "Dependent on someone else's visa",
        // 'Family Visa',
        // 'Global Talent Visa',
        // 'Innovator Visa',
        // 'Marriage Visa',
        // 'Parent of Tier 4 Child Visa',
        // 'Standard Visitor Visa',
        // 'Startup Visa',
        // 'Tier 1 Entrepreneur Visa',
        // 'Tier 1 Exceptional Talent Visa',
        // 'Tier 1 Graduate Entrepreneur Visa',
        // 'Tier 1 Investor Visa',
        // 'Tier 2 General Work Visa',
        // 'Tier 2 Intra-company Transfer Graduate Trainee Visa',
        // 'Tier 2 Intra-company Transfer Long-term Staff Visa',
        // 'Tier 2 Minister of Religion Visa',
        // 'Tier 2 Sportsperson Visa',
        'Tier 4 Child Student',
        'Tier 4 General Student'
        // 'Tier 4 Short Term Study Visa',
        // 'Tier 5 Charity Worker Visa', 
        // 'Tier 5 Creative and Sporting Visa',
        // 'Tier 5 GOV Authorised Exchange Visa',
        // 'Tier 5 International Agreement Visa',
        // 'Tier 5 Religious Worker Visa',
        // 'Tier 5 Seasonal Worker Visa',
        // 'Tier 5 Youth Mobility Scheme'     
      ],
      dependantsList: [
        'None', 
        'Child / Children', 
        'Partner / Spouse', 
        'Elderly person'
      ]
    } 
  },
  validations: {
    profileToUpdate: {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      }
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user} 
    },
    currentVisaDatesError() {
      if(this.profileToUpdate.currentVisa.end < this.profileToUpdate.currentVisa.start) {
        return true;
      } else {
        return false;
      }
    },
    pastVisaDatesError() {
      const errors = [];
      const dates = this.profileToUpdate.pastVisas.map(({ end, start }) => [end, start]);
      // Loop through past visas array
      dates.forEach(date => {
        // If any start date is larger than end date, error is true and pushed to array
        if(date[0] < date[1]) {
          errors.push(true);
        }
      })
      // If there are any errors, return true
      if(errors.includes(true)) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validateForm() {
      this.resetErrors();
      this.$v.profileToUpdate.$touch();
      // Add errors for invalid fields
      if(!this.profileToUpdate.birthday) {
        this.errors.birthday = true;
      }
      if(!this.profileToUpdate.nationality) {
        this.errors.nationality = true;
      }
      if(!this.profileToUpdate.dependants) {
        this.errors.dependants = true;
      }
      if(Object.values(this.profileToUpdate.currentVisa).some(val => (val === null || val === ''))) {
        this.errors.currentVisa.required = true;
      }
      if(this.currentVisaDatesError) {
        this.errors.currentVisa.dates = true;
      }
      if(this.profileToUpdate.pastVisas.length) {
        const array = this.profileToUpdate.pastVisas.flatMap(({ name, start, end }) => [name, start, end]);
        if(array.some(val => (val === null || val === ''))) {
          this.errors.pastVisas.required = true;
        }
        if(this.pastVisaDatesError) {
          this.errors.pastVisas.dates = true;
        }
      }
      // If there's no past visa added and other fields complete - submit form
      if(this.profileToUpdate.birthday && this.profileToUpdate.age && this.profileToUpdate.nationality && this.profileToUpdate.dependants && !Object.values(this.profileToUpdate.currentVisa).some(val => (val === null || val === '')) && !this.errors.currentVisa.dates) {
        if(!this.profileToUpdate.pastVisas.length) {
          if(!this.$v.profileToUpdate.$invalid) {
            this.submitProfile();
          }
        } else {
          // If there is past visa(s) added, check that all fields are complete
          const array = this.profileToUpdate.pastVisas.flatMap(({ name, start, end }) => [name, start, end]);
          if(!array.some(val => (val === null || val === '')) && !this.errors.pastVisas.dates) {
            if(!this.$v.profileToUpdate.$invalid) {
              this.submitProfile();
            }
          }
        }
      }
    },
    submitProfile() {
      this.newVisaAdded = false;
      this.finished = true;
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate);
      this.$router.push({ name: 'profile', params: { username: this.profileToUpdate.username }});
    },
    resetErrors() {
      this.errors.birthday = false;
      this.errors.nationality = false;
      this.errors.dependants = false;
      this.errors.currentVisa.required = false;
      this.errors.currentVisa.dates = false;
      this.errors.pastVisas.required = false;
      this.errors.pastVisas.dates = false;
    },
    addPastVisa() {
      this.newVisaAdded = true;
      this.profileToUpdate.pastVisas.push({name: null, start: null, end: null});
    },
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
      this.age = age;
      return age;
    }
  },
  watch: {
    'profileToUpdate.birthday'(date) { 
      this.profileToUpdate.age = this.calculateAge(new Date(date));
    }
  },
  mounted() {
    if(this.profileToUpdate.pastVisas) {
      this.currentPastVisas = this.profileToUpdate.pastVisas.length;
    } else {
      this.currentPastVisas = 0;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.to) {
      next();
    } else {
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';
      document.querySelector('body').style.overflow = 'hidden';
      this.to = to;
      this.showAlert = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0;
}

.container {
  margin-top: $spacing*5;
}

h3 {
  margin-top: 4vw;
}

.field {
  &:not(:first-of-type) {
    padding-top: $spacing*2;
  }

  &.current-visa {
    padding-top: $spacing*7;
  }
}

.visa-dates {
  display: flex;
  justify-content: space-between;
}

.past-visa {
  margin-top: $spacing*7;
}

.save-changes {
  margin-top: $spacing*5;
  text-align: center;
}

.text {
  margin-top: $spacing*5;
}

.tertiary {
  font-size: 18px;
  margin-top: $spacing*3;
}
</style>
