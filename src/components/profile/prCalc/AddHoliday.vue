<template>
  <div v-on-clickaway="closeModal" class="modal">
    <h3>Add a new holiday</h3>

    <div class="field">
      <label for="location">Location</label>
      <select 
        class="form"
        v-model="form.location"
        name="Location"
        id="location">
        <option
          v-for="country in countries"
          :key="country"
          :value="country">
          {{ country }}
        </option>
      </select>
      <div v-if="$v.form.location.$error">
        <p v-if="!$v.form.location.required" class="error">Location is required</p>
      </div>
    </div>

    <div class="row">
      <div class="field">
        <label for="start" class="form-label">Start</label>
        <input 
          v-model="form.start"
          type="date"
          id="start"
          class="form unstyled">
      </div>

      <div class="field">
        <label for="end" class="form-label">End</label>
        <input 
          v-model="form.end"
          type="date"
          id="end"
          class="form unstyled">
      </div>
    </div>
    <p v-if="errors.dates" class="error">Start date can't be after end date</p>
    <p v-if="errors.start" class="error">Start date is required</p>
    <p v-if="errors.end" class="error">End date is required</p>

    <div class="close">
      <button 
        @click="validateForm"
        class="secondary">
        Save Holiday
      </button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  data() {
    return {
      form: {
        location: '',
        start: '',
        end: '',
        days: null
      },
      errors: {
        start: false,
        end: false,
        dates: false
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
      ]
    }
  },
  validations: {
    form: {
      location: {
        required
      },
      start: {
        required
      },
      end: {
        required
      }
    }
  },
  computed: {
    datesError() {
      if(this.form.end < this.form.start) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
      const overlay = document.querySelector('#overlay');
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
    },
    resetErrors() {
      this.errors.dates = false;
      this.errors.start = false;
      this.errors.end = false;
    },
    calculateDays(start, end) {
      const dt1 = new Date(start);
      const dt2 = new Date(end);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    },
    validateForm() {
      this.resetErrors();
      this.$v.form.$touch();
      // Add errors for invalid fields
      if(this.datesError) {
        this.errors.dates = true;
      }
      if(!this.form.start) {
        this.errors.start = true;
      }
      if(!this.form.end) {
        this.errors.end = true;
      }
      // If no errors, add holiday to db
      if(!this.$v.form.$invalid && !this.errors.dates && !this.errors.start && !this.errors.end) {
        // get number of days first
        this.form.days = this.calculateDays(this.form.start, this.form.end);
        this.$store.dispatch('prCalc/addHoliday', this.form)
        .then(() => {
          this.closeModal();
          this.$emit('addHoliday');
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.open {
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -$spacing*2;
  right: -$spacing*2;
  background: $primary-pink;
  color: $light-font;

  .icon {
    width: 28px;
  }
}

.modal {
  width: 90%;
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 40;
  padding: $spacing*3;
  background: $background;
  color: $dark-font;
  text-align: left;
  border-radius: $border-radius;

  h3 {
    margin-bottom: 8vw;
    text-align: center;
  }
 
  .close {
    margin-top: 8vw;
    text-align: center;

    button {
      color: $primary-pink;
      font-size: 18px;
    }
  }
}

.row {
  display: flex;
  justify-content: space-between;
  margin-top: $spacing*2;

  .field {
    width: 48%;
  }
}

// Tablet
@media screen and (min-width: 600px) {
  .modal {
    width: 75%;
    margin-left: 50px;
    padding: $spacing*4 $spacing*6;

    h3 {
      margin-bottom: $spacing*6;
    }
  
    .close {
      margin-top: $spacing*6;
    }
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  .modal {
    width: 60%;
    margin-left: 50px;
    padding: $spacing*3 $spacing*10;

    h3 {
      margin-bottom: $spacing*8;
    }
  
    .close {
      margin-top: $spacing*8;
    }
  }
}
</style>
