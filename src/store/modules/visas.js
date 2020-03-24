const visas = [
  {
    name: 'Tier 4 General Student Visa',
    slug: 'T4-general-student'
  },
  {
    name: 'Tier 2 General Work Visa',
    slug: 'T2-general-work'
  },
  {
    name: 'Tier 4 Short Term Study Visa',
    slug: 'T4-short-term-study'
  },
  {
    name: 'Family Visa - Apply on the basis of your private life',
    slug: 'family-visa'
  },
  {
    name: 'Tier 2 Sportsperson Visa',
    slug: 'T2-sportsperson'
  },
  {
    name: 'Tier 5 Creative and Sporting Visa',
    slug: 'T5-creative-and-sporting'
  }
]

export default {
  namespaced: true,
  state: {
    visaList: visas
  }
}
