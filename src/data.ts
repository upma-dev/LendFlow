import { LoanApplication, BankPartner, Testimonial } from './types';

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    role: 'Micro-retailer & Owner',
    text: 'I needed ₹5 Lakhs for stock expansion. Within 2 hours of check and paying the small unlock fee, I was linked with Piramal Finance and secured my approval. Extremely efficient!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    role: 'VP Product Engineering',
    text: 'Simple, direct, and completely transparent. The soft estimation matched exactly with ICICI’s final offer! Paid the ₹499 fee, unlocked partners, and finalized my loan within a day.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 't3',
    name: 'Vikram Singh',
    role: 'Co-Founder, BlueX Logistics',
    text: 'Searching for a business loan is exhausting. This platform categorized my eligibility dynamically. Unlocking Tata Capital allowed us to bypass lengthy documentation bottlenecks.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
  }
];

export const BANK_PARTNERS: BankPartner[] = [
  {
    id: 'icici',
    name: 'ICICI Bank',
    logo: 'DollarSign',
    interestRate: '10.50% - 14.25% p.a.',
    maxAmount: 'Up to ₹50 Lakhs',
    dsaCode: 'DSA-IC-99014',
    portalUrl: 'https://www.icicibank.com/personal-loan'
  },
  {
    id: 'tata',
    name: 'Tata Capital',
    logo: 'Shield',
    interestRate: '10.99% - 15.50% p.a.',
    maxAmount: 'Up to ₹25 Lakhs',
    dsaCode: 'DSA-TC-08812',
    portalUrl: 'https://www.tatacapital.com/personal-loan.html'
  },
  {
    id: 'bajaj',
    name: 'Bajaj Finserv',
    logo: 'Zap',
    interestRate: '11.49% - 16.00% p.a.',
    maxAmount: 'Up to ₹35 Lakhs',
    dsaCode: 'DSA-BF-76033',
    portalUrl: 'https://www.bajajfinserv.in/personal-loan'
  },
  {
    id: 'piramal',
    name: 'Piramal Finance',
    logo: 'Briefcase',
    interestRate: '11.99% - 18.00% p.a.',
    maxAmount: 'Up to ₹15 Lakhs',
    dsaCode: 'DSA-PF-11204',
    portalUrl: 'https://www.piramalfinance.com/personal-loan'
  },
  {
    id: 'aditya',
    name: 'Aditya Birla Capital',
    logo: 'Award',
    interestRate: '11.25% - 15.99% p.a.',
    maxAmount: 'Up to ₹40 Lakhs',
    dsaCode: 'DSA-AB-44589',
    portalUrl: 'https://content.adityabirlacapital.com/personal-loan'
  }
];

export const INITIAL_ENQUIRIES: LoanApplication[] = [
  {
    id: 'APP-7081',
    fullName: 'Rohan Mehta',
    mobileNumber: '9876543210',
    emailId: 'rohan.mehta@gmail.com',
    panNumber: 'ABCDE1234F',
    monthlyIncome: 75000,
    existingEmi: 10000,
    monthlyExpenses: 20000,
    cibilScore: 780,
    employmentType: 'Salaried',
    cityState: 'Bangalore, Karnataka',
    loanCategory: 'personal',
    status: 'pre_approved',
    appliedAt: '2026-05-22T09:30:00Z',
    remainingRepaymentCapacity: 45000,
    eligibleEmi: 36000,
    estimatedEligibility: 750000,
    loanTenureYears: 5,
    paymentStatus: 'paid',
    paymentDetails: {
      transactionId: 'TXN-RAZOR-908124',
      amount: 499,
      method: 'UPI',
      paidAt: '2026-05-22T09:35:00Z'
    }
  },
  {
    id: 'APP-5421',
    fullName: 'Sneha Deshmukh',
    mobileNumber: '9123456789',
    emailId: 'sneha.d@outlook.com',
    panNumber: 'WXYZP7890Q',
    monthlyIncome: 45000,
    existingEmi: 5000,
    monthlyExpenses: 15000,
    cibilScore: 720,
    employmentType: 'Self-Employed',
    cityState: 'Mumbai, Maharashtra',
    loanCategory: 'business',
    status: 'pre_approved',
    appliedAt: '2026-05-22T14:15:00Z',
    remainingRepaymentCapacity: 25000,
    eligibleEmi: 20000,
    estimatedEligibility: 420000,
    loanTenureYears: 3,
    paymentStatus: 'unpaid'
  },
  {
    id: 'APP-3392',
    fullName: 'Vikram Roy',
    mobileNumber: '9988776655',
    emailId: 'vroy.logistics@gmail.com',
    panNumber: 'LMNOP4567G',
    monthlyIncome: 140000,
    existingEmi: 20000,
    monthlyExpenses: 40000,
    cibilScore: 810,
    employmentType: 'Business Owner',
    cityState: 'Noida, Uttar Pradesh',
    loanCategory: 'business',
    status: 'pre_approved',
    appliedAt: '2026-05-21T11:00:00Z',
    remainingRepaymentCapacity: 80000,
    eligibleEmi: 64000,
    estimatedEligibility: 1500000,
    loanTenureYears: 5,
    paymentStatus: 'paid',
    paymentDetails: {
      transactionId: 'TXN-STRIPE-451299',
      amount: 499,
      method: 'Card',
      paidAt: '2026-05-21T11:06:12Z'
    }
  },
  {
    id: 'APP-1029',
    fullName: 'Ananya Sen',
    mobileNumber: '9845012345',
    emailId: 'ananya.sen@yahoo.com',
    panNumber: 'JKLMQ9876E',
    monthlyIncome: 22000,
    existingEmi: 9000,
    monthlyExpenses: 11000,
    cibilScore: 590,
    employmentType: 'Salaried',
    cityState: 'Kolkata, West Bengal',
    loanCategory: 'personal',
    status: 'rejected',
    appliedAt: '2026-05-20T08:45:00Z',
    remainingRepaymentCapacity: 2000,
    eligibleEmi: 1600,
    estimatedEligibility: 0,
    loanTenureYears: 1,
    paymentStatus: 'unpaid'
  }
];

export function calculateEligibility(
  income: number,
  existingEmi: number,
  expenses: number,
  cibil?: number
): {
  remainingCapacity: number;
  eligibleEmi: number;
  estimatedLoanMin: number;
  estimatedLoanMax: number;
  status: 'pre_approved' | 'rejected';
} {
  const remainingCapacity = income - existingEmi - expenses;
  // If capacity is very low or negative, reject
  if (remainingCapacity < 5000 || (cibil && cibil < 600)) {
    return {
      remainingCapacity,
      eligibleEmi: 0,
      estimatedLoanMin: 0,
      estimatedLoanMax: 0,
      status: 'rejected'
    };
  }

  // Eligible EMI is approx 80% of remaining repayment capacity
  const eligibleEmi = Math.max(0, remainingCapacity * 0.8);

  // Multiplier depends slightly on CIBIL or base range
  let multiplierMin = 15;
  let multiplierMax = 25;

  if (cibil && cibil >= 750) {
    multiplierMin = 18;
    multiplierMax = 28;
  } else if (cibil && cibil < 650) {
    multiplierMin = 12;
    multiplierMax = 20;
  }

  const estimatedLoanMin = Math.round(eligibleEmi * multiplierMin);
  const estimatedLoanMax = Math.round(eligibleEmi * multiplierMax);

  return {
    remainingCapacity,
    eligibleEmi: Math.round(eligibleEmi),
    estimatedLoanMin,
    estimatedLoanMax,
    status: 'pre_approved'
  };
}
