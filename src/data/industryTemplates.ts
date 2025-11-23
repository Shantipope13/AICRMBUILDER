import { CRMField, PipelineStage, EmailTemplate, Automation, DashboardWidget } from '../types';
import { IndustryType } from '../types';

interface IndustryTemplate {
  crmFields: CRMField[];
  pipelineStages: PipelineStage[];
  emailTemplates: EmailTemplate[];
  automations: Automation[];
  dashboardWidgets: DashboardWidget[];
}

export const industryTemplates: Record<IndustryType, IndustryTemplate> = {
  'real-estate': {
    crmFields: [
      { id: 'name', name: 'Full Name', type: 'text', required: true },
      { id: 'email', name: 'Email Address', type: 'email', required: true },
      { id: 'phone', name: 'Phone Number', type: 'phone', required: true },
      { id: 'property-type', name: 'Property Type', type: 'select', required: false, options: ['Residential', 'Commercial', 'Land', 'Multi-Family'] },
      { id: 'budget', name: 'Budget Range', type: 'text', required: false },
      { id: 'location', name: 'Preferred Location', type: 'text', required: false },
      { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: false },
      { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: false },
      { id: 'sqft', name: 'Square Footage', type: 'number', required: false },
      { id: 'move-date', name: 'Target Move Date', type: 'date', required: false },
      { id: 'pre-approved', name: 'Pre-Approved', type: 'select', required: false, options: ['Yes', 'No', 'In Progress'] },
      { id: 'buyer-seller', name: 'Type', type: 'select', required: true, options: ['Buyer', 'Seller', 'Both'] }
    ],
    pipelineStages: [
      { id: 'new-lead', name: 'New Lead', color: 'bg-gray-300', order: 1 },
      { id: 'contacted', name: 'Contacted', color: 'bg-blue-300', order: 2 },
      { id: 'showing-scheduled', name: 'Showing Scheduled', color: 'bg-yellow-300', order: 3 },
      { id: 'offer-made', name: 'Offer Made', color: 'bg-orange-300', order: 4 },
      { id: 'under-contract', name: 'Under Contract', color: 'bg-purple-300', order: 5 },
      { id: 'closed-won', name: 'Closed Won', color: 'bg-green-400', order: 6 },
      { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-300', order: 7 }
    ],
    emailTemplates: [
      {
        id: 'welcome',
        name: 'Welcome Email - New Lead',
        subject: 'Welcome! Let\'s Find Your Dream Home',
        body: 'Hi {{name}},\n\nThank you for reaching out! I\'m excited to help you find the perfect property. I noticed you\'re looking for {{property-type}} in {{location}}.\n\nLet\'s schedule a quick call to discuss your needs in detail.\n\nBest regards,\n{{agent-name}}',
        trigger: 'New lead created'
      },
      {
        id: 'showing-reminder',
        name: 'Showing Reminder',
        subject: 'Reminder: Property Showing Tomorrow',
        body: 'Hi {{name}},\n\nThis is a friendly reminder about your property showing tomorrow at {{showing-time}}.\n\nAddress: {{property-address}}\n\nSee you there!\n\n{{agent-name}}',
        trigger: '24 hours before showing'
      },
      {
        id: 'follow-up',
        name: 'Post-Showing Follow Up',
        subject: 'What did you think of {{property-address}}?',
        body: 'Hi {{name}},\n\nI hope you enjoyed viewing the property today. I\'d love to hear your thoughts!\n\nAre you interested in moving forward or would you like to see similar properties?\n\nLooking forward to hearing from you,\n{{agent-name}}',
        trigger: '4 hours after showing'
      }
    ],
    automations: [
      { id: 'auto-welcome', name: 'Send Welcome Email', trigger: 'New lead created', actions: ['Send welcome email'], enabled: true },
      { id: 'auto-showing-reminder', name: 'Showing Reminder', trigger: '24 hours before showing', actions: ['Send showing reminder email'], enabled: true },
      { id: 'auto-follow-up', name: 'Post-Showing Follow Up', trigger: '4 hours after showing', actions: ['Send follow-up email'], enabled: true },
      { id: 'auto-nurture', name: 'Weekly Market Update', trigger: 'Every Monday at 9am', actions: ['Send market update email'], enabled: false }
    ],
    dashboardWidgets: [
      { id: 'active-listings', type: 'metric', title: 'Active Listings', position: { x: 0, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'showings-scheduled', type: 'metric', title: 'Showings This Week', position: { x: 1, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'pending-sales', type: 'metric', title: 'Pending Sales', position: { x: 2, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'commission-mtd', type: 'metric', title: 'Commission (MTD)', position: { x: 3, y: 0, w: 1, h: 1 }, config: {} }
    ]
  },

  'fitness': {
    crmFields: [
      { id: 'name', name: 'Full Name', type: 'text', required: true },
      { id: 'email', name: 'Email Address', type: 'email', required: true },
      { id: 'phone', name: 'Phone Number', type: 'phone', required: true },
      { id: 'membership-type', name: 'Membership Type', type: 'select', required: false, options: ['Monthly', 'Annual', 'Drop-in', 'Class Pack'] },
      { id: 'fitness-goals', name: 'Fitness Goals', type: 'multiselect', required: false, options: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'General Health'] },
      { id: 'experience-level', name: 'Experience Level', type: 'select', required: false, options: ['Beginner', 'Intermediate', 'Advanced'] },
      { id: 'medical-conditions', name: 'Medical Conditions/Injuries', type: 'text', required: false },
      { id: 'preferred-classes', name: 'Preferred Classes', type: 'multiselect', required: false, options: ['Yoga', 'HIIT', 'Spin', 'Strength', 'Pilates', 'Boxing'] },
      { id: 'join-date', name: 'Join Date', type: 'date', required: false },
      { id: 'emergency-contact', name: 'Emergency Contact', type: 'text', required: false },
      { id: 'waiver-signed', name: 'Waiver Signed', type: 'select', required: false, options: ['Yes', 'No'] }
    ],
    pipelineStages: [
      { id: 'trial-scheduled', name: 'Trial Scheduled', color: 'bg-blue-300', order: 1 },
      { id: 'trial-completed', name: 'Trial Completed', color: 'bg-yellow-300', order: 2 },
      { id: 'onboarding', name: 'Onboarding', color: 'bg-orange-300', order: 3 },
      { id: 'active-member', name: 'Active Member', color: 'bg-green-400', order: 4 },
      { id: 'at-risk', name: 'At-Risk', color: 'bg-red-300', order: 5 },
      { id: 'churned', name: 'Churned', color: 'bg-gray-400', order: 6 }
    ],
    emailTemplates: [
      {
        id: 'trial-welcome',
        name: 'Trial Welcome Email',
        subject: 'Welcome to Your Fitness Journey!',
        body: 'Hi {{name}},\n\nWelcome to our fitness community! Your trial class is scheduled for {{trial-date}} at {{trial-time}}.\n\nWhat to bring:\n- Water bottle\n- Comfortable workout clothes\n- Towel\n\nWe can\'t wait to see you!\n\n{{gym-name}} Team',
        trigger: 'Trial scheduled'
      },
      {
        id: 'class-reminder',
        name: 'Class Reminder',
        subject: 'Class Starts in 1 Hour!',
        body: 'Hi {{name}},\n\nYour {{class-name}} class starts in 1 hour at {{class-time}}.\n\nSee you soon!\n\n{{instructor-name}}',
        trigger: '1 hour before class'
      },
      {
        id: 'milestone',
        name: 'Achievement Celebration',
        subject: 'Congrats on {{milestone}}!',
        body: 'Hi {{name}},\n\nCongratulations on reaching {{milestone}}! Your dedication is inspiring.\n\nKeep up the amazing work!\n\n{{gym-name}} Team',
        trigger: 'Milestone achieved'
      }
    ],
    automations: [
      { id: 'auto-trial-reminder', name: 'Trial Class Reminder', trigger: '2 hours before trial', actions: ['Send reminder SMS', 'Send reminder email'], enabled: true },
      { id: 'auto-class-reminder', name: 'Class Check-in Reminder', trigger: '1 hour before class', actions: ['Send class reminder'], enabled: true },
      { id: 'auto-no-show-follow-up', name: 'No-Show Follow Up', trigger: 'Member misses class', actions: ['Send check-in email'], enabled: true },
      { id: 'auto-renewal-reminder', name: 'Membership Renewal', trigger: '7 days before expiration', actions: ['Send renewal reminder'], enabled: true }
    ],
    dashboardWidgets: [
      { id: 'active-members', type: 'metric', title: 'Active Members', position: { x: 0, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'classes-today', type: 'metric', title: 'Classes Today', position: { x: 1, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'trials-scheduled', type: 'metric', title: 'Trials This Week', position: { x: 2, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'revenue-mtd', type: 'metric', title: 'Revenue (MTD)', position: { x: 3, y: 0, w: 1, h: 1 }, config: {} }
    ]
  },

  'professional-services': {
    crmFields: [
      { id: 'name', name: 'Full Name', type: 'text', required: true },
      { id: 'email', name: 'Email Address', type: 'email', required: true },
      { id: 'phone', name: 'Phone Number', type: 'phone', required: true },
      { id: 'company', name: 'Company Name', type: 'text', required: false },
      { id: 'industry', name: 'Industry', type: 'text', required: false },
      { id: 'project-type', name: 'Project Type', type: 'select', required: false, options: ['Consulting', 'Strategy', 'Implementation', 'Audit', 'Ongoing Support'] },
      { id: 'budget', name: 'Project Budget', type: 'text', required: false },
      { id: 'timeline', name: 'Project Timeline', type: 'text', required: false },
      { id: 'decision-maker', name: 'Decision Maker', type: 'select', required: false, options: ['Yes', 'No', 'Influencer'] },
      { id: 'referral-source', name: 'Referral Source', type: 'text', required: false },
      { id: 'retainer', name: 'Retainer Status', type: 'select', required: false, options: ['Active', 'Proposal Sent', 'Not Applicable'] }
    ],
    pipelineStages: [
      { id: 'inquiry', name: 'Initial Inquiry', color: 'bg-gray-300', order: 1 },
      { id: 'consultation', name: 'Consultation Scheduled', color: 'bg-blue-300', order: 2 },
      { id: 'proposal', name: 'Proposal Sent', color: 'bg-yellow-300', order: 3 },
      { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-300', order: 4 },
      { id: 'contract-sent', name: 'Contract Sent', color: 'bg-purple-300', order: 5 },
      { id: 'active-client', name: 'Active Client', color: 'bg-green-400', order: 6 },
      { id: 'lost', name: 'Lost', color: 'bg-red-300', order: 7 }
    ],
    emailTemplates: [
      {
        id: 'inquiry-response',
        name: 'Inquiry Response',
        subject: 'Re: Your {{project-type}} Inquiry',
        body: 'Hi {{name}},\n\nThank you for reaching out about {{project-type}}. I\'d love to learn more about your needs.\n\nCould we schedule a 30-minute consultation this week? Here\'s my calendar link: {{calendar-link}}\n\nBest regards,\n{{consultant-name}}',
        trigger: 'New inquiry received'
      },
      {
        id: 'proposal-sent',
        name: 'Proposal Follow Up',
        subject: 'Proposal for {{company}}',
        body: 'Hi {{name}},\n\nI\'ve prepared a detailed proposal for {{project-type}}. Please review at your convenience.\n\nProposal Link: {{proposal-link}}\n\nHappy to discuss any questions you may have.\n\n{{consultant-name}}',
        trigger: 'Proposal sent'
      },
      {
        id: 'project-update',
        name: 'Weekly Project Update',
        subject: 'Project Update - Week of {{date}}',
        body: 'Hi {{name}},\n\nHere\'s this week\'s progress update:\n\n✓ Completed: {{completed-tasks}}\n→ In Progress: {{current-tasks}}\n⭐ Next Week: {{upcoming-tasks}}\n\nLet me know if you have any questions!\n\n{{consultant-name}}',
        trigger: 'Every Friday at 4pm'
      }
    ],
    automations: [
      { id: 'auto-inquiry-response', name: 'Auto-Respond to Inquiries', trigger: 'New inquiry received', actions: ['Send inquiry response email'], enabled: true },
      { id: 'auto-proposal-follow-up', name: 'Proposal Follow Up', trigger: '3 days after proposal sent', actions: ['Send follow-up email'], enabled: true },
      { id: 'auto-weekly-update', name: 'Weekly Client Update', trigger: 'Every Friday at 4pm', actions: ['Send project update'], enabled: true },
      { id: 'auto-invoice-reminder', name: 'Invoice Payment Reminder', trigger: '3 days before due date', actions: ['Send invoice reminder'], enabled: true }
    ],
    dashboardWidgets: [
      { id: 'active-projects', type: 'metric', title: 'Active Projects', position: { x: 0, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'proposals-sent', type: 'metric', title: 'Proposals Pending', position: { x: 1, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'billable-hours', type: 'metric', title: 'Billable Hours (MTD)', position: { x: 2, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'revenue-mtd', type: 'metric', title: 'Revenue (MTD)', position: { x: 3, y: 0, w: 1, h: 1 }, config: {} }
    ]
  },

  'home-services': {
    crmFields: [
      { id: 'name', name: 'Customer Name', type: 'text', required: true },
      { id: 'email', name: 'Email Address', type: 'email', required: true },
      { id: 'phone', name: 'Phone Number', type: 'phone', required: true },
      { id: 'service-address', name: 'Service Address', type: 'text', required: true },
      { id: 'service-type', name: 'Service Type', type: 'select', required: false, options: ['Plumbing', 'Electrical', 'HVAC', 'Cleaning', 'Landscaping', 'General Repair'] },
      { id: 'property-type', name: 'Property Type', type: 'select', required: false, options: ['Residential', 'Commercial', 'Multi-Unit'] },
      { id: 'urgency', name: 'Urgency', type: 'select', required: false, options: ['Emergency', 'ASAP', 'This Week', 'Flexible'] },
      { id: 'job-description', name: 'Job Description', type: 'text', required: false },
      { id: 'recurring', name: 'Recurring Service', type: 'select', required: false, options: ['One-Time', 'Weekly', 'Monthly', 'Quarterly'] },
      { id: 'preferred-tech', name: 'Preferred Technician', type: 'text', required: false },
      { id: 'access-notes', name: 'Access Notes', type: 'text', required: false }
    ],
    pipelineStages: [
      { id: 'inquiry', name: 'New Inquiry', color: 'bg-gray-300', order: 1 },
      { id: 'quote-sent', name: 'Quote Sent', color: 'bg-blue-300', order: 2 },
      { id: 'scheduled', name: 'Job Scheduled', color: 'bg-yellow-300', order: 3 },
      { id: 'in-progress', name: 'In Progress', color: 'bg-orange-300', order: 4 },
      { id: 'completed', name: 'Job Completed', color: 'bg-green-400', order: 5 },
      { id: 'invoiced', name: 'Invoiced', color: 'bg-purple-300', order: 6 },
      { id: 'paid', name: 'Paid', color: 'bg-green-500', order: 7 }
    ],
    emailTemplates: [
      {
        id: 'quote-request',
        name: 'Quote Request Response',
        subject: 'Your {{service-type}} Quote',
        body: 'Hi {{name}},\n\nThank you for contacting us about {{service-type}} at {{service-address}}.\n\nBased on your description, here\'s our quote:\n\nService: {{service-description}}\nEstimated Cost: {{quote-amount}}\nEstimated Time: {{estimated-time}}\n\nReady to schedule? Reply to this email or call us at {{phone}}.\n\n{{company-name}}',
        trigger: 'Quote requested'
      },
      {
        id: 'job-confirmation',
        name: 'Job Confirmation',
        subject: 'Confirmed: {{service-type}} on {{job-date}}',
        body: 'Hi {{name}},\n\nYour {{service-type}} job is confirmed for {{job-date}} at {{job-time}}.\n\nTechnician: {{tech-name}}\nEstimated Duration: {{duration}}\nAddress: {{service-address}}\n\nWe\'ll call when we\'re on our way!\n\n{{company-name}}',
        trigger: 'Job scheduled'
      },
      {
        id: 'job-complete',
        name: 'Job Completion & Invoice',
        subject: 'Job Complete - Invoice Attached',
        body: 'Hi {{name}},\n\nWe\'ve completed your {{service-type}} job. Thank you for choosing {{company-name}}!\n\nInvoice Total: {{invoice-amount}}\nPay Online: {{payment-link}}\n\nWe\'d love your feedback: {{review-link}}\n\n{{company-name}}',
        trigger: 'Job marked complete'
      }
    ],
    automations: [
      { id: 'auto-quote-response', name: 'Auto-Send Quote', trigger: 'Quote request received', actions: ['Send quote email'], enabled: true },
      { id: 'auto-job-reminder', name: 'Job Reminder', trigger: '24 hours before job', actions: ['Send reminder SMS'], enabled: true },
      { id: 'auto-on-the-way', name: 'On The Way Notification', trigger: 'Tech en route', actions: ['Send SMS notification'], enabled: true },
      { id: 'auto-review-request', name: 'Review Request', trigger: '2 hours after job complete', actions: ['Send review request'], enabled: true }
    ],
    dashboardWidgets: [
      { id: 'jobs-today', type: 'metric', title: 'Jobs Today', position: { x: 0, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'quotes-pending', type: 'metric', title: 'Quotes Pending', position: { x: 1, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'outstanding-invoices', type: 'metric', title: 'Outstanding Invoices', position: { x: 2, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'revenue-mtd', type: 'metric', title: 'Revenue (MTD)', position: { x: 3, y: 0, w: 1, h: 1 }, config: {} }
    ]
  },

  'ecommerce': {
    crmFields: [
      { id: 'name', name: 'Customer Name', type: 'text', required: true },
      { id: 'email', name: 'Email Address', type: 'email', required: true },
      { id: 'phone', name: 'Phone Number', type: 'phone', required: false },
      { id: 'total-orders', name: 'Total Orders', type: 'number', required: false },
      { id: 'lifetime-value', name: 'Lifetime Value', type: 'number', required: false },
      { id: 'last-order-date', name: 'Last Order Date', type: 'date', required: false },
      { id: 'customer-segment', name: 'Customer Segment', type: 'select', required: false, options: ['VIP', 'Repeat Buyer', 'One-Time', 'At-Risk'] },
      { id: 'preferred-products', name: 'Preferred Products', type: 'multiselect', required: false, options: ['Category A', 'Category B', 'Category C'] },
      { id: 'email-subscribed', name: 'Email Subscribed', type: 'select', required: false, options: ['Yes', 'No'] },
      { id: 'shipping-address', name: 'Shipping Address', type: 'text', required: false },
      { id: 'referral-source', name: 'Referral Source', type: 'select', required: false, options: ['Social Media', 'Google', 'Referral', 'Direct'] }
    ],
    pipelineStages: [
      { id: 'browsing', name: 'Browsing', color: 'bg-gray-300', order: 1 },
      { id: 'cart-abandoned', name: 'Cart Abandoned', color: 'bg-red-300', order: 2 },
      { id: 'order-placed', name: 'Order Placed', color: 'bg-blue-300', order: 3 },
      { id: 'processing', name: 'Processing', color: 'bg-yellow-300', order: 4 },
      { id: 'shipped', name: 'Shipped', color: 'bg-orange-300', order: 5 },
      { id: 'delivered', name: 'Delivered', color: 'bg-green-400', order: 6 },
      { id: 'repeat-customer', name: 'Repeat Customer', color: 'bg-purple-400', order: 7 }
    ],
    emailTemplates: [
      {
        id: 'welcome',
        name: 'Welcome New Customer',
        subject: 'Welcome to {{store-name}}!',
        body: 'Hi {{name}},\n\nWelcome to {{store-name}}! We\'re excited to have you.\n\nHere\'s 10% off your first order: {{coupon-code}}\n\nBrowse our latest arrivals: {{shop-link}}\n\nHappy shopping!\n{{store-name}} Team',
        trigger: 'New customer signup'
      },
      {
        id: 'cart-abandoned',
        name: 'Abandoned Cart Recovery',
        subject: 'You Left Something Behind!',
        body: 'Hi {{name}},\n\nWe noticed you left items in your cart:\n\n{{cart-items}}\n\nComplete your order now: {{cart-link}}\n\nNeed help? Reply to this email!\n\n{{store-name}}',
        trigger: '2 hours after cart abandonment'
      },
      {
        id: 'order-shipped',
        name: 'Order Shipped',
        subject: 'Your Order is On The Way!',
        body: 'Hi {{name}},\n\nGreat news! Your order #{{order-number}} has shipped.\n\nTracking Number: {{tracking-number}}\nTrack Your Order: {{tracking-link}}\n\nExpected Delivery: {{delivery-date}}\n\n{{store-name}}',
        trigger: 'Order status changed to shipped'
      }
    ],
    automations: [
      { id: 'auto-welcome', name: 'Welcome New Customers', trigger: 'New customer signup', actions: ['Send welcome email with coupon'], enabled: true },
      { id: 'auto-cart-recovery', name: 'Abandoned Cart Recovery', trigger: '2 hours after cart abandonment', actions: ['Send cart recovery email'], enabled: true },
      { id: 'auto-shipping-notification', name: 'Shipping Notification', trigger: 'Order shipped', actions: ['Send tracking email', 'Send SMS with tracking'], enabled: true },
      { id: 'auto-review-request', name: 'Product Review Request', trigger: '7 days after delivery', actions: ['Send review request email'], enabled: true }
    ],
    dashboardWidgets: [
      { id: 'orders-today', type: 'metric', title: 'Orders Today', position: { x: 0, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'abandoned-carts', type: 'metric', title: 'Abandoned Carts', position: { x: 1, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'inventory-alerts', type: 'metric', title: 'Low Stock Items', position: { x: 2, y: 0, w: 1, h: 1 }, config: {} },
      { id: 'revenue-mtd', type: 'metric', title: 'Revenue (MTD)', position: { x: 3, y: 0, w: 1, h: 1 }, config: {} }
    ]
  }
};

export function getIndustryTemplate(industry: IndustryType): IndustryTemplate {
  return industryTemplates[industry];
}
