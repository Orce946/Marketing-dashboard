import React from 'react';
import { AlertTriangle, Check, PhoneCall, Filter } from 'lucide-react';

const ManagerExceptions: React.FC = () => {
  const exceptions = [
    { id: 1, type: "GPS Mismatch", soName: "SO-01 (Md. Faruk)", time: "10:23 AM", description: "Checked in 2.5km away from Rahim Store.", status: "Pending" },
    { id: 2, type: "Fast-Clicking", soName: "SO-02 (Ahsan)", time: "11:45 AM", description: "Completed visit at Dhali Super Shop in 1m 20s.", status: "Pending" },
    { id: 3, type: "Target Missed", soName: "SO-05 (Rahim)", time: "02:15 PM", description: "Failed to collect pending dues from 3 stores in Gulshan.", status: "Flagged" },
    { id: 4, type: "Late Start", soName: "SO-04 (Hasan)", time: "09:30 AM", description: "Punched in 30 minutes late.", status: "Resolved" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exception Inbox</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Review automated alerts and policy deviations.</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-100 dark:bg-[#1F2937] hover:bg-gray-200 dark:hover:bg-[#374151] px-4 py-2 rounded-lg text-gray-800 dark:text-white font-bold transition-colors border border-gray-200 dark:border-transparent">
            <Filter className="w-4 h-4" /> Filter Alerts
          </button>
       </div>

       <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-gray-50 dark:bg-[#0B1120] border-b border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type / Time</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sales Officer</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 dark:divide-[#1F2937]">
                {exceptions.map(exc => (
                  <tr key={exc.id} className="hover:bg-gray-50 dark:hover:bg-[#151f32] transition-colors duration-300">
                     <td className="p-4">
                        <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                           {exc.type === 'GPS Mismatch' || exc.type === 'Late Start' ? <AlertTriangle className="w-4 h-4 text-red-500 dark:text-[#EF4444]" /> : <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-[#FBBF24]" />}
                           {exc.type}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{exc.time}</div>
                     </td>
                     <td className="p-4 font-bold text-blue-600 dark:text-[#38BDF8]">{exc.soName}</td>
                     <td className="p-4 text-sm text-gray-700 dark:text-gray-300 max-w-md font-medium">{exc.description}</td>
                     <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                           exc.status === 'Pending' ? 'bg-yellow-100 dark:bg-[#FBBF24]/10 text-yellow-700 dark:text-[#FBBF24] border border-yellow-200 dark:border-[#FBBF24]/30' :
                           exc.status === 'Resolved' ? 'bg-green-100 dark:bg-[#10B981]/10 text-green-700 dark:text-[#10B981] border border-green-200 dark:border-[#10B981]/30' :
                           'bg-red-100 dark:bg-[#EF4444]/10 text-red-700 dark:text-[#EF4444] border border-red-200 dark:border-[#EF4444]/30'
                        }`}>
                           {exc.status}
                        </span>
                     </td>
                     <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                           <button className="p-2 bg-green-100 dark:bg-[#10B981]/10 text-green-600 dark:text-[#10B981] hover:bg-green-200 dark:hover:bg-[#10B981]/20 rounded-md transition-colors" title="Approve/Resolve">
                              <Check className="w-4 h-4" />
                           </button>
                           <button className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors" title="Call SO">
                              <PhoneCall className="w-4 h-4" />
                           </button>
                        </div>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

export default ManagerExceptions;
