const visas = [
  {
    name: 'Tier 5 Creative and Sporting',
    category: 'work',
    slug: 'T5-creative-and-sporting'
  },
  {
    name: 'Tier 5 Government Authorised Exchange',
    category: 'work',
    slug: 'T5-gov-authorised-exchange'
  },
  {
    name: 'Tier 2 Intra-company Transfer',
    category: 'work',
    slug: 'T2-intra-company-transfer'
  },
  {
    name: 'Family (needs expanding)',
    category: 'family',
    slug: 'family'
  },
  {
    name: 'Global Talent',
    category: 'business',
    slug: 'global-talent'
  },
  {
    name: 'Innovator',
    category: 'business',
    slug: 'innovator'
  },
  {
    name: 'Startup',
    category: 'business',
    slug: 'startup',
    card: {
      subTitle: 'Great for individuals who wish to start their own business in the UK.',
      checklist: [
        { name: 'Switch', status: false },
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Dependants', status: true },
        { name: 'Extend', status: false },
        { name: 'Study', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 1 Investor',
    category: 'business',
    slug: 'T1-investor',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: true },
        { name: 'Extend', status: true }
        
      ]
    }
  },
  {
    name: 'Tier 2 General Work',
    category: 'work',
    slug: 'T2-general-work'
  },
  {
    name: 'Tier 2 Minister of Religion',
    category: 'work',
    slug: 'T2-minister-of-religion'
  },
  {
    name: 'Tier 2 Sportsperson',
    category: 'work',
    slug: 'T2-sportsperson'
  },
  {
    name: 'Tier 4 General Student',
    category: 'study',
    slug: 'T4-general-student',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 4 Short Term Study',
    category: 'study',
    slug: 'T4-short-term-study',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Charity Worker',
    category: 'work',
    slug: 'T5-charity-worker'
  },
  {
    name: 'Tier 5 International Agreement',
    category: 'work',
    slug: 'T5-international-agreement'
  },
  {
    name: 'Tier 5 Religious Worker',
    category: 'work',
    slug: 'T5-religious-worker'
  },
  {
    name: 'Tier 5 Seasonal Worker',
    category: 'work',
    slug: 'T5-seasonal-worker'
  },
  {
    name: 'Tier 5 Youth Mobility Scheme',
    category: 'youth-mobility',
    slug: 'youth-mobility-scheme'
  },
  {
    name: 'Tier 4 Child Student',
    category: 'child',
    slug: 'T4-child-student',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  }
]

export default {
  namespaced: true,
  state: {
    visaList: visas
  }
}
