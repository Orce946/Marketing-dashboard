import React from 'react';
import { Download, FileSpreadsheet, Search } from 'lucide-react';

const ManagerReports: React.FC = () => {
  const reports = [
    { id: 'REP-102', date: '2023-10-24', soName: 'Md. Faruk', region: 'Dhaka North', score: '92%', status: 'Submitted' },
    { id: 'REP-103', date: '2023-10-24', soName: 'Ahsan', region: 'Dhaka South', score: '78%', status: 'Submitted' },
    { id: 'REP-104', date: '2023-10-24', soName: 'Kamrul', region: 'Gazipur', score: '-', status: 'Pending' },
    { id: 'REP-105', date: '2023-10-23', soName: 'Hasan', region: 'Narayanganj', score: '100%', status: 'Reviewed' },
    { id: 'REP-106', date: '2023-10-23', soName: 'Rahim', region: 'Savar', score: '65%', status: 'Reviewed' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Reports</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Review end-of-day Excel submissions from Sales Officers.</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search by name or region..." 
                  className="pl-10 pr-4 py-2 bg-white dark:bg-[#111827] border border-gray-300 dark:border-[#1F2937] rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#38BDF8] transition-colors shadow-sm font-semibold"
                />
             </div>
             <button className="flex items-center gap-2 bg-blue-600 dark:bg-[#38BDF8] hover:bg-blue-700 dark:hover:bg-[#0284C7] px-4 py-2 rounded-lg text-white font-bold transition-colors shadow-lg">
               <Download className="w-4 h-4" /> Export All
             </button>
          </div>
       </div>

       <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-gray-50 dark:bg-[#0B1120] border-b border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Report ID / Date</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Officer</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Region</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Score</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                   <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">File</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 dark:divide-[#1F2937]">
                {reports.map(rep => (
                  <tr key={rep.id} className="hover:bg-gray-50 dark:hover:bg-[#151f32] transition-colors duration-300">
                     <td className="p-4">
                        <div className="font-bold text-gray-900 dark:text-white">{rep.id}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{rep.date}</div>
                     </td>
                     <td className="p-4 font-bold text-gray-900 dark:text-white">{rep.soName}</td>
                     <td className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">{rep.region}</td>
                     <td className="p-4 font-bold text-green-600 dark:text-[#10B981]">{rep.score}</td>
                     <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                           rep.status === 'Submitted' ? 'bg-blue-100 dark:bg-[#38BDF8]/10 text-blue-700 dark:text-[#38BDF8] border border-blue-200 dark:border-[#38BDF8]/30' :
                           rep.status === 'Reviewed' ? 'bg-green-100 dark:bg-[#10B981]/10 text-green-700 dark:text-[#10B981] border border-green-200 dark:border-[#10B981]/30' :
                           'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700'
                        }`}>
                           {rep.status}
                        </span>
                     </td>
                     <td className="p-4 text-right">
                        <button 
                           disabled={rep.status === 'Pending'}
                           className={`p-2 rounded-md transition-colors ${rep.status === 'Pending' ? 'bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'bg-green-100 dark:bg-[#10B981]/10 text-green-600 dark:text-[#10B981] hover:bg-green-200 dark:hover:bg-[#10B981]/20'}`}
                           title="Download XLS"
                        >
                           <FileSpreadsheet className="w-5 h-5" />
                        </button>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

export default ManagerReports;
