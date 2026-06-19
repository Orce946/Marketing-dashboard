import React, { useMemo } from 'react';
import { TrendingUp, MapPin, DollarSign, Clock, ArrowRight, Navigation, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dealers, getRecommendedVisitPlan, salesOfficers } from '../../data/mockData';
import { DealerMap } from '../../components/Map/DealerMap';

const SOHome: React.FC = () => {
  const currentUserId = 'o-1'; // Hardcoded mock user for prototype
  const officer = useMemo(() => salesOfficers.find(o => o.id === currentUserId), []);
  const officerDealers = useMemo(() => dealers.filter(d => d.officerId === currentUserId), []);
  const visitPlan = useMemo(() => getRecommendedVisitPlan(currentUserId), []);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'visit': return <Navigation className="w-5 h-5" />;
      case 'call': return <Phone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      default: return <ArrowRight className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-20">
      
      {/* Daily Target Summary (Huge Contrast) */}
      <div className="bg-accent text-white rounded-2xl p-6 shadow-card">
         <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">আজকের বিক্রি</span>
            <TrendingUp className="w-6 h-6 text-white/80" />
         </div>
         <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-extrabold tracking-tight">৳2,450.00</span>
         </div>
         <div className="h-2 bg-black/20 rounded-full mb-2 overflow-hidden">
             <div className="h-full bg-white rounded-full w-[70%]"></div>
         </div>
         <div className="flex justify-between text-sm font-medium text-white/90">
             <span>টার্গেট: ৳3,500.00</span>
             <span>70% পূরণ</span>
         </div>
      </div>

      {/* Action Grid (Large Tap Targets) */}
      <div className="grid grid-cols-2 gap-4">
        
        <Link to="/map" className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm active:bg-gray-50 flex flex-col items-center justify-center text-center gap-3 transition-colors">
           <div className="w-14 h-14 rounded-full bg-warning/15 text-warning flex items-center justify-center">
              <MapPin className="w-7 h-7" />
           </div>
           <div>
             <h3 className="font-bold text-lg text-text-primary">ভিজিট বাকি</h3>
             <p className="text-warning font-bold text-sm">{visitPlan.filter(a => a.type === 'visit').length} টি দোকান</p>
           </div>
        </Link>

        <Link to="/reports" className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm active:bg-gray-50 flex flex-col items-center justify-center text-center gap-3 transition-colors">
           <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center">
              <DollarSign className="w-7 h-7" />
           </div>
           <div>
             <h3 className="font-bold text-lg text-text-primary">আমার বকেয়া</h3>
             <p className="text-red-500 font-bold text-sm">${officer?.totalDues.toLocaleString()}</p>
           </div>
        </Link>

      </div>

      {/* Map Snapshot */}
      <div className="bg-white border-2 border-border rounded-2xl p-2 shadow-sm">
        <h2 className="font-bold text-text-secondary text-sm uppercase mb-2 mt-2 px-3 tracking-wide">My Territory Route</h2>
        <div className="rounded-xl overflow-hidden">
          <DealerMap dealers={officerDealers} zoom={12} />
        </div>
      </div>

      {/* AI Prioritized Next Actions */}
      <div className="space-y-4">
         <h2 className="font-bold text-text-secondary text-sm uppercase tracking-wide">পরবর্তী করণীয় (Next Best Actions)</h2>
         {visitPlan.map((action, idx) => {
           const dealer = officerDealers.find(d => d.id === action.dealerId);
           if (!dealer) return null;

           return (
             <div key={idx} className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between">
                   <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center
                        ${action.priorityScore > 70 ? 'bg-red-100 text-red-600' : 
                          action.priorityScore > 40 ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-green-100 text-green-600'}`}
                      >
                         {getActionIcon(action.type)}
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-text-primary">{dealer.name}</h3>
                         <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{action.type} REQ • PRIORITY {action.priorityScore}</p>
                      </div>
                   </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">{action.reason}</p>
                </div>
                <button 
                  onClick={() => alert(`Starting ${action.type} action for ${dealer.name}`)}
                  className="w-full py-3 rounded-xl bg-accent text-white font-bold text-center shadow-md active:bg-accent-hover transition-colors"
                >
                   Start Action
                </button>
             </div>
           );
         })}
      </div>

       {/* Time & Attendance Summary */}
       <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-info/15 text-info flex items-center justify-center">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-bold text-text-primary">কাজের সময়</h3>
               <p className="text-text-muted text-sm font-medium">04h 52m (08:45 AM থেকে)</p>
            </div>
         </div>
         <Link to="/so/attendance" className="px-4 py-2 bg-text-primary text-white font-bold rounded-lg text-sm active:bg-text-secondary transition-colors">
            হাজিরা দেখুন
         </Link>
      </div>

    </div>
  );
};

export default SOHome;
