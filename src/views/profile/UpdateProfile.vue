<template>
  <section>
    <div v-if="questionNumber === 1">
      <label>What is your country of origin?</label> 
      <select 
        v-model="profileToUpdate.country"
        name="Country">
        <option
          v-for="country in countries"
          :key="country"
          :value="country">
          {{ country }}
        </option>
      </select>
      <button
        @click="next">
        Next
      </button> 
    </div>

    <div v-if="questionNumber === 2">
      <label>What is your date of birth?</label> 
      <div class="date-picker">
        <v-date-picker
          :max-date="maxDate"
          v-model="date" />
      </div>
      <button
        @click="prev">
        Previous
      </button> 
      <button
        @click="next">
        Next
      </button> 
    </div>

    <div v-if="questionNumber === 3">
      <label>Do you currently have a UK visa?</label> 
      <select 
        v-model="profileToUpdate.currentVisa"
        name="Current Visa">
        <option
          v-for="visa in visas"
          :key="visa"
          :value="visa">
          {{ visa }}
        </option>
      </select>
      <button
        @click="prev">
        Previous
      </button>
      <!-- If user is 18 or over, go to Dependants question. Else, sumbit profile -->
      <button
        v-if="age >= 18"
        @click="next">
        Next
      </button>
      <button
        v-else
        @click="submitProfile">
        Update Profile
      </button> 
    </div>

    <div v-if="age >= 18 && questionNumber === 4">
      <label>Do you have any dependants?</label> 
      <select 
        v-model="profileToUpdate.dependants"
        name="Dependants">
        <option
          v-for="dependant in dependants"
          :key="dependant"
          :value="dependant">
          {{ dependant }}
        </option>
      </select>
      <button
        @click="prev">
        Previous
      </button> 
      <button
        @click="submitProfile">
        Update Profile
      </button> 
    </div>

    <router-link
    tag="button"
     :to="{ name: 'user-info', params: { uid: user.uid } }">
      Back To Profile
    </router-link> 
  </section>
</template>

<script>

export default {
  data() {
    return {
      user: this.$store.state.auth.user,
      questionNumber: 1,
      date: new Date(),
      age: null,
      finished: false,
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
        'None',
        "Dependent on someone else's visa",
        'Family Visa',
        'Global Talent Visa',
        'Innovator Visa',
        'Marriage Visa',
        'Parent of Tier 4 Child Visa',
        'Standard Visitor Visa',
        'Startup Visa',
        'Tier 1 Entrepreneur Visa',
        'Tier 1 Exceptional Talent Visa',
        'Tier 1 Graduate Entrepreneur Visa',
        'Tier 1 Investor Visa',
        'Tier 2 General Work Visa',
        'Tier 2 Intra-company Transfer Graduate Trainee Visa',
        'Tier 2 Intra-company Transfer Long-term Staff Visa',
        'Tier 2 Minister of Religion Visa',
        'Tier 2 Sportsperson Visa',
        'Tier 4 Child Student Visa',
        'Tier 4 General Student Visa',
        'Tier 4 Short Term Study Visa',
        'Tier 5 Charity Worker Visa', 
        'Tier 5 Creative and Sporting Visa',
        'Tier 5 GOV Authorised Exchange Visa',
        'Tier 5 International Agreement Visa',
        'Tier 5 Religious Worker Visa',
        'Tier 5 Seasonal Worker Visa',
        'Tier 5 Youth Mobility Scheme'     
      ],
      dependants: [
        'None', 
        'Child / Children', 
        'Partner / Spouse', 
        'Elderly person'
      ]
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    },
    maxDate() {
      const underFourYears = new Date();
      underFourYears.setFullYear(underFourYears.getFullYear() - 4);
      return underFourYears;
    }
  },
  methods: {
    next() {
      this.questionNumber++;
    },
    prev() {
      this.questionNumber--;
    },
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
      this.age = age;
      return age;
    },
    submitProfile() {
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
        .then(() => {
          this.finished = true;
          this.$router.push({ name: 'user-info', params: { uid: this.user.uid } });
        })
    }
  },
  watch: {
    date(newDate, oldDate) {
      this.profileToUpdate.age = this.calculateAge(newDate);
      this.profileToUpdate.birthday = newDate;
    },
    age(age) {
      if(age < 18) {
        this.profileToUpdate.dependants = 'None';
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if(this.finished) {
      next();
    } else {
      const confirmLeave = confirm('Are you sure? Your progress will be lost');
      if(confirmLeave) {
        next();
      }
    }

  }
}
</script>
