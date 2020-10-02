<template>
  <section class="content">
    <h1>Complete your profile</h1>

    <FormulateForm @submit="submitForm">
      <FormulateInput
        v-model="form.name"
        type="text"
        label="full name"
        validation="required" />

      <FormulateInput
        v-model="form.birthday"
        type="date"
        label="birthday"
        validation="bail|required|date" />

      <FormulateInput
        v-model="form.nationality"
        type="select"
        :options="makeOptions(countries)"
        label="nationality"
        validation="required"
        placeholder="Select an option" />

      <FormulateInput
        v-model="form.currentVisa.name"
        type="select"
        :options="makeOptions(visas)"
        label="current visa"
        validation="required"
        placeholder="Select an option" />

      <FormulateInput
        v-model="form.currentVisa.start"
        type="date"
        label="start"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value < form.currentVisa.end}"
        :validation-messages="{customDate: 'Start date must be before end date'}"
        error-behavior="submit" />

      <FormulateInput
        v-model="form.currentVisa.end"
        type="date"
        label="end"
        validation="bail|required|date|customDate"
        :validation-rules="{customDate: ({ value }) => value > form.currentVisa.start}"
        :validation-messages="{customDate: 'End date must be after start date'}"
        error-behavior="submit" />

      <FormulateInput
        v-model="form.dependants"
        type="radio"
        :options="{yes: 'yes', no: 'no'}"
        label="do you have dependants?"
        validation="required" />

      <FormulateInput
        type="submit"
        label="Next"/>
    </FormulateForm>
  </section>
</template>

<script>
export default {
  props: { form: { type: Object, required: true } },
  data() {
    return {
      user: this.$store.state.auth.user,
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
      ]
    }
  },
  watch: {
    'form.birthday'(date) { 
      this.form.age = this.calculateAge(new Date(date))
    }
  },
  computed: {
    profileToUpdate() { 
      return {...this.user.profile} 
    }
    // pastVisaDatesError() {
    //   const errors = []
    //   const dates = this.form.pastVisas.map(({ end, start }) => [end, start])
    //   // Loop through past visas array
    //   dates.forEach(date => {
    //     // If any start date is larger than end date, error is true and pushed to array
    //     if(date[0] < date[1]) {
    //       errors.push(true)
    //     }
    //   })
    //   // If there are any errors, return true
    //   if(errors.includes(true)) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  methods: {
    makeOptions(array) {
      return Object.assign({}, ...array.map(key => ({[key]: key})))
    },
    calculateAge(date) {
      let today = new Date(),
          birthDate = new Date(date),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age-- }
      this.age = age

      return age
    },
    submitForm() {
      this.profileToUpdate.name = this.form.name
      this.profileToUpdate.birthday = this.form.birthday
      this.profileToUpdate.age = this.form.age
      this.profileToUpdate.nationality = this.form.nationality
      this.profileToUpdate.dependants = this.form.dependants
      this.profileToUpdate.currentVisa = this.form.currentVisa

      this.$store.commit('auth/setUserProfile', this.profileToUpdate)
      this.$emit('nextStage')

      window.scrollTo(0, 0)
    }
    // validateForm() {
    //   this.resetErrors()

    //   if(this.form.pastVisas.length) {
    //     const array = this.form.pastVisas.flatMap(({ name, start, end }) => [name, start, end]);
    //     if(array.some(val => (val === null || val === ''))) {
    //       this.errors.pastVisas.required = true
    //     }
    //     if(this.pastVisaDatesError) {
    //       this.errors.pastVisas.dates = true
    //     }
    //   }

    //   // If there's no past visa added and other fields complete - submit form
    //   if(this.form.birthday && this.form.age && this.form.nationality && this.form.dependants && !Object.values(this.form.currentVisa).some(val => (val === null || val === '')) && !this.errors.currentVisa.dates) {
    //     if(!this.form.pastVisas.length) {
    //       this.submitProfile()
    //     } else {
    //       // If there is past visa(s) added, check that all fields are complete
    //       const array = this.form.pastVisas.flatMap(({ name, start, end }) => [name, start, end]);
    //       if(!array.some(val => (val === null || val === '')) && !this.errors.pastVisas.dates) {
    //         this.submitProfile()
    //       }
    //     }
    //   }
    // }
  }
}
</script>
