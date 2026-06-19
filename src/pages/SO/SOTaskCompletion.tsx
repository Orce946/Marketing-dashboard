import React, { useState } from 'react';
import { Camera, Save, ArrowLeft, FileText, DollarSign, PenTool, Package, Megaphone, Users, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOTaskCompletion: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const [collectionAmount, setCollectionAmount] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [bannerPlaced, setBannerPlaced] = useState(false);
  const [campaignExplained, setCampaignExplained] = useState(false);
  const [competitorInfo, setCompetitorInfo] = useState('');
  const [dealerComplaints, setDealerComplaints] = useState('');
  const [nextFollowUp, setNextFollowUp] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    navigate('/so/todo');
  };

  return (
    <div className="flex flex-col h-full bg-background-offwhite">
      
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b-2 border-border p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center active:bg-gray-100 transition-colors"
        >
           <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-text-primary leading-tight">ভিজিট রিপোর্ট (Task Completion)</h2>
          <p className="text-xs font-bold text-accent">Rahim Store</p>
        </div>
      </div>

      <div className="flex-grow p-4 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Quick Status Selection */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm">
             <h3 className="font-extrabold text-lg mb-4 text-text-primary">ভিজিটের প্রধান ফলাফল কী? <span className="text-danger">*</span></h3>
             <div className="grid grid-cols-2 gap-3">
                <button 
                   type="button"
                   onClick={() => setStatus('success')}
                   className={`py-3 px-2 border-2 rounded-xl font-bold text-sm transition-all ${status === 'success' ? 'border-success bg-success/10 text-success' : 'border-border text-text-secondary active:bg-gray-50'}`}
                >
                   অর্ডার/পেমেন্ট পেয়েছি
                </button>
                <button 
                   type="button"
                   onClick={() => setStatus('later')}
                   className={`py-3 px-2 border-2 rounded-xl font-bold text-sm transition-all ${status === 'later' ? 'border-warning bg-warning/10 text-warning' : 'border-border text-text-secondary active:bg-gray-50'}`}
                >
                   পরে দেবে বলেছে
                </button>
                <button 
                   type="button"
                   onClick={() => setStatus('closed')}
                   className={`py-3 px-2 border-2 rounded-xl font-bold text-sm transition-all ${status === 'closed' ? 'border-danger bg-danger/10 text-danger' : 'border-border text-text-secondary active:bg-gray-50'}`}
                >
                   দোকান বন্ধ
                </button>
                <button 
                   type="button"
                   onClick={() => setStatus('absent')}
                   className={`py-3 px-2 border-2 rounded-xl font-bold text-sm transition-all ${status === 'absent' ? 'border-info bg-info/10 text-info' : 'border-border text-text-secondary active:bg-gray-50'}`}
                >
                   মালিক নেই
                </button>
             </div>
          </div>

          {/* Current Stock Check */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm space-y-4">
             <h3 className="font-extrabold text-lg text-text-primary flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                স্টক চেক (Stock Info)
             </h3>
             <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">এলিট প্রোডাক্টের বর্তমান স্টক (পিস/কার্টন)</label>
                <input 
                  type="text" 
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  placeholder="যেমন: 20 পিস, 2 কার্টন"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border font-bold text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
             </div>
          </div>

          {/* Promotional Activity */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm space-y-4">
             <h3 className="font-extrabold text-lg text-text-primary flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-accent" />
                প্রোমোশনাল অ্যাক্টিভিটি
             </h3>
             <label className="flex items-center gap-3 p-3 border-2 border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
               <input 
                 type="checkbox" 
                 checked={bannerPlaced}
                 onChange={(e) => setBannerPlaced(e.target.checked)}
                 className="w-5 h-5 accent-accent"
               />
               <span className="font-bold text-sm text-text-primary">নতুন ব্যানার/পোস্টার লাগানো হয়েছে</span>
             </label>
             <label className="flex items-center gap-3 p-3 border-2 border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
               <input 
                 type="checkbox" 
                 checked={campaignExplained}
                 onChange={(e) => setCampaignExplained(e.target.checked)}
                 className="w-5 h-5 accent-accent"
               />
               <span className="font-bold text-sm text-text-primary">নতুন ক্যাম্পেইন সম্পর্কে বোঝানো হয়েছে</span>
             </label>
          </div>

          {/* Financials & Order */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm space-y-5">
             <h3 className="font-extrabold text-lg text-text-primary flex items-center gap-2">
                <PenTool className="w-5 h-5 text-accent" />
                কালেকশন ও নতুন অর্ডার
             </h3>
             <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 flex items-center gap-1">
                   <DollarSign className="w-4 h-4 text-success" />
                   কালেকশন পরিমাণ (৳)
                </label>
                <input 
                  type="number" 
                  value={collectionAmount}
                  onChange={(e) => setCollectionAmount(e.target.value)}
                  placeholder="যেমন: 5000"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border font-bold text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
             </div>
             <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 flex items-center gap-1">
                   <FileText className="w-4 h-4 text-info" />
                   নতুন অর্ডারের বিবরণ
                </label>
                <textarea 
                  value={orderDetails}
                  onChange={(e) => setOrderDetails(e.target.value)}
                  placeholder="কোন প্রোডাক্ট, কত পিস..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border font-bold text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
             </div>
          </div>

          {/* Competitor & Feedback */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm space-y-5">
             <h3 className="font-extrabold text-lg text-text-primary flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                কম্পিটিটর ও ফিডব্যাক
             </h3>
             <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">কম্পিটিটর ইনফরমেশন (অফার/ডিসকাউন্ট)</label>
                <textarea 
                  value={competitorInfo}
                  onChange={(e) => setCompetitorInfo(e.target.value)}
                  placeholder="অন্যান্য কোম্পানির কি অফার চলছে..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border font-bold text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
             </div>
             <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 flex items-center gap-1">
                   <AlertTriangle className="w-4 h-4 text-warning" />
                   ডিলারের কোনো অভিযোগ বা সমস্যা
                </label>
                <textarea 
                  value={dealerComplaints}
                  onChange={(e) => setDealerComplaints(e.target.value)}
                  placeholder="ডেলিভারি সমস্যা, ড্যামেজ প্রোডাক্ট..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border font-bold text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
             </div>
          </div>

          {/* Next Follow-up Date */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm">
             <h3 className="font-extrabold text-lg text-text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                পরবর্তী ভিজিট/ফলো-আপ
             </h3>
             <input 
               type="date" 
               value={nextFollowUp}
               onChange={(e) => setNextFollowUp(e.target.value)}
               className="w-full px-4 py-3 rounded-xl border-2 border-border font-bold text-text-primary focus:outline-none focus:border-accent transition-colors"
             />
          </div>

          {/* Photo Upload */}
          <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm">
             <h3 className="font-extrabold text-lg mb-4 text-text-primary">দোকানের ছবি (প্রমাণ)</h3>
             <button type="button" className="w-full h-32 border-4 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-text-muted hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <Camera className="w-10 h-10 mb-2" />
                <span className="font-bold text-sm">ক্যামেরা চালু করুন</span>
             </button>
          </div>

        </form>
      </div>

      {/* Fixed Bottom Submit Button */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-border shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20 pb-safe mt-auto">
         <button 
            onClick={handleSubmit}
            className="w-full py-4 bg-accent text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform"
         >
            <Save className="w-6 h-6" />
            রিপোর্ট সাবমিট করুন
         </button>
      </div>

    </div>
  );
};

export default SOTaskCompletion;
