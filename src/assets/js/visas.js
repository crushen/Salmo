export const visas = [
  {
    name: 'Tier 5 Creative and Sporting',
    category: 'work',
    slug: 'T5-creative-and-sporting',
    card: {
      subTitle: 'Great for individuals with a temporary job in a creative or sporting field.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Government Authorised Exchange',
    category: 'work',
    slug: 'T5-gov-authorised-exchange',
    card: {
      subTitle: 'Perfect for individuals coming to the UK as part of their work experience.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 2 Intra-company Transfer',
    category: 'work',
    slug: 'T2-intra-company-transfer',
    card: {
      subTitle: 'Awesome for individuals who are being transferred to a UK branch.',
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
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Family (needs expanding)',
    category: 'family',
    slug: 'family',
    card: {
      subTitle: 'Needs expanding.',
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
        { name: 'Extend', status: true },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Global Talent',
    category: 'business',
    slug: 'global-talent',
    card: {
      subTitle: 'Great for individuals who are top in their field of work.',
      quickTip: `
        <p>If you're a scientist researching coronavirus (COVID-19) you can get a visa using the <b>UKRI funding option</b>.</p>
        <p style="margin-top: 16px;">This comes with the standard UKRI rules plus these two temporary exceptions:</p>
        <ul style="list-style-position: inside;">
          <li style="margin-top: 16px;">Your grant can be for just 1 year instead of the usual 2</li>
          <li style="margin-top: 16px;">Your employment contract or hosting agreement can be 1 year instead of 2</li>
        </ul>
        <p style="margin-top: 16px;">These new exceptions are in place till 31 January 2021, but could be extended.</p>
      `,
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Innovator',
    category: 'business',
    slug: 'innovator',
    card: {
      subTitle: 'Amazing for individuals looking to bring a new business concept to the UK.',
      quickTip: `
        <p>The more you can invest in the UK, the quicker you can achieve permanent residency:</p>
        <ul style="list-style-position: inside;">
          <li style="margin-top: 16px;">with £2 million, you will gain permanent residency in 5 years</li>
          <li style="margin-top: 16px;">with £5 million, you will gain permanent residency in 3 years</li>
          <li style="margin-top: 16px;">with £10 million, you will gain permanent residency in 2 years</li>
        </ul>
      `,
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Startup',
    category: 'business',
    slug: 'startup',
    card: {
      subTitle: 'Perfect for individuals looking to start a UK based business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Extend', status: false },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 1 Investor',
    category: 'business',
    slug: 'T1-investor',
    card: {
      subTitle: 'Awesome for individuals looking to invest in UK business.',
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
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true } 
      ]
    }
  },
  {
    name: 'Tier 2 General Work',
    category: 'work',
    slug: 'T2-general-work',
    card: {
      subTitle: 'Great for individuals with a job offer in the UK.',
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
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 2 Minister of Religion',
    category: 'work',
    slug: 'T2-minister-of-religion',
    card: {
      subTitle: 'Amazing for individuals who want to work in their religion.',
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
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 2 Sportsperson',
    category: 'work',
    slug: 'T2-sportsperson',
    card: {
      subTitle: 'Perfect for individuals looking to work in a sports based career.',
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
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 4 General Student',
    category: 'study',
    slug: 'T4-general-student',
    card: {
      subTitle: 'Perfect for individuals looking to study a subject.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: 'maybe' },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 4 Short Term Study',
    category: 'study',
    slug: 'T4-short-term-study',
    card: {
      subTitle: 'Great for individuals looking to take part in a short course.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: 'maybe' },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: false }
      ]
    }
  },
  {
    name: 'Tier 5 Charity Worker',
    category: 'work',
    slug: 'T5-charity-worker',
    card: {
      subTitle: 'Great for individuals coming to take part in charity work from the UK.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: false },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 International Agreement',
    category: 'work',
    slug: 'T5-international-agreement',
    card: {
      subTitle: 'Amazing for individuals coming to the UK to provide a service under international law.',
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
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Religious Worker',
    category: 'work',
    slug: 'T5-religious-worker',
    card: {
      subTitle: 'Awesome for individuals looking to work in their religion in the UK.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Seasonal Worker',
    category: 'work',
    slug: 'T5-seasonal-worker',
    card: {
      subTitle: 'Perfect for individuals who are here to work in a temporary seasonal job in horticulture.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Study', status: false },
        { name: 'Extend', status: false },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: false }
      ]
    }
  },
  {
    name: 'Tier 5 Youth Mobility Scheme',
    category: 'youth-mobility',
    slug: 'youth-mobility-scheme',
    card: {
      subTitle: 'Awesome for individuals who wish to experience UK life.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Study', status: true },
        { name: 'Extend', status: false },
        { name: 'Switch', status: false },
        { name: 'Dependants', status: false }
      ]
    }
  },
  {
    name: 'Tier 4 Child Student',
    category: 'child',
    slug: 'T4-child-student',
    card: {
      subTitle: 'Amazing for individuals under 18 to study in the UK.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: 'maybe' },
        { name: 'Study', status: true },
        { name: 'Extend', status: true },
        { name: 'Switch', status: true },
        { name: 'Dependants', status: false }
      ]
    }
  }
]
