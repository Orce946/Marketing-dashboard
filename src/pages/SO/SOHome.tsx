import React, { useMemo } from 'react';
import { MapPin, DollarSign, ArrowRight, Navigation, Phone, Mail } from 'lucide-react';
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
    <div className="max-w-lg mx-auto w-full space-y-6 px-4">
      
      {/* Monthly Performance (Overlapping Card) */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-md -mt-12 relative z-20">
         <div className="flex justify-between items-center mb-3">
            <span className="text-text-primary font-extrabold text-sm">মাসিক পারফরম্যান্স</span>
            <span className="text-[10px] font-extrabold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wide">চলতি মাস</span>
         </div>
         <div className="flex items-center justify-between mb-3">
            <div>
               <p className="text-xs text-text-muted font-bold mb-0.5">মোট বিক্রি</p>
               <p className="text-lg font-black text-text-primary leading-tight">৳৪,৫০,০০০</p>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div>
               <p className="text-xs text-text-muted font-bold mb-0.5">টার্গেট পূরণ</p>
               <p className="text-lg font-black text-success leading-tight">৮২%</p>
            </div>
         </div>
         {/* Horizontal Bar Chart / Progress Bar */}
         <div className="h-2 w-full bg-background-offwhite rounded-full overflow-hidden border border-border">
            <div className="h-full bg-success rounded-full w-[82%]"></div>
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
                <Link 
                  to="/so/todo"
                  className="block w-full py-3 rounded-xl bg-accent text-white font-bold text-center shadow-md active:bg-accent-hover transition-colors"
                >
                   কাজ শুরু করুন
                </Link>
             </div>
           );
         })}
      </div>

    </div>
  );
};

export default SOHome;
