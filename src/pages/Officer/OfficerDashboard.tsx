import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, CheckCircle2, Navigation, Search, Phone, Mail, MapPin 
} from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';
import { DealerMap } from '../../components/Map/DealerMap';
import { 
  salesOfficers, 
  dealers, 
  getRecommendedVisitPlan
} from '../../data/mockData';

export default function OfficerDashboard() {
  const { id } = useParams();
  const officer = useMemo(() => salesOfficers.find(o => o.id === id), [id]);
  const officerDealers = useMemo(() => dealers.filter(d => d.officerId === id), [id]);
  const visitPlan = useMemo(() => id ? getRecommendedVisitPlan(id) : [], [id]);

  if (!officer) {
    return <div className="min-h-screen bg-slate-900 text-white p-8">Officer not found</div>;
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'visit': return <Navigation className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <User className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-lg text-white">{officer.name}'s Dashboard</span>
            </div>
          </div>
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Switch Role</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="My Target Completion" 
            value="78%"
            trend={{ value: 2, isPositive: true }}
            className="border-emerald-500/30 bg-emerald-500/5"
          />
          <MetricCard 
            title="Dealers to Visit Today" 
            value={visitPlan.filter(a => a.type === 'visit').length}
          />
          <MetricCard 
            title="My Outstanding Dues" 
            value={`$${officer.totalDues.toLocaleString()}`}
            trend={{ value: 1.5, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area: Visit Plan & Next Best Action */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Daily Recommended Plan (Next Best Action)</h2>
                <span className="text-sm text-slate-400">AI Prioritized</span>
              </div>
              
              <div className="space-y-4">
                {visitPlan.map((action, idx) => {
                  const dealer = officerDealers.find(d => d.id === action.dealerId);
                  if (!dealer) return null;
                  
                  return (
                    <div key={idx} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            action.priorityScore > 70 ? 'bg-rose-500/20 text-rose-400' : 
                            action.priorityScore > 40 ? 'bg-amber-500/20 text-amber-400' : 
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            Score: {action.priorityScore}
                          </span>
                          <h3 className="font-semibold text-white">{dealer.name}</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{action.reason}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/> {dealer.location.address}</span>
                        </div>
                      </div>

                      <button className="flex items-center justify-center space-x-2 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                        {getActionIcon(action.type)}
                        <span className="capitalize">{action.type}</span>
                      </button>

                    </div>
                  );
                })}
                {visitPlan.length === 0 && (
                  <p className="text-center text-slate-500 italic py-6">No prioritized actions for today. Great job!</p>
                )}
              </div>
            </div>

            {/* My Route Map */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">My Dealers Route</h2>
              <DealerMap dealers={officerDealers} />
            </div>

          </div>

          {/* Sidebar Area: Dealer Directory */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">My Dealers</h2>
                <div className="p-2 bg-slate-700 rounded-lg text-slate-300">
                  <Search className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-3">
                {officerDealers.map(dealer => (
                  <div key={dealer.id} className="p-3 bg-slate-900/50 rounded-xl border border-transparent hover:border-slate-600 transition-colors">
                    <h4 className="font-medium text-white text-sm">{dealer.name}</h4>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block">YTD Sales</span>
                        <span className="text-slate-300 font-medium">${dealer.sales.ytd.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Dues</span>
                        <span className={`${dealer.dues.overdueAmount > 0 ? 'text-rose-400 font-semibold' : 'text-slate-300'}`}>
                          ${dealer.dues.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
