export interface Territory {
  id: string;
  name: string;
}

export interface SalesOfficer {
  id: string;
  name: string;
  territoryId: string;
  role: 'officer';
  totalSales: number;
  totalDues: number;
  dealersCount: number;
}

export interface Activity {
  id: string;
  type: 'visit' | 'call' | 'email' | 'order' | 'payment';
  date: string;
  notes: string;
}

export interface Dealer {
  id: string;
  name: string;
  officerId: string;
  territoryId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  sales: {
    ytd: number;
    lastMonth: number;
    historicalAverage: number; // For sales decline alert
  };
  dues: {
    total: number;
    overdueAmount: number;
    oldestDueDays: number;
  };
  lastVisitDate: string;
  activities: Activity[];
}

export interface RecommendedAction {
  dealerId: string;
  type: 'visit' | 'call' | 'email';
  reason: string;
  priorityScore: number;
}

// 1. One Territory
export const territory: Territory = {
  id: 't-1',
  name: 'North Region',
};

// 2. Three Sales Officers
export const salesOfficers: SalesOfficer[] = [
  { id: 'o-1', name: 'Alice Smith', territoryId: 't-1', role: 'officer', totalSales: 150000, totalDues: 25000, dealersCount: 4 },
  { id: 'o-2', name: 'Bob Jones', territoryId: 't-1', role: 'officer', totalSales: 120000, totalDues: 18000, dealersCount: 3 },
  { id: 'o-3', name: 'Charlie Davis', territoryId: 't-1', role: 'officer', totalSales: 95000, totalDues: 32000, dealersCount: 3 },
];

// 3. Ten Customers/Dealers
export const dealers: Dealer[] = [
  {
    id: 'd-1', name: 'Apex Hardware', officerId: 'o-1', territoryId: 't-1',
    location: { lat: 23.7937, lng: 90.4066, address: 'Gulshan 2, Dhaka' },
    sales: { ytd: 45000, lastMonth: 2000, historicalAverage: 4000 },
    dues: { total: 15000, overdueAmount: 12000, oldestDueDays: 45 },
    lastVisitDate: '2024-05-10',
    activities: [{ id: 'a-1', type: 'order', date: '2024-05-15', notes: 'Ordered bulk supplies.' }]
  },
  {
    id: 'd-2', name: 'Builders Choice', officerId: 'o-1', territoryId: 't-1',
    location: { lat: 23.7949, lng: 90.4043, address: 'Banani, Dhaka' },
    sales: { ytd: 60000, lastMonth: 6000, historicalAverage: 5000 },
    dues: { total: 2000, overdueAmount: 0, oldestDueDays: 0 },
    lastVisitDate: '2024-06-15',
    activities: [{ id: 'a-2', type: 'visit', date: '2024-06-15', notes: 'Regular check-in.' }]
  },
  {
    id: 'd-3', name: 'City Construct', officerId: 'o-1', territoryId: 't-1',
    location: { lat: 23.7461, lng: 90.3742, address: 'Dhanmondi 27, Dhaka' },
    sales: { ytd: 20000, lastMonth: 1500, historicalAverage: 1600 },
    dues: { total: 5000, overdueAmount: 2000, oldestDueDays: 15 },
    lastVisitDate: '2024-04-20',
    activities: [{ id: 'a-3', type: 'call', date: '2024-06-01', notes: 'Followed up on payment.' }]
  },
  {
    id: 'd-4', name: 'Delta Supplies', officerId: 'o-1', territoryId: 't-1',
    location: { lat: 23.7340, lng: 90.3928, address: 'Shahbagh, Dhaka' },
    sales: { ytd: 25000, lastMonth: 2500, historicalAverage: 2500 },
    dues: { total: 3000, overdueAmount: 0, oldestDueDays: 0 },
    lastVisitDate: '2024-06-10',
    activities: [{ id: 'a-4', type: 'email', date: '2024-06-12', notes: 'Sent promo catalog.' }]
  },
  {
    id: 'd-5', name: 'Eagle Materials', officerId: 'o-2', territoryId: 't-1',
    location: { lat: 23.8048, lng: 90.3654, address: 'Mirpur 10, Dhaka' },
    sales: { ytd: 50000, lastMonth: 4000, historicalAverage: 4500 },
    dues: { total: 10000, overdueAmount: 5000, oldestDueDays: 30 },
    lastVisitDate: '2024-05-25',
    activities: [{ id: 'a-5', type: 'visit', date: '2024-05-25', notes: 'Discussed new line.' }]
  },
  {
    id: 'd-6', name: 'Frontier Build', officerId: 'o-2', territoryId: 't-1',
    location: { lat: 23.7749, lng: 90.3659, address: 'Shyamoli, Dhaka' },
    sales: { ytd: 35000, lastMonth: 1000, historicalAverage: 3500 },
    dues: { total: 8000, overdueAmount: 8000, oldestDueDays: 60 },
    lastVisitDate: '2024-03-10',
    activities: [{ id: 'a-6', type: 'call', date: '2024-05-01', notes: 'No answer.' }]
  },
  {
    id: 'd-7', name: 'Global Goods', officerId: 'o-2', territoryId: 't-1',
    location: { lat: 23.7604, lng: 90.3755, address: 'Panthapath, Dhaka' },
    sales: { ytd: 35000, lastMonth: 3000, historicalAverage: 3000 },
    dues: { total: 0, overdueAmount: 0, oldestDueDays: 0 },
    lastVisitDate: '2024-06-18',
    activities: [{ id: 'a-7', type: 'visit', date: '2024-06-18', notes: 'Restocked.' }]
  },
  {
    id: 'd-8', name: 'Horizon Equip', officerId: 'o-3', territoryId: 't-1',
    location: { lat: 23.7104, lng: 90.4074, address: 'Motijheel, Dhaka' },
    sales: { ytd: 40000, lastMonth: 3500, historicalAverage: 3500 },
    dues: { total: 12000, overdueAmount: 10000, oldestDueDays: 40 },
    lastVisitDate: '2024-05-05',
    activities: [{ id: 'a-8', type: 'visit', date: '2024-05-05', notes: 'Collected partial payment.' }]
  },
  {
    id: 'd-9', name: 'Ironclad Store', officerId: 'o-3', territoryId: 't-1',
    location: { lat: 23.7253, lng: 90.3976, address: 'New Market, Dhaka' },
    sales: { ytd: 15000, lastMonth: 500, historicalAverage: 2000 },
    dues: { total: 5000, overdueAmount: 5000, oldestDueDays: 50 },
    lastVisitDate: '2024-02-15',
    activities: [{ id: 'a-9', type: 'email', date: '2024-04-10', notes: 'Sent final notice.' }]
  },
  {
    id: 'd-10', name: 'Jetstream Parts', officerId: 'o-3', territoryId: 't-1',
    location: { lat: 23.8677, lng: 90.3951, address: 'Uttara Sector 7, Dhaka' },
    sales: { ytd: 40000, lastMonth: 4000, historicalAverage: 3500 },
    dues: { total: 15000, overdueAmount: 2000, oldestDueDays: 10 },
    lastVisitDate: '2024-06-12',
    activities: [{ id: 'a-10', type: 'order', date: '2024-06-12', notes: 'Placed large order.' }]
  }
];

// Logic functions
export const getDealerPriorityScore = (dealer: Dealer): number => {
  let score = 0;
  // High overdue amount increases priority
  if (dealer.dues.overdueAmount > 5000) score += 40;
  else if (dealer.dues.overdueAmount > 0) score += 20;

  // Oldest due days
  if (dealer.dues.oldestDueDays > 30) score += 30;

  // Sales decline
  if (dealer.sales.lastMonth < dealer.sales.historicalAverage * 0.7) score += 20;

  // Time since last visit
  const daysSinceVisit = (new Date().getTime() - new Date(dealer.lastVisitDate).getTime()) / (1000 * 3600 * 24);
  if (daysSinceVisit > 60) score += 20;
  else if (daysSinceVisit > 30) score += 10;

  return Math.min(score, 100);
};

export const hasCollectionRisk = (dealer: Dealer): boolean => {
  return dealer.dues.overdueAmount > 5000 && dealer.dues.oldestDueDays > 30;
};

export const hasSalesDecline = (dealer: Dealer): boolean => {
  return dealer.sales.lastMonth < dealer.sales.historicalAverage * 0.7;
};

export const getNextBestAction = (dealer: Dealer): RecommendedAction => {
  const priorityScore = getDealerPriorityScore(dealer);

  if (hasCollectionRisk(dealer)) {
    return { dealerId: dealer.id, type: 'visit', reason: `High collection risk. $${dealer.dues.overdueAmount} overdue by ${dealer.dues.oldestDueDays} days.`, priorityScore };
  }
  if (hasSalesDecline(dealer)) {
    return { dealerId: dealer.id, type: 'call', reason: 'Significant sales decline last month compared to average.', priorityScore };
  }
  
  const daysSinceVisit = (new Date().getTime() - new Date(dealer.lastVisitDate).getTime()) / (1000 * 3600 * 24);
  if (daysSinceVisit > 30) {
    return { dealerId: dealer.id, type: 'visit', reason: 'Routine check-in overdue.', priorityScore };
  }

  return { dealerId: dealer.id, type: 'email', reason: 'Send regular promotional updates.', priorityScore };
};

export const getRecommendedVisitPlan = (officerId: string): RecommendedAction[] => {
  const officerDealers = dealers.filter(d => d.officerId === officerId);
  const actions = officerDealers.map(d => getNextBestAction(d));
  // Filter for visits and calls, sort by priority
  return actions
    .filter(a => a.type === 'visit' || a.type === 'call')
    .sort((a, b) => b.priorityScore - a.priorityScore);
};

export const getAllAlerts = () => {
  const alerts: { type: 'collection' | 'sales', dealer: Dealer, message: string }[] = [];
  dealers.forEach(dealer => {
    if (hasCollectionRisk(dealer)) {
      alerts.push({ type: 'collection', dealer, message: `${dealer.name} has $${dealer.dues.overdueAmount} overdue (${dealer.dues.oldestDueDays} days).` });
    }
    if (hasSalesDecline(dealer)) {
      alerts.push({ type: 'sales', dealer, message: `${dealer.name} sales dropped to $${dealer.sales.lastMonth} (Avg: $${dealer.sales.historicalAverage}).` });
    }
  });
  return alerts;
};

// --- NEW DATA FOR ADVANCED MANAGER DASHBOARD ---

export interface ExceptionReport {
  id: string;
  type: 'GPS Mismatch' | 'Fast-Clicking' | 'Target Missed' | 'Missing Visit';
  soId: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface AICoachingInsight {
  soId: string;
  strengths: string[];
  weaknesses: string[];
  suggestedActions: string[];
  scriptRecommendation: string;
}

export interface ActionPoint {
  id: string;
  soId: string;
  task: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export const exceptionReports: ExceptionReport[] = [
  { id: 'e-1', type: 'GPS Mismatch', soId: 'o-1', description: 'Checked in 2km away from Apex Hardware.', severity: 'high', timestamp: '2024-06-19T09:15:00Z' },
  { id: 'e-2', type: 'Fast-Clicking', soId: 'o-2', description: 'Completed visit at Eagle Materials in 1m 20s.', severity: 'medium', timestamp: '2024-06-19T10:30:00Z' },
  { id: 'e-3', type: 'Missing Visit', soId: 'o-3', description: 'Skipped planned visit to Ironclad Store.', severity: 'high', timestamp: '2024-06-19T11:45:00Z' }
];

export const aiCoachingInsights: AICoachingInsight[] = [
  { 
    soId: 'o-1', 
    strengths: ['High conversion rate', 'Consistent attendance'], 
    weaknesses: ['Poor collection on old dues'], 
    suggestedActions: ['Pair with Charlie Davis for a collection ride-along', 'Set a strict 10% daily collection target'],
    scriptRecommendation: '"I see we have an outstanding balance from last quarter. Let\'s clear at least 20% today so I can unlock your next bulk order discount."'
  },
  { 
    soId: 'o-2', 
    strengths: ['Excellent route coverage', 'Good rapport with new dealers'], 
    weaknesses: ['Fast-clicking through visits', 'Low average order value'], 
    suggestedActions: ['Enforce minimum 10-minute check-in duration', 'Provide training on cross-selling new materials'],
    scriptRecommendation: '"While you are stocking up on X, did you know Y pairs perfectly with it? Other dealers in your area are seeing a 15% bump combining them."'
  },
  { 
    soId: 'o-3', 
    strengths: ['Aggressive collection strategy', 'High average order value'], 
    weaknesses: ['Skipping visits', 'Poor CRM updates'], 
    suggestedActions: ['Review daily route plan every morning', 'Mandatory end-of-day summary log'],
    scriptRecommendation: '"Just a quick check-in to make sure you are fully stocked. I noticed we missed our last scheduled visit, so I want to make sure you aren\'t running low."'
  }
];

export const weeklyActionPoints: ActionPoint[] = [
  { id: 'ap-1', soId: 'o-1', task: 'Collect 50% of Apex Hardware Dues', dueDate: '2024-06-25', status: 'pending' },
  { id: 'ap-2', soId: 'o-2', task: 'Complete 100% of route without fast-clicking', dueDate: '2024-06-21', status: 'pending' },
  { id: 'ap-3', soId: 'o-3', task: 'Visit Ironclad Store and update CRM', dueDate: '2024-06-20', status: 'pending' }
];

export const historicalSalesData = [
  { name: 'Mon', sales: 4000, target: 2400 },
  { name: 'Tue', sales: 3000, target: 2400 },
  { name: 'Wed', sales: 2000, target: 2400 },
  { name: 'Thu', sales: 2780, target: 2400 },
  { name: 'Fri', sales: 1890, target: 2400 },
  { name: 'Sat', sales: 2390, target: 2400 },
  { name: 'Sun', sales: 3490, target: 2400 },
];

export const getHighPotentialCustomers = (): Dealer[] => {
  // Simple heuristic: Dealers with good YTD sales but low recent sales and no dues
  return dealers.filter(d => d.sales.ytd > 30000 && d.dues.total === 0 && d.sales.lastMonth < d.sales.historicalAverage);
};
