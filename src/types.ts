export interface LoanApplication {
  id: string;
  fullName: string;
  mobileNumber: string;
  emailId: string;
  panNumber: string;
  monthlyIncome: number;
  existingEmi: number;
  monthlyExpenses: number;
  cibilScore?: number;
  employmentType: 'Salaried' | 'Self-Employed' | 'Business Owner' | 'Other';
  cityState: string;
  loanCategory: 'personal' | 'business';
  status: 'pre_approved' | 'rejected' | 'pending';
  appliedAt: string;
  
  // Calculated eligibility details
  remainingRepaymentCapacity: number;
  eligibleEmi: number;
  estimatedEligibility: number;
  loanTenureYears: number;
  
  // Payment details
  paymentStatus: 'unpaid' | 'paid';
  paymentDetails?: {
    transactionId: string;
    amount: number;
    method: 'UPI' | 'Card' | 'NetBanking';
    paidAt: string;
  };
}

export interface BankPartner {
  id: string;
  name: string;
  logo: string; // Tailwind icon key or string
  interestRate: string;
  maxAmount: string;
  dsaCode: string;
  portalUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export type ViewState = 'home' | 'categories' | 'apply' | 'result' | 'unlock' | 'dashboard' | 'admin';
