<template>
  <div>
    <section class="content">
      <h1>Complete profile.</h1>
      <h3>Before you can take your first quiz, you'll need to complete your profile.</h3>

      <form 
        @submit.prevent="onSubmit"
        class="container">
        <div class="field">
          <label for="dob" class="form-label">Birthday</label>
          <input 
            v-model="form.birthday"
            type="date" 
            placeholder="Birthday"
            id="dob"
            class="form unstyled"
            required>
          <div v-if="$v.form.birthday.$error">
            <span v-if="!$v.form.birthday.required">
              Birthday is required
            </span>
          </div>
        </div>

        <div class="field">
          <label for="dependants">Dependants</label>
          <select 
            v-model="form.dependants"
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
          <div v-if="$v.form.dependants.$error">
            <span v-if="!$v.form.dependants.required">
              Dependants is required
            </span>
          </div>
        </div>

        <div class="field">
          <label for="nationality">Nationality</label>
          <select 
            class="form"
            v-model="form.nationality"
            name="Nationality"
            id="nationality">
            <option
              v-for="country in countries"
              :key="country"
              :value="country">
              {{ country }}
            </option>
          </select>
          <div v-if="$v.form.nationality.$error">
            <span v-if="!$v.form.nationality.required">
              Nationality is required
            </span>
          </div>
        </div>

        <div class="field current-visa">
          <label for="current-visa">Current visa</label>
          <select
            class="form" 
            v-model="form.currentVisa.name"
            name="Current Visa"
            id="current-visa">
            <option
              v-for="visa in visas"
              :key="visa"
              :value="visa">
              {{ visa }}
            </option>
          </select>
          <div v-if="$v.form.currentVisa.name.$error">
            <span v-if="!$v.form.currentVisa.name.required">
              Current Visa is required
            </span>
          </div>
        </div>

        <div class="field visa-dates">
          <div>
            <label for="current-start" class="form-label">Start date</label>
            <input 
              v-model="form.currentVisa.start"
              type="date"
              id="current-start"
              class="form unstyled"
              required>
            <div v-if="$v.form.currentVisa.start.$error">
              <span v-if="!$v.form.currentVisa.start.required">
                Start date is required
              </span>
            </div>
          </div>

          <div>
            <label for="current-end" class="form-label">End date</label>
            <input 
              v-model="form.currentVisa.end"
              type="date"
              id="current-end"
              class="form unstyled"
              required>
            <div v-if="$v.form.currentVisa.end.$error">
              <span v-if="!$v.form.currentVisa.end.required">
                End date is required
              </span>
            </div>
          </div>
        </div>

        <div class="save-changes">
          <input 
            type="submit" 
            value="Save Changes"
            class="pink">
        
          <p>Once you've completed your profile, you'll also gain access to other features such as your personalised quiz and your own Visa Stats and Facts page.</p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import arrow from '@/assets/icons/chevron-left-solid.svg';

export default {
  data() {
    return {
      arrow,
      user: this.$store.state.auth.user,
      form: {
        birthday: null,
        age: null,
        nationality: null,
        dependants: null,
        currentVisa: {
          name: null,
          start: null,
          end: null
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
      ],
      errorMsg: '',
      error: false
    } 
  },
  validations: {
    form: {
      birthday: {
        required
      },
      dependants: {
        required
      },
      nationality: {
        required
      },
      currentVisa: {
        name: {
          required
        },
        start: {
          required
        },
        end: {
          required
        }
      }
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
  },
  methods: {
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
      this.age = age;
      return age;
    },
    onSubmit() {
      this.$v.form.$touch();
      if(!this.$v.form.$invalid) {
        this.submitProfile();
      }
    },
    submitProfile() {
      this.profileToUpdate.age = this.form.age;
      this.profileToUpdate.birthday = this.form.birthday;
      this.profileToUpdate.nationality = this.form.nationality;
      this.profileToUpdate.dependants = this.form.dependants;
      this.profileToUpdate.currentVisa = this.form.currentVisa;
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate);
      window.scrollTo(0, 0);
      // Need to figure out how to wait to scroll until profile has been updated
    }
  },
  watch: {
    'form.birthday'(date) { 
      this.form.age = this.calculateAge(new Date(date));
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

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

  &:nth-of-type(4) {
    padding-top: $spacing*7;
  }
}

.visa-dates {
  display: flex;
  justify-content: space-between;
}

.save-changes {
  margin-top: $spacing*5;
  text-align: center;

  p {
    text-align: left;
    margin-top: $spacing*5;
  }
}
</style>
