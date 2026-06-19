import React, { useState } from 'react';
import { AlertTriangle, Check, PhoneCall, Filter, AlertCircle, TrendingDown, Clock } from 'lucide-react';
import { exceptionReports, dealers, salesOfficers } from '../../data/mockData';

const ManagerExceptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'dues' | 'declining'>('general');

  const overdueDealers = dealers.filter(d => d.dues.overdueAmount > 0).sort((a, b) => b.dues.overdueAmount - a.dues.overdueAmount);
  const decliningDealers = dealers.filter(d => d.sales.lastMonth < d.sales.historicalAverage * 0.8); // 20% drop

  const getOfficerName = (id: string) => salesOfficers.find(o => o.id === id)?.name || id;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Exception & Risk Inbox</h2>
            <p className="text-gray-500 mt-1 font-medium">Review automated alerts, overdue collections, and declining accounts.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl text-gray-800 font-bold shadow-sm transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
       </div>

       {/* Tabs */}
       <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === 'general' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <AlertCircle className="w-4 h-4" /> Field Exceptions ({exceptionReports.length})
          </button>
          <button 
            onClick={() => setActiveTab('dues')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === 'dues' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-red-600'}`}
          >
            <Clock className="w-4 h-4" /> Overdue Dues ({overdueDealers.length})
          </button>
          <button 
            onClick={() => setActiveTab('declining')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 ${activeTab === 'declining' ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-500 hover:text-yellow-600'}`}
          >
            <TrendingDown className="w-4 h-4" /> Declining Sales ({decliningDealers.length})
          </button>
       </div>

       <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          
          {activeTab === 'general' && (
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type / Time</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sales Officer</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {exceptionReports.map(exc => (
                    <tr key={exc.id} className="hover:bg-gray-50 transition-colors">
                       <td className="p-4">
                          <div className="font-bold text-gray-900 flex items-center gap-2">
                             <AlertTriangle className={`w-4 h-4 ${exc.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                             {exc.type}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 font-medium">{new Date(exc.timestamp).toLocaleTimeString()}</div>
                       </td>
                       <td className="p-4 font-bold text-blue-600">{getOfficerName(exc.soId)}</td>
                       <td className="p-4 text-sm text-gray-700 max-w-md font-medium">{exc.description}</td>
                       <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors border border-green-200" title="Resolve">
                                <Check className="w-4 h-4" />
                             </button>
                             <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200" title="Call SO">
                                <PhoneCall className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          )}

          {activeTab === 'dues' && (
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Dealer</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned SO</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Overdue Amount</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {overdueDealers.map(dealer => (
                    <tr key={dealer.id} className="hover:bg-gray-50 transition-colors">
                       <td className="p-4">
                          <div className="font-bold text-gray-900">{dealer.name}</div>
                          <div className="text-xs text-red-500 font-bold mt-1">{dealer.dues.oldestDueDays} days overdue</div>
                       </td>
                       <td className="p-4 font-bold text-gray-700">{getOfficerName(dealer.officerId)}</td>
                       <td className="p-4 text-red-600 font-extrabold text-lg">${dealer.dues.overdueAmount.toLocaleString()}</td>
                       <td className="p-4 text-right">
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-sm transition-colors border border-blue-200">
                             Assign Collection Task
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          )}

          {activeTab === 'declining' && (
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Dealer</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned SO</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Sales</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Sales</th>
                     <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {decliningDealers.map(dealer => (
                    <tr key={dealer.id} className="hover:bg-gray-50 transition-colors">
                       <td className="p-4">
                          <div className="font-bold text-gray-900">{dealer.name}</div>
                          <div className="text-xs text-yellow-600 font-bold mt-1">Needs attention</div>
                       </td>
                       <td className="p-4 font-bold text-gray-700">{getOfficerName(dealer.officerId)}</td>
                       <td className="p-4 text-yellow-600 font-bold">${dealer.sales.lastMonth.toLocaleString()}</td>
                       <td className="p-4 text-gray-500 font-medium">${dealer.sales.historicalAverage.toLocaleString()}</td>
                       <td className="p-4 text-right">
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-sm transition-colors border border-blue-200">
                             Send Promo Offer
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          )}
       </div>
    </div>
  );
};

export default ManagerExceptions;
