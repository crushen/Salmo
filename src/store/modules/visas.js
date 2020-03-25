const visas = [
  // Switchable from T4 General Student
  {
    name: 'Startup Visa',
    category: 'business',
    slug: 'startup'
  },
  {
    name: 'Tier 1 Investor Visa - 5 years for PR',
    category: 'business',
    slug: 'T1-investor'
  },
  {
    name: 'Tier 1 Investor Visa - 3 years for PR',
    category: 'business',
    slug: 'T1-investor'
  },
  {
    name: 'Tier 1 Investor Visa - 2 years for PR',
    category: 'business',
    slug: 'T1-investor'
  },
  {
    name: 'Tier 2 General Work Visa',
    category: 'work',
    slug: 'T2-general-work'
  },
  {
    name: 'Tier 2 Sportsperson Visa',
    category: 'work',
    slug: 'T2-sportsperson'
  },
  {
    name: 'Tier 2 Minister of Religion Visa',
    category: 'work',
    slug: 'T2-minister-of-religion'
  },
  {
    name: 'Tier 5 GOV Authorised Exchange Visa',
    category: 'work',
    slug: 'T5-gov-authorised-exchange'
  },
  {
    name: 'Family Visa (needs expanding)',
    category: 'family',
    slug: 'family-visa'
  },
  // Not switchable
  {
    name: 'Innovator Visa',
    category: 'business',
    slug: 'innovator-visa'
  },
  {
    name: 'Global Talent Visa',
    category: 'business',
    slug: 'global-talent-visa'
  }

  // {
  //   name: 'Family Visa - Coming as an adult to be cared for by a relative route',
  //   category: 'family',
  //   slug: 'family-visa'
  // },
  // {
  //   name: 'Family Visa - Coming as a parent to join your child route',
  //   category: 'family',
  //   slug: 'family-visa'
  // },
  // {
  //   name: 'Family Visa - Coming to join your partner/spouse route',
  //   category: 'family',
  //   slug: 'family-visa'
  // },
  // {
  //   name: 'Tier 4 General Student Visa',
  //   slug: 'T4-general-student'
  // },

  // {
  //   name: 'Tier 4 Short Term Study Visa',
  //   slug: 'T4-short-term-study'
  // },
  // {
  //   name: 'Family Visa - Apply on the basis of your private life',
  //   slug: 'family-visa'
  // },

  // {
  //   name: 'Tier 5 Creative and Sporting Visa',
  //   slug: 'T5-creative-and-sporting'
  // }
]

export default {
  namespaced: true,
  state: {
    visaList: visas
  }
}
