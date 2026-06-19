import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, AlertTriangle, ShieldAlert, CheckCircle2, PhoneCall, Check } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000, target: 2400 },
  { name: 'Tue', sales: 3000, target: 2400 },
  { name: 'Wed', sales: 2000, target: 2400 },
  { name: 'Thu', sales: 2780, target: 2400 },
  { name: 'Fri', sales: 1890, target: 2400 },
  { name: 'Sat', sales: 2390, target: 2400 },
  { name: 'Sun', sales: 3490, target: 2400 },
];

const ManagerHome: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
       
       {/* Top KPI Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Active Field SOs" value="24 / 28" subtext="4 currently inactive" icon={<Users className="w-6 h-6 text-blue-500 dark:text-[#38BDF8]" />} trend="neutral" />
          <KPICard title="Collection Risk Alerts" value="12" subtext="+3 since yesterday" icon={<AlertTriangle className="w-6 h-6 text-yellow-500 dark:text-[#FBBF24]" />} trend="negative" />
          <KPICard title="Route Exceptions" value="5" subtext="Requires review" icon={<ShieldAlert className="w-6 h-6 text-red-500 dark:text-[#EF4444]" />} trend="negative" />
          <KPICard title="Today's Target" value="68%" subtext="On track" icon={<CheckCircle2 className="w-6 h-6 text-green-500 dark:text-[#10B981]" />} trend="positive" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Analytics Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl h-[450px] flex flex-col relative overflow-hidden transition-colors duration-300">
             {/* Glow effect */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 dark:bg-[#38BDF8] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
             
             <div className="flex justify-between items-start mb-6 relative z-10">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Territory Performance</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Sales vs Baseline Target</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-[#1F2937] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#374151]">
                       <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-[#38BDF8]"></span> Sales
                    </span>
                 </div>
             </div>
             
             <div className="flex-grow relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                   <YAxis stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                   <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#111827', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                      itemStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
                   />
                   <Area type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Exception Inbox */}
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden transition-colors duration-300">
             {/* Glow effect */}
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-500 dark:bg-[#EF4444] rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

             <div className="flex justify-between items-center mb-6 relative z-10">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Exception Inbox</h2>
                 <span className="bg-red-100 dark:bg-[#EF4444]/20 text-red-600 dark:text-[#EF4444] text-xs font-bold px-2 py-1 rounded-md border border-red-200 dark:border-[#EF4444]/30 shadow-sm">5 New</span>
             </div>
             
             <div className="flex-grow space-y-4 overflow-y-auto relative z-10 pr-2 custom-scrollbar">
                
                <ExceptionCard 
                   type="GPS Mismatch" 
                   soName="SO-01 (Md. Faruk)" 
                   description="Checked in 2km away from Karim Paint House." 
                   color="#EF4444" 
                />
                
                <ExceptionCard 
                   type="Fast-Clicking" 
                   soName="SO-02 (Ahsan)" 
                   description="Completed visit at Dhali Super Shop in 1m 20s." 
                   color="#F59E0B" 
                />

                <ExceptionCard 
                   type="Target Missed" 
                   soName="SO-05 (Rahim)" 
                   description="Failed to collect pending dues from 3 stores." 
                   color="#F59E0B" 
                />

             </div>
          </div>

       </div>
    </div>
  );
};

// Helper Components
const KPICard = ({ title, value, subtext, icon, trend }: { title: string, value: string, subtext: string, icon: React.ReactNode, trend: 'positive' | 'negative' | 'neutral' }) => {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-gray-300 dark:hover:border-[#374151] transition-colors duration-300">
       <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide uppercase">{title}</span>
          <div className="p-2 bg-gray-50 dark:bg-[#1F2937] rounded-lg group-hover:scale-110 transition-transform">
             {icon}
          </div>
       </div>
       <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</div>
       <div className={`mt-2 text-xs font-bold ${trend === 'positive' ? 'text-green-600 dark:text-[#10B981]' : trend === 'negative' ? 'text-red-600 dark:text-[#EF4444]' : 'text-gray-500 dark:text-gray-400'}`}>
          {subtext}
       </div>
    </div>
  );
}

const ExceptionCard = ({ type, soName, description, color }: { type: string, soName: string, description: string, color: string }) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-200 dark:border-[#1F2937] flex flex-col gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-[#151f32]">
       <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
             <span className="text-sm font-bold text-gray-900 dark:text-white">{type}</span>
          </div>
          <div className="text-xs font-bold text-blue-600 dark:text-[#38BDF8]">{soName}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{description}</div>
       </div>
       
       <div className="flex gap-2 mt-1 border-t border-gray-200 dark:border-[#1F2937] pt-3">
          <button className="flex-1 flex justify-center items-center gap-1 py-1.5 bg-green-100 dark:bg-[#10B981]/10 text-green-700 dark:text-[#10B981] hover:bg-green-200 dark:hover:bg-[#10B981]/20 rounded-md text-xs font-bold transition-colors shadow-sm">
             <Check className="w-3 h-3" /> Approve
          </button>
          <button className="flex-1 flex justify-center items-center gap-1 py-1.5 bg-red-100 dark:bg-[#EF4444]/10 text-red-700 dark:text-[#EF4444] hover:bg-red-200 dark:hover:bg-[#EF4444]/20 rounded-md text-xs font-bold transition-colors shadow-sm">
             <AlertTriangle className="w-3 h-3" /> Flag
          </button>
          <button className="w-8 flex justify-center items-center py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors shadow-sm">
             <PhoneCall className="w-3 h-3" />
          </button>
       </div>
    </div>
  );
}

export default ManagerHome;
