import React from 'react';
import { TrendingUp, MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOHome: React.FC = () => {
  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      
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
             <p className="text-warning font-bold text-sm">2 টি দোকান</p>
           </div>
        </Link>

        <Link to="/reports" className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm active:bg-gray-50 flex flex-col items-center justify-center text-center gap-3 transition-colors">
           <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center">
              <DollarSign className="w-7 h-7" />
           </div>
           <div>
             <h3 className="font-bold text-lg text-text-primary">কালেকশন</h3>
             <p className="text-success font-bold text-sm">সব ক্লিয়ার</p>
           </div>
        </Link>

      </div>

      {/* Next Action Card */}
      <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm">
         <h2 className="font-bold text-text-secondary text-sm uppercase mb-3 tracking-wide">পরবর্তী করণীয় (Next Action)</h2>
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=150" alt="Shop" className="w-16 h-16 rounded-xl object-cover border border-border" />
               <div>
                  <h3 className="font-bold text-lg text-text-primary">Apex MegaMart</h3>
                  <p className="text-text-muted text-sm font-medium">Sector 4 Retail • 1.2km দূরে</p>
               </div>
            </div>
            <button className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-md active:bg-accent-hover">
               <ArrowRight className="w-6 h-6" />
            </button>
         </div>
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
         <Link to="/attendance" className="px-4 py-2 bg-text-primary text-white font-bold rounded-lg text-sm active:bg-text-secondary transition-colors">
            হাজিরা দেখুন
         </Link>
      </div>

    </div>
  );
};

export default SOHome;
