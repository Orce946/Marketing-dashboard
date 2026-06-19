import React, { useMemo } from 'react';
import { CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dealers, getRecommendedVisitPlan } from '../../data/mockData';

const SOTodo: React.FC = () => {
  const navigate = useNavigate();
  const currentUserId = 'o-1'; // Hardcoded for SO View
  
  const visitPlan = useMemo(() => getRecommendedVisitPlan(currentUserId), []);
  const pendingDealers = useMemo(() => {
    return visitPlan.map(action => {
      return dealers.find(d => d.id === action.dealerId);
    }).filter(d => d !== undefined) as typeof dealers;
  }, [visitPlan]);

  const completedTasks = 1; // Mock completed task
  const totalTasks = pendingDealers.length + completedTasks;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100) || 0;

  return (
    <div className="p-4 flex flex-col h-full max-w-lg mx-auto pb-20">
      
      <div className="mb-6">
        <div className="flex items-center gap-4 flex-shrink-0 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center active:bg-gray-100 bg-white"
          >
            <ArrowLeft className="w-6 h-6 text-text-primary" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-text-primary leading-tight">আজকের কাজ (To-Do)</h2>
          </div>
        </div>

        {/* 3 Metric Sections */}
        <div className="grid grid-cols-3 gap-3 mb-4">
           <div className="bg-white border border-border rounded-xl p-3 shadow-sm text-center">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">মোট কাজ</p>
              <p className="text-xl font-black text-text-primary">{totalTasks}</p>
           </div>
           <div className="bg-warning/10 border border-warning/20 rounded-xl p-3 shadow-sm text-center">
              <p className="text-[10px] text-warning font-bold uppercase tracking-wider mb-1">বাকি আছে</p>
              <p className="text-xl font-black text-warning">{pendingDealers.length}</p>
           </div>
           <div className="bg-success/10 border border-success/20 rounded-xl p-3 shadow-sm text-center">
              <p className="text-[10px] text-success font-bold uppercase tracking-wider mb-1">সম্পন্ন</p>
              <p className="text-xl font-black text-success">{completedTasks}</p>
           </div>
        </div>

        {/* Progress Bar Chart */}
        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
           <div className="flex justify-between text-sm font-bold text-text-secondary mb-2">
              <span>অগ্রগতি (Progress)</span>
              <span className="text-success">{completionPercentage}% সম্পন্ন</span>
           </div>
           <div className="h-2.5 w-full bg-background-offwhite rounded-full overflow-hidden border border-border">
              <div 
                className="h-full bg-success rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
           </div>
        </div>
      </div>

      <div className="flex-grow space-y-4">
        
        <h3 className="font-extrabold text-text-muted uppercase text-sm mb-2 tracking-wide">বাকি থাকা কাজ</h3>

        {visitPlan.map((action, idx) => {
           const dealer = pendingDealers.find(d => d.id === action.dealerId);
           if (!dealer) return null;

           const isHighPriority = action.priorityScore > 70;
           const borderColor = isHighPriority ? 'border-l-danger' : 'border-l-warning';
           const textColor = isHighPriority ? 'text-danger' : 'text-warning';

           return (
             <div key={idx} className={`bg-white border-l-8 ${borderColor} border-y-2 border-r-2 border-border rounded-xl p-4 shadow-sm flex flex-col gap-3`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl leading-tight">{dealer.name}</h3>
                    <p className={`text-sm font-bold ${textColor} mt-1 flex items-center gap-1`}>
                      <Clock className="w-4 h-4"/> 
                      {dealer.dues.total > 0 
                        ? `৳${(dealer.dues.total / 100000).toFixed(1)} লাখ বাকি (${dealer.dues.oldestDueDays} দিন)` 
                        : action.reason}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                   <Link to="/so/map" className="py-2.5 bg-accent/10 text-accent text-center font-bold rounded-lg text-sm active:bg-accent/20">
                      ম্যাপ দেখুন
                   </Link>
                   <Link to="/so/task-complete" className="py-2.5 bg-success text-white text-center font-bold rounded-lg text-sm active:bg-success/90">
                      ভিজিট সম্পন্ন
                   </Link>
                </div>
             </div>
           );
        })}

        <h3 className="font-extrabold text-text-muted uppercase text-sm mt-8 mb-2 tracking-wide">সম্পন্ন হওয়া কাজ</h3>

        {/* Completed Task 1 (Mock Data) */}
        <div className="bg-white border-2 border-success/30 rounded-xl p-4 shadow-sm flex items-center justify-between opacity-80">
           <div>
             <h3 className="font-bold text-lg leading-tight line-through decoration-2 decoration-success/50">Apex MegaMart</h3>
             <p className="text-sm font-bold text-success mt-1">পেমেন্ট কালেক্টেড</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-success text-white flex items-center justify-center">
             <CheckCircle className="w-6 h-6" />
           </div>
        </div>

      </div>

    </div>
  );
};

export default SOTodo;
