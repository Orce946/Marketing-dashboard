import React from 'react';
import { ArrowLeft, Phone, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-offwhite">
      <div className="flex-shrink-0 bg-white border-b-2 border-border p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center active:bg-gray-100 transition-colors"
        >
           <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-text-primary leading-tight">প্রোফাইল</h2>
        </div>
      </div>
      
      <div className="flex-grow p-4 space-y-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-border shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg mb-4">
            MK
          </div>
          <h3 className="text-2xl font-extrabold text-text-primary">Michael K.</h3>
          <p className="text-sm font-bold text-text-secondary mt-1">সেলস অফিসার</p>
          <div className="mt-4 px-4 py-1.5 bg-success/10 text-success rounded-full text-xs font-bold border border-success/20">
            স্ট্যাটাস: ডিউটিতে আছেন
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-border shadow-sm space-y-4">
          <h4 className="font-extrabold text-lg text-text-primary border-b-2 border-border pb-2">ব্যক্তিগত তথ্য</h4>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center"><Phone className="w-5 h-5"/></div>
             <div>
                <p className="text-xs font-bold text-text-muted">মোবাইল নাম্বার</p>
                <p className="font-bold text-text-primary">+880 1711-223344</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center"><MapPin className="w-5 h-5"/></div>
             <div>
                <p className="text-xs font-bold text-text-muted">এলাকা/ব্রাঞ্চ</p>
                <p className="font-bold text-text-primary">মিরপুর জোন</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center"><Briefcase className="w-5 h-5"/></div>
             <div>
                <p className="text-xs font-bold text-text-muted">কর্মচারী আইডি</p>
                <p className="font-bold text-text-primary">EMP-2024-089</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOProfile;
