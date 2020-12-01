export const questions = [
  // ADULT
  {
    question: 'Why do you want to live in the UK?',
    number: 0,
    answers: [
      {
        label: 'Work',
        value: 1
      },
      {
        label: 'Business',
        value: 5
      },
      {
        label: 'Family',
        value: 'Family'
        // value: 11
      },
      {
        label: 'Study',
        value: 6
      }
    ]
  },
  // WORK
  {
    question: 'Does your job relate to sport or religion?',
    number: 1,
    answers: [
      {
        label: 'Sports',
        value: ['Tier 2 : Sportsperson', 'Tier 5 : Creative and Sporting']
      },
      {
        label: 'Religion',
        value: ['Tier 2 : Minister of Religion', 'Tier 5 : Religious Worker']
      },
      {
        label: 'No',
        value: 2
      }
    ]
  },
  {
    question: 'Is your job part of an approved government authorised exchange scheme?',
    number: 2,
    answers: [
      {
        label: 'Yes',
        value: 'Tier 5 : Government Authorised Exchange'
      },
      {
        label: 'No',
        value: 3
      }
    ]
  },
  {
    question: 'Has your international employer offered you in a position in the UK branch of your workplace?',
    number: 3,
    answers: [
      {
        label: 'Yes',
        value: 'Tier 2 : Intra-company Transfer'
      },
      {
        label: 'No',
        value: 4
      }
    ]
  },
  {
    question: 'Which one of these best describes your work?',
    number: 4,
    answers: [
      {
        label: 'Health / Medical',
        value: 'Tier 2 : Health and Care'
      },
      {
        label: 'Charity',
        value: 'Tier 5 : Charity Worker'
      },
      {
        label: 'Sporty / Creative',
        value: 'Tier 5 : Creative and Sporting'
      },
      {
        label: 'Seasonal',
        value: 'Tier 5 : Seasonal Worker'
      },
      {
        label: 'Other',
        value: 'Tier 2 : General Work'
      }
    ]
  },
  // BUSINESS
  {
    question: 'Which one of these best describes your future business plans?',
    number: 5,
    answers: [
      {
        label: 'Start a business',
        value: ['Tier 1 : Startup', 'Tier 1 : Innovator']
      },
      {
        label: 'Invest in a business',
        value: 'Tier 1 : Investor'
      },
      {
        label: 'Endorsed as an exceptional talent',
        value: 'Tier 1 : Global Talent'
      }
    ]
  },
  // STUDY
  {
    question: 'How long is your course?',
    number: 6,
    answers: [
      {
        label: '6 months or less',
        value: 'Tier 4 : Short Term Study'
      },
      {
        label: 'More than 6 months',
        value: 7
      }
    ]
  },
  {
    question: 'Are you studying an English Language course?',
    number: 7,
    answers: [
      {
        label: 'Yes',
        value: ['Tier 4 : Short Term Study', 'Tier 4 : Student']
      },
      {
        label: 'No',
        value: 'Tier 4 : Student'
      }
    ]
  }
]
