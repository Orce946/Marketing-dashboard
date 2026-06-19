import React from 'react';
import { CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SOTodo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col h-full max-w-lg mx-auto pb-20">
      
      <div className="flex items-center gap-4 flex-shrink-0 mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center active:bg-gray-100 bg-white"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-text-primary mb-1 leading-tight">আজকের কাজ (To-Do)</h2>
          <p className="text-text-muted font-bold text-sm">৩টি ভিজিট বাকি, ২টি সম্পন্ন</p>
        </div>
      </div>

      <div className="flex-grow space-y-4">
        
        {/* Pending Task 1 */}
        <div className="bg-white border-l-8 border-l-warning border-y-2 border-r-2 border-border rounded-xl p-4 shadow-sm flex flex-col gap-3">
           <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold text-xl leading-tight">Rahim Store</h3>
               <p className="text-sm font-bold text-warning mt-1 flex items-center gap-1">
                 <Clock className="w-4 h-4"/> ৳1.2 লাখ বাকি (45 দিন)
               </p>
             </div>
           </div>
           <div className="grid grid-cols-2 gap-2 mt-2">
              <Link to="/map" className="py-2.5 bg-accent/10 text-accent text-center font-bold rounded-lg text-sm active:bg-accent/20">
                 ম্যাপ দেখুন
              </Link>
              <Link to="/task-complete" className="py-2.5 bg-success text-white text-center font-bold rounded-lg text-sm active:bg-success/90">
                 ভিজিট সম্পন্ন
              </Link>
           </div>
        </div>

        {/* Pending Task 2 */}
        <div className="bg-white border-l-8 border-l-danger border-y-2 border-r-2 border-border rounded-xl p-4 shadow-sm flex flex-col gap-3">
           <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold text-xl leading-tight">Prime Building</h3>
               <p className="text-sm font-bold text-danger mt-1 flex items-center gap-1">
                 <Clock className="w-4 h-4"/> ৳7.5 লাখ বাকি (65 দিন)
               </p>
             </div>
           </div>
           <div className="grid grid-cols-2 gap-2 mt-2">
              <Link to="/map" className="py-2.5 bg-accent/10 text-accent text-center font-bold rounded-lg text-sm active:bg-accent/20">
                 ম্যাপ দেখুন
              </Link>
              <Link to="/task-complete" className="py-2.5 bg-success text-white text-center font-bold rounded-lg text-sm active:bg-success/90">
                 ভিজিট সম্পন্ন
              </Link>
           </div>
        </div>

        <h3 className="font-extrabold text-text-muted uppercase text-sm mt-8 mb-2 tracking-wide">সম্পন্ন হওয়া কাজ</h3>

        {/* Completed Task 1 */}
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
