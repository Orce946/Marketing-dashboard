import React, { useState } from 'react';
import { Phone, MapPin, Star, Bot, Target, ListChecks, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { salesOfficers, aiCoachingInsights, weeklyActionPoints } from '../../data/mockData';

const ManagerTeam: React.FC = () => {
  const [expandedSO, setExpandedSO] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedSO(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Directory & Coaching</h2>
            <p className="text-gray-500 mt-1 font-medium">Manage, evaluate, and skill-up your Sales Officers with AI Co-Pilot.</p>
          </div>
          <button className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-xl font-bold transition-colors shadow-sm">
            + Add New Officer
          </button>
       </div>

       <div className="grid grid-cols-1 gap-6">
          {salesOfficers.map(member => {
             const coaching = aiCoachingInsights.find(c => c.soId === member.id);
             const actions = weeklyActionPoints.filter(a => a.soId === member.id);
             const isExpanded = expandedSO === member.id;

             return (
               <div key={member.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
                  
                  {/* Header Row */}
                  <div className="p-6 flex flex-wrap gap-4 justify-between items-center bg-white cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleExpand(member.id)}>
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center font-bold text-blue-700 text-xl">
                           {member.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="font-extrabold text-lg text-gray-900 leading-tight flex items-center gap-2">
                             {member.name}
                             <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-bold border border-yellow-200">
                                <Star className="w-3 h-3 fill-current" /> 4.8
                             </span>
                           </h3>
                           <div className="text-sm text-gray-500 font-medium mt-1 flex items-center gap-4">
                              <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {member.dealersCount} Dealers</span>
                              <span className="flex items-center gap-1"><Phone className="w-4 h-4"/> +880 1711-00000X</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="text-right">
                           <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">YTD Sales</p>
                           <p className="font-extrabold text-green-600">${member.totalSales.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Dues</p>
                           <p className="font-extrabold text-red-600">${member.totalDues.toLocaleString()}</p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                           {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </button>
                     </div>
                  </div>

                  {/* Expanded Coaching & Actions Panel */}
                  {isExpanded && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 grid grid-cols-1 lg:grid-cols-2 gap-6">
                       
                       {/* AI Coaching Panel */}
                       <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>
                          
                          <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                             <Bot className="w-5 h-5 text-blue-600" /> Co-Pilot Skill-Up Insights
                          </h4>
                          
                          {coaching ? (
                            <div className="space-y-4 relative z-10">
                               <div className="grid grid-cols-2 gap-4">
                                  <div>
                                     <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Strengths</p>
                                     <ul className="space-y-1">
                                        {coaching.strengths.map((s, i) => <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"/> {s}</li>)}
                                     </ul>
                                  </div>
                                  <div>
                                     <p className="text-xs font-bold text-red-600 uppercase mb-2">Areas for Growth</p>
                                     <ul className="space-y-1">
                                        {coaching.weaknesses.map((w, i) => <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><Target className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"/> {w}</li>)}
                                     </ul>
                                  </div>
                               </div>
                               
                               <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 mt-2">
                                  <p className="text-xs font-bold text-blue-800 uppercase mb-1">Recommended Coaching Action</p>
                                  <p className="text-sm text-blue-900 font-medium">{coaching.suggestedActions[0]}</p>
                               </div>

                               <div className="bg-gray-100 rounded-xl p-3 border border-gray-200 mt-2">
                                  <p className="text-xs font-bold text-gray-600 uppercase mb-1">Suggested Script (Share with SO)</p>
                                  <p className="text-sm text-gray-800 italic">"{coaching.scriptRecommendation}"</p>
                               </div>
                               
                               <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mt-2 text-sm">
                                  Send Script to SO
                               </button>
                            </div>
                          ) : (
                             <p className="text-sm text-gray-500 italic">Not enough data to generate insights yet.</p>
                          )}
                       </div>

                       {/* Action Points / Follow ups */}
                       <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                          <div className="flex justify-between items-center mb-4">
                             <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                <ListChecks className="w-5 h-5 text-emerald-600" /> Weekly Action Points
                             </h4>
                             <button className="text-xs font-bold text-blue-600 hover:underline">Add Task</button>
                          </div>
                          
                          <div className="space-y-3">
                             {actions.length > 0 ? actions.map(act => (
                               <div key={act.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                  <div className="flex-grow">
                                     <p className="text-sm font-bold text-gray-900">{act.task}</p>
                                     <p className="text-xs text-red-500 font-bold mt-0.5">Due: {act.dueDate}</p>
                                  </div>
                               </div>
                             )) : (
                               <p className="text-sm text-gray-500 italic">No action points assigned.</p>
                             )}
                          </div>
                       </div>

                    </div>
                  )}
               </div>
             );
          })}
       </div>
    </div>
  );
};

export default ManagerTeam;
