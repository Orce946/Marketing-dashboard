import React from 'react';
import { Store, Phone, MapPin, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dealers } from '../../data/mockData';

const SODealerInputs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-20">
      
      <div className="sticky top-0 bg-background-offwhite z-10 py-2 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 flex-shrink-0 rounded-full border border-border flex items-center justify-center active:bg-gray-100 bg-white"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-muted" />
          <input 
            type="text" 
            placeholder="ডিলার খুঁজুন..." 
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-border text-lg font-bold shadow-sm focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="space-y-4">
        {dealers.map((dealer, index) => (
          <div key={dealer.id} className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
             <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-text-primary leading-tight">{dealer.name}</h3>
                    <p className="text-text-secondary font-medium mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4"/> {dealer.location.address}
                    </p>
                    {dealer.dues.overdueAmount > 0 ? (
                      <p className="text-warning font-bold mt-2">৳{dealer.dues.overdueAmount.toLocaleString()} বাকি ({dealer.dues.oldestDueDays} দিন)</p>
                    ) : (
                      <p className="text-success font-bold mt-2">কোন বকেয়া নেই</p>
                    )}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Store className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                   <button 
                     onClick={() => alert(`Taking order for ${dealer.name}`)}
                     className="py-3 bg-accent text-white font-bold rounded-xl active:bg-accent-hover text-center"
                   >
                      অর্ডার নিন
                   </button>
                   <button 
                     onClick={() => alert(`Calling ${dealer.name}`)}
                     className="py-3 bg-white border border-border text-text-primary flex items-center justify-center gap-2 font-bold rounded-xl active:bg-gray-50 text-center"
                   >
                      <Phone className="w-5 h-5"/> কল করুন
                   </button>
                </div>
                
                {index < 2 && (
                  <div className="mt-4 border-t border-border pt-4">
                     <p className="text-sm font-medium text-text-secondary mb-2">ফিডব্যাক (জিরো টাইপিং)</p>
                     <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                        <button className="snap-start flex-shrink-0 px-4 py-2 border-2 border-border rounded-lg font-bold text-sm text-text-primary active:bg-border">মালিক নেই</button>
                        <button className="snap-start flex-shrink-0 px-4 py-2 border-2 border-border rounded-lg font-bold text-sm text-text-primary active:bg-border">পরে টাকা দেবে</button>
                        <button className="snap-start flex-shrink-0 px-4 py-2 border-2 border-border rounded-lg font-bold text-sm text-text-primary active:bg-border">দোকান বন্ধ</button>
                     </div>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SODealerInputs;
