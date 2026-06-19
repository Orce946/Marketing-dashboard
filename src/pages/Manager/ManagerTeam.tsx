import React from 'react';
import { Mail, Phone, MapPin, Star } from 'lucide-react';

const ManagerTeam: React.FC = () => {
  const team = [
    { id: 'SO-01', name: 'Md. Faruk', role: 'Senior Sales Officer', region: 'Dhaka North', phone: '+880 1711-000001', rating: 4.8 },
    { id: 'SO-02', name: 'Ahsan', role: 'Sales Officer', region: 'Dhaka South', phone: '+880 1711-000002', rating: 4.2 },
    { id: 'SO-03', name: 'Kamrul', role: 'Sales Officer', region: 'Gazipur', phone: '+880 1711-000003', rating: 4.5 },
    { id: 'SO-04', name: 'Hasan', role: 'Junior Officer', region: 'Narayanganj', phone: '+880 1711-000004', rating: 3.9 },
    { id: 'SO-05', name: 'Rahim', role: 'Sales Officer', region: 'Savar', phone: '+880 1711-000005', rating: 4.1 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Directory</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage and contact your Sales Officers.</p>
          </div>
          <button className="bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-4 py-2 rounded-lg font-bold transition-colors shadow-lg">
            + Add New Officer
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
             <div key={member.id} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl hover:border-blue-300 dark:hover:border-[#38BDF8]/50 transition-colors duration-300 group">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#1F2937] border-2 border-gray-300 dark:border-[#374151] flex items-center justify-center font-bold text-gray-800 dark:text-white group-hover:border-blue-500 dark:group-hover:border-[#38BDF8] transition-colors">
                         {member.name.charAt(0)}
                      </div>
                      <div>
                         <h3 className="font-extrabold text-lg text-gray-900 dark:text-white leading-tight">{member.name}</h3>
                         <p className="text-xs text-blue-600 dark:text-[#38BDF8] font-bold mt-0.5">{member.role}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-1 bg-yellow-100 dark:bg-[#FBBF24]/10 text-yellow-600 dark:text-[#FBBF24] px-2 py-1 rounded-md text-xs font-bold border border-yellow-200 dark:border-[#FBBF24]/20">
                      <Star className="w-3 h-3 fill-current" /> {member.rating}
                   </div>
                </div>

                <div className="space-y-3 mt-6">
                   <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {member.region}
                   </div>
                   <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {member.phone}
                   </div>
                   <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" /> {member.name.toLowerCase().replace(' ', '.')}@elitegroup.bd
                   </div>
                </div>

                <div className="mt-6 flex gap-2">
                   <button className="flex-1 py-2 bg-gray-100 dark:bg-[#1F2937] hover:bg-gray-200 dark:hover:bg-[#374151] text-gray-800 dark:text-white text-sm font-bold rounded-lg transition-colors border border-gray-200 dark:border-transparent">
                     View Profile
                   </button>
                   <button className="flex-1 py-2 bg-blue-50 dark:bg-[#38BDF8]/10 hover:bg-blue-100 dark:hover:bg-[#38BDF8]/20 text-blue-600 dark:text-[#38BDF8] text-sm font-bold rounded-lg transition-colors border border-blue-200 dark:border-[#38BDF8]/20">
                     Message
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default ManagerTeam;
