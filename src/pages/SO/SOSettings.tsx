import React, { useState } from 'react';
import { ArrowLeft, Bell, Moon, Globe, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOSettings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
          <h2 className="text-xl font-extrabold text-text-primary leading-tight">সেটিংস</h2>
        </div>
      </div>
      
      <div className="flex-grow p-4 space-y-6">
        
        <div className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
           
           <div className="p-4 border-b-2 border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-info/10 text-info flex items-center justify-center"><Bell className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-bold text-text-primary">নোটিফিকেশন</h4>
                    <p className="text-xs text-text-muted">অ্যালার্ট ও রিমাইন্ডার</p>
                 </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="sr-only peer" />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
           </div>

           <div className="p-4 border-b-2 border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-warning/10 text-warning flex items-center justify-center"><Globe className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-bold text-text-primary">ভাষা (Language)</h4>
                    <p className="text-xs text-text-muted">বাংলা</p>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted" />
           </div>

           <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-text-secondary/10 text-text-secondary flex items-center justify-center"><Moon className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-bold text-text-primary">ডার্ক মোড</h4>
                    <p className="text-xs text-text-muted">থিম পরিবর্তন করুন</p>
                 </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="sr-only peer" />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
           </div>

        </div>

        <div className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
           <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center"><Shield className="w-5 h-5"/></div>
                 <div>
                    <h4 className="font-bold text-text-primary">প্রাইভেসি ও পলিসি</h4>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted" />
           </div>
        </div>
        
        <div className="text-center pt-6">
           <p className="text-xs font-bold text-text-muted">অ্যাপ ভার্সন ২.১.০</p>
        </div>
      </div>
    </div>
  );
};

export default SOSettings;
