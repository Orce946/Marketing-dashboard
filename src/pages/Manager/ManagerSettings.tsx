import React from 'react';
import { User, Bell, Shield, PaintBucket, Save } from 'lucide-react';
import { useTheme } from '../../layouts/ManagerLayout';

const ManagerSettings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage your account and preferences.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 dark:bg-[#38BDF8] hover:bg-blue-700 dark:hover:bg-[#0284C7] px-5 py-2.5 rounded-lg text-white font-bold transition-colors shadow-lg">
            <Save className="w-5 h-5" /> Save Changes
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Settings Sidebar */}
          <div className="col-span-1 space-y-2">
             <button className="w-full text-left px-4 py-3 rounded-lg font-bold bg-blue-50 dark:bg-[#38BDF8]/10 text-blue-600 dark:text-[#38BDF8] border border-blue-200 dark:border-[#38BDF8]/20 transition-colors">
                <span className="flex items-center gap-3"><User className="w-5 h-5" /> Profile</span>
             </button>
             <button className="w-full text-left px-4 py-3 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937] transition-colors">
                <span className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notifications</span>
             </button>
             <button className="w-full text-left px-4 py-3 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937] transition-colors">
                <span className="flex items-center gap-3"><Shield className="w-5 h-5" /> Security</span>
             </button>
             <button className="w-full text-left px-4 py-3 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937] transition-colors">
                <span className="flex items-center gap-3"><PaintBucket className="w-5 h-5" /> Appearance</span>
             </button>
          </div>

          {/* Settings Content */}
          <div className="col-span-3 space-y-6">
             
             {/* Profile Section */}
             <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-[#1F2937] pb-2">Personal Information</h3>
                
                <div className="flex items-center gap-6 mb-6">
                   <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-[#1F2937] border-2 border-gray-300 dark:border-[#374151] flex items-center justify-center font-extrabold text-2xl text-gray-800 dark:text-white">
                      SJ
                   </div>
                   <button className="px-4 py-2 bg-gray-100 dark:bg-[#1F2937] hover:bg-gray-200 dark:hover:bg-[#374151] text-gray-800 dark:text-white font-bold rounded-lg transition-colors border border-gray-200 dark:border-transparent">
                     Change Avatar
                   </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input type="text" defaultValue="Sarah Jenkins" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-[#38BDF8] font-medium" />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Role</label>
                      <input type="text" defaultValue="Regional Manager" disabled className="w-full px-4 py-2.5 bg-gray-100 dark:bg-[#1F2937] border border-gray-200 dark:border-[#374151] rounded-lg text-gray-500 dark:text-gray-400 font-medium cursor-not-allowed" />
                   </div>
                   <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <input type="email" defaultValue="sarah.jenkins@elitegroup.bd" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-[#38BDF8] font-medium" />
                   </div>
                </div>
             </div>

             {/* Preferences Section */}
             <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 shadow-xl transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-[#1F2937] pb-2">Appearance</h3>
                
                <div className="flex items-center justify-between">
                   <div>
                      <div className="font-bold text-gray-900 dark:text-white">Dark Mode</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enable a darker interface to reduce eye strain.</div>
                   </div>
                   
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleTheme} />
                     <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-[#38BDF8]"></div>
                   </label>
                </div>
             </div>

          </div>
       </div>

    </div>
  );
};

export default ManagerSettings;
