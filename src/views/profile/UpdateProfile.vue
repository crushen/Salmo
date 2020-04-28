<template>
  <section id="update-profile">
    <router-link :to="{ name: 'profile', params: { username: user.profile.username } }">
      <img :src="arrow" class="arrow">
    </router-link>
    <div class="content">
      <h1>Edit profile.</h1>

      <div class="container">
        <input 
          v-model.trim="form.username"
          type="text"
          placeholder="Username"
          autocomplete="username"
          class="form">
          <div v-if="$v.form.username.$error">
            <span 
              v-if="!$v.form.username.minLength"
              class="help is-danger">
              Username should be at least 6 characters
            </span>
            <span 
              v-if="!$v.form.username.maxLength"
              class="help is-danger">
              Username should be no more than 10 characters
            </span>
          </div>

        <input 
          v-model="birthday"
          type="date" 
          class="form unstyled"
          required>

        <select 
          v-model="profileToUpdate.dependants"
          name="Dependants"
          class="form">
          <option
            v-for="dependant in dependants"
            :key="dependant"
            :value="dependant">
            {{ dependant }}
          </option>
        </select>

        <select 
          class="form"
          v-model="profileToUpdate.country"
          name="Country">
          <option
            v-for="country in countries"
            :key="country"
            :value="country">
            {{ country }}
          </option>
        </select>

        <select
          class="form" 
          v-model="profileToUpdate.currentVisa"
          name="Current Visa">
          <option
            v-for="visa in visas"
            :key="visa"
            :value="visa">
            {{ visa }}
          </option>
        </select>
        
        <div class="save-changes">
          <button
            @click="onSubmit"
            class="pink">
            Save Changes
          </button> 
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import arrow from '@/assets/icons/chevron-left-solid.svg';
import { minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      arrow,
      user: this.$store.state.auth.user,
      birthday: this.$store.state.auth.user.profile.birthday,
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
      dependants: [
        'None', 
        'Child / Children', 
        'Partner / Spouse', 
        'Elderly person'
      ],
      form: {
        username: this.$store.state.auth.user.profile.username
      },
      errorMsg: '',
      error: false
    } 
  },
  validations: {
    form: {
      username: {
        minLength: minLength(6),
        maxLength: maxLength(10)
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
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
        .then(() => {
          this.finished = true;
          this.$router.push({ name: 'profile', params: { username: this.user.profile.username } });
        })
    }
  },
  watch: {
    birthday(date) { 
      this.profileToUpdate.age = this.calculateAge(new Date(date));
      this.profileToUpdate.birthday = date;
    },
    'form.username'(username) {
      this.profileToUpdate.username = username;
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

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.arrow {
  width: 22px;
  position: absolute;
  top: 24px;
  left: 6vw;
}

#update-profile {
  padding: $spacing*10 0 $spacing*6;
}

.container {
  margin-top: $spacing*5;
}

.form {
  margin-top: $spacing*3;
}

.save-changes {
  margin-top: $spacing*5;
  text-align: center;
}
</style>
