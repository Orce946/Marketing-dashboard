import React, { useMemo } from 'react';
import { Users, AlertTriangle, DollarSign, TrendingUp, Target, Activity } from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';
import { dealers, salesOfficers, getAllAlerts, historicalSalesData, getHighPotentialCustomers } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ManagerHome: React.FC = () => {
  const alerts = getAllAlerts();
  const highPotentialDealers = getHighPotentialCustomers();

  const { totalSales, totalDues } = useMemo(() => {
    let sales = 0;
    let dues = 0;
    dealers.forEach(d => {
      sales += d.sales.ytd;
      dues += d.dues.total;
    });
    return { totalSales: sales, totalDues: dues };
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
       
       {/* Top KPI Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Territory Sales" 
            value={`$${totalSales.toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard 
            title="Total Outstanding Dues" 
            value={`$${totalDues.toLocaleString()}`}
            icon={<AlertTriangle className="w-6 h-6" />}
            trend={{ value: 5, isPositive: false }}
          />
          <MetricCard 
            title="Active Risk Alerts" 
            value={alerts.length}
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
            className="border-red-200 bg-red-50"
          />
          <MetricCard 
            title="Active Sales Officers" 
            value={salesOfficers.length}
            icon={<Users className="w-6 h-6" />}
          />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Daily Sales & Collection Performance Chart */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
             <div className="flex justify-between items-start mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600"/> Daily Sales & Collection Performance
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Actual vs Target Sales, and Dues Collected over the last 7 days</p>
                 </div>
             </div>
             <div className="flex-grow w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalSalesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                    <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="sales" name="Actual Sales" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="target" name="Target Sales" fill="#93C5FD" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="collection" name="Dues Collected" fill="#10B981" radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Territory-wise Activity / Market Feedback */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
             <div className="mb-6">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-blue-600"/> Market Feedback
                 </h2>
                 <p className="text-sm text-gray-500 mt-1">Recent updates from the field</p>
             </div>
             <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
                {dealers.map((dealer) => dealer.activities.map(act => (
                  <div key={act.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold">{dealer.name.charAt(0)}</span>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">{dealer.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{act.date} • {act.type.toUpperCase()}</div>
                        <div className="text-sm text-gray-700 italic">"{act.notes}"</div>
                    </div>
                  </div>
                ))).flat().slice(0, 5)}
             </div>
          </div>

          {/* High-Potential Customers */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
             <div className="mb-6">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   <Target className="w-5 h-5 text-emerald-600"/> High-Potential Customers
                 </h2>
                 <p className="text-sm text-gray-500 mt-1">AI-identified dealers ready for upsell based on zero dues & historical volume</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highPotentialDealers.map(dealer => (
                  <div key={dealer.id} className="p-4 border border-gray-200 rounded-xl hover:border-emerald-500 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{dealer.name}</div>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">Prime</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{dealer.location.address}</div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500">YTD Sales: <span className="font-bold text-gray-900">${dealer.sales.ytd.toLocaleString()}</span></div>
                      <button className="text-emerald-600 text-xs font-bold hover:underline">Draft Offer</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Exception Inbox Preview */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-500 rounded-full blur-[80px] opacity-5 pointer-events-none"></div>
             <div className="flex justify-between items-center mb-6 relative z-10">
                 <h2 className="text-xl font-bold text-gray-900">Risk Inbox</h2>
                 <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">{alerts.length} New</span>
             </div>
             <div className="flex-grow space-y-3 overflow-y-auto relative z-10 pr-2 custom-scrollbar max-h-[300px]">
                {alerts.slice(0, 4).map((alert, idx) => (
                  <div key={idx} className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex flex-col gap-2 transition-colors hover:bg-red-50">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${alert.type === 'collection' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                      <span className="text-xs font-bold text-gray-900 capitalize">{alert.type} Alert</span>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-blue-600">{alert.dealer.name}</div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">{alert.message}</div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-center text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors mt-2">
                  View All Exceptions
                </button>
             </div>
          </div>

       </div>
    </div>
  );
};

export default ManagerHome;
