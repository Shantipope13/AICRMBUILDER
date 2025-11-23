import { Industry } from '../types';

export const industries: Industry[] = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    description: 'Custom CRM for real estate agents, brokers, and property managers',
    color: 'bg-blue-400',
    examples: ['Property listings', 'Buyer/seller pipelines', 'Open house scheduling', 'Commission tracking']
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    icon: 'Dumbbell',
    description: 'All-in-one platform for gyms, studios, and personal trainers',
    color: 'bg-green-400',
    examples: ['Member management', 'Class scheduling', 'Workout plans', 'Progress tracking']
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: 'Briefcase',
    description: 'Platform for consultants, lawyers, accountants, and agencies',
    color: 'bg-purple-400',
    examples: ['Client management', 'Project tracking', 'Billing & invoicing', 'Time tracking']
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: 'Wrench',
    description: 'Business platform for contractors, plumbers, electricians, and cleaners',
    color: 'bg-orange-400',
    examples: ['Job scheduling', 'Customer tracking', 'Quote management', 'Service history']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: 'ShoppingCart',
    description: 'Complete solution for online stores and retail businesses',
    color: 'bg-pink-400',
    examples: ['Inventory management', 'Order tracking', 'Customer analytics', 'Marketing automation']
  }
];

export const industryQuestions = {
  'real-estate': [
    {
      id: 'business-model',
      question: 'What type of real estate business do you run?',
      placeholder: 'e.g., Residential sales, Commercial leasing, Property management...',
      hint: 'This helps us customize your pipeline stages and features'
    },
    {
      id: 'team-size',
      question: 'How many agents or team members do you have?',
      placeholder: 'e.g., Solo agent, 5-10 agents, 20+ team...',
      hint: 'We\'ll configure user management and collaboration features'
    },
    {
      id: 'primary-goal',
      question: 'What\'s your main business goal right now?',
      placeholder: 'e.g., Close more deals, Better lead follow-up, Automate admin tasks...',
      hint: 'This determines which features we prioritize'
    },
    {
      id: 'current-tools',
      question: 'What tools are you currently using?',
      placeholder: 'e.g., Spreadsheets, Zillow, MLS, Multiple disconnected apps...',
      hint: 'We\'ll ensure your new platform replaces or integrates with these'
    },
    {
      id: 'pain-points',
      question: 'What frustrates you most about your current system?',
      placeholder: 'e.g., Losing leads, Too manual, Can\'t track performance...',
      hint: 'We\'ll design solutions to address these specific issues'
    }
  ],
  'fitness': [
    {
      id: 'business-model',
      question: 'What type of fitness business do you operate?',
      placeholder: 'e.g., Gym, Yoga studio, Personal training, CrossFit box...',
      hint: 'This helps us customize your class and member management'
    },
    {
      id: 'team-size',
      question: 'How many trainers or staff members work with you?',
      placeholder: 'e.g., Solo trainer, 3-5 instructors, 10+ staff...',
      hint: 'We\'ll set up appropriate scheduling and permissions'
    },
    {
      id: 'primary-goal',
      question: 'What\'s your main business objective?',
      placeholder: 'e.g., Increase memberships, Improve retention, Streamline scheduling...',
      hint: 'This shapes which features we emphasize'
    },
    {
      id: 'current-tools',
      question: 'How do you currently manage your business?',
      placeholder: 'e.g., Paper logs, Mindbody, Excel, Multiple apps...',
      hint: 'We\'ll make sure to cover all these use cases'
    },
    {
      id: 'pain-points',
      question: 'What\'s the biggest challenge in running your fitness business?',
      placeholder: 'e.g., Member no-shows, Payment tracking, Communication...',
      hint: 'We\'ll build features to solve these problems'
    }
  ],
  'professional-services': [
    {
      id: 'business-model',
      question: 'What professional services do you provide?',
      placeholder: 'e.g., Consulting, Legal services, Accounting, Marketing agency...',
      hint: 'This customizes your project and client tracking'
    },
    {
      id: 'team-size',
      question: 'How large is your team?',
      placeholder: 'e.g., Solo practitioner, Small team 2-5, Growing firm 10+...',
      hint: 'We\'ll configure collaboration and delegation features'
    },
    {
      id: 'primary-goal',
      question: 'What\'s your top business priority?',
      placeholder: 'e.g., Win more clients, Improve billing, Better project delivery...',
      hint: 'This determines which modules we prioritize'
    },
    {
      id: 'current-tools',
      question: 'What tools do you use to run your practice?',
      placeholder: 'e.g., QuickBooks, Asana, Email, Spreadsheets...',
      hint: 'We\'ll ensure comprehensive coverage'
    },
    {
      id: 'pain-points',
      question: 'What slows you down the most?',
      placeholder: 'e.g., Time tracking, Client communication, Invoicing...',
      hint: 'We\'ll automate these pain points'
    }
  ],
  'home-services': [
    {
      id: 'business-model',
      question: 'What home services do you provide?',
      placeholder: 'e.g., Plumbing, Electrical, HVAC, Cleaning, Landscaping...',
      hint: 'This customizes your job types and workflows'
    },
    {
      id: 'team-size',
      question: 'How many technicians or crew members do you have?',
      placeholder: 'e.g., Just me, 2-5 techs, 10+ crew...',
      hint: 'We\'ll set up dispatch and scheduling accordingly'
    },
    {
      id: 'primary-goal',
      question: 'What\'s your main business focus?',
      placeholder: 'e.g., Book more jobs, Reduce no-shows, Faster payments...',
      hint: 'This shapes your platform features'
    },
    {
      id: 'current-tools',
      question: 'How do you manage jobs and customers now?',
      placeholder: 'e.g., Phone calls, Paper calendar, Jobber, Spreadsheets...',
      hint: 'We\'ll modernize and centralize everything'
    },
    {
      id: 'pain-points',
      question: 'What\'s your biggest operational headache?',
      placeholder: 'e.g., Scheduling conflicts, Getting paid, Customer follow-up...',
      hint: 'We\'ll automate solutions for these issues'
    }
  ],
  'ecommerce': [
    {
      id: 'business-model',
      question: 'What type of e-commerce business do you run?',
      placeholder: 'e.g., Dropshipping, Retail store, Wholesale, Handmade products...',
      hint: 'This customizes inventory and order management'
    },
    {
      id: 'team-size',
      question: 'How many people work on your store?',
      placeholder: 'e.g., Solo entrepreneur, Small team, Growing operation...',
      hint: 'We\'ll configure appropriate access levels'
    },
    {
      id: 'primary-goal',
      question: 'What\'s your main e-commerce objective?',
      placeholder: 'e.g., Increase sales, Better inventory control, Improve retention...',
      hint: 'This determines which analytics and tools we emphasize'
    },
    {
      id: 'current-tools',
      question: 'What platforms and tools do you use?',
      placeholder: 'e.g., Shopify, WooCommerce, Mailchimp, Google Sheets...',
      hint: 'We\'ll ensure we cover all your needs'
    },
    {
      id: 'pain-points',
      question: 'What\'s the hardest part of running your store?',
      placeholder: 'e.g., Inventory tracking, Customer service, Marketing...',
      hint: 'We\'ll build features to address these challenges'
    }
  ]
};
