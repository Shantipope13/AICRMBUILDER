import { IndustryType } from '../types';

interface Contact {
  name: string;
  email: string;
  company: string;
  stage: string;
}

interface Deal {
  title: string;
  company: string;
  value: number;
  daysUntilClose: number;
}

export const industryDemoData: Record<IndustryType, { contacts: Contact[]; deals: Deal[] }> = {
  'real-estate': {
    contacts: [
      { name: 'Sarah Martinez', email: 'sarah.m@email.com', company: '42 Oak Street', stage: 'Showing Scheduled' },
      { name: 'James Chen', email: 'jchen@email.com', company: '156 Maple Ave', stage: 'Offer Made' },
      { name: 'Emily Rodriguez', email: 'emily.r@email.com', company: '89 Pine Road', stage: 'Under Contract' },
      { name: 'Michael Thompson', email: 'mthompson@email.com', company: '23 Birch Lane', stage: 'New Lead' }
    ],
    deals: [
      { title: '42 Oak Street', company: '3BR/2BA Colonial', value: 425, daysUntilClose: 12 },
      { title: '156 Maple Ave', company: '4BR/3BA Modern', value: 689, daysUntilClose: 8 },
      { title: '89 Pine Road', company: '2BR/2BA Condo', value: 310, daysUntilClose: 21 }
    ]
  },
  'fitness': {
    contacts: [
      { name: 'Alex Rivera', email: 'alex.r@email.com', company: 'Gold Membership', stage: 'Active Member' },
      { name: 'Jordan Lee', email: 'jordan.l@email.com', company: 'Trial Pass', stage: 'Trial Completed' },
      { name: 'Taylor Brown', email: 'taylor.b@email.com', company: 'Platinum Membership', stage: 'Active Member' },
      { name: 'Casey Williams', email: 'casey.w@email.com', company: 'Trial Scheduled', stage: 'Trial Scheduled' }
    ],
    deals: [
      { title: 'Annual Gold Membership', company: 'Alex Rivera', value: 89, daysUntilClose: 5 },
      { title: 'Monthly Platinum', company: 'Taylor Brown', value: 129, daysUntilClose: 3 },
      { title: 'Trial Conversion', company: 'Jordan Lee', value: 49, daysUntilClose: 2 }
    ]
  },
  'professional-services': {
    contacts: [
      { name: 'David Park', email: 'david.p@techcorp.com', company: 'TechCorp Inc', stage: 'Proposal' },
      { name: 'Lisa Anderson', email: 'l.anderson@startup.io', company: 'StartupIO', stage: 'Negotiation' },
      { name: 'Robert Kim', email: 'robert@enterprise.com', company: 'Enterprise LLC', stage: 'Contract Sent' },
      { name: 'Maria Garcia', email: 'maria@consulting.com', company: 'Consulting Group', stage: 'Consultation' }
    ],
    deals: [
      { title: 'Q4 Strategy Project', company: 'TechCorp Inc', value: 45, daysUntilClose: 15 },
      { title: 'Implementation Services', company: 'StartupIO', value: 28, daysUntilClose: 22 },
      { title: 'Annual Retainer', company: 'Enterprise LLC', value: 120, daysUntilClose: 8 }
    ]
  },
  'home-services': {
    contacts: [
      { name: 'Jennifer Walsh', email: 'j.walsh@email.com', company: '789 Elm Street', stage: 'Job Scheduled' },
      { name: 'Brian Foster', email: 'brian.f@email.com', company: '321 Cedar Ave', stage: 'Quote Sent' },
      { name: 'Amanda Clark', email: 'amanda.c@email.com', company: '567 Willow Dr', stage: 'Completed' },
      { name: 'Kevin Moore', email: 'kevin.m@email.com', company: '890 Spruce Ln', stage: 'New Inquiry' }
    ],
    deals: [
      { title: 'Kitchen Plumbing Repair', company: '789 Elm Street', value: 3, daysUntilClose: 2 },
      { title: 'HVAC Installation', company: '321 Cedar Ave', value: 8, daysUntilClose: 7 },
      { title: 'Bathroom Renovation', company: '567 Willow Dr', value: 12, daysUntilClose: 14 }
    ]
  },
  'ecommerce': {
    contacts: [
      { name: 'Sophie Martin', email: 'sophie.m@email.com', company: 'Order #8421', stage: 'Delivered' },
      { name: 'Daniel Lee', email: 'daniel.l@email.com', company: 'Order #8422', stage: 'Processing' },
      { name: 'Rachel Green', email: 'rachel.g@email.com', company: 'Abandoned Cart', stage: 'Cart Abandoned' },
      { name: 'Chris Evans', email: 'chris.e@email.com', company: 'Order #8423', stage: 'Shipped' }
    ],
    deals: [
      { title: 'Premium Product Bundle', company: 'Sophie Martin', value: 2, daysUntilClose: 1 },
      { title: 'Subscription Renewal', company: 'Daniel Lee', value: 1, daysUntilClose: 3 },
      { title: 'Abandoned Cart Recovery', company: 'Rachel Green', value: 3, daysUntilClose: 1 }
    ]
  }
};

export function getDemoDataForIndustry(industry: IndustryType) {
  return industryDemoData[industry] || industryDemoData['real-estate'];
}
