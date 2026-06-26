import React, { useState } from 'react';
import { User, Bell, Shield, PaintBucket, Save, Camera, Mail, Lock, Key } from 'lucide-react';
import { useTheme } from '../../layouts/ManagerLayout';

const ManagerSettings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: PaintBucket },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
       <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage your account and preferences.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 dark:bg-[#38BDF8] hover:bg-blue-700 dark:hover:bg-[#0284C7] px-5 py-2.5 rounded-lg text-white font-bold transition-colors shadow-lg">
            <Save className="w-5 h-5" /> Save Changes
          </button>
       </div>

       {/* Horizontal Tab Bar */}
       <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] p-2 rounded-2xl flex items-center gap-2 overflow-x-auto shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-[#38BDF8]/10 text-blue-600 dark:text-[#38BDF8]' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937]'
                }`}
              >
                <Icon className="w-5 h-5" /> {tab.label}
              </button>
            );
          })}
       </div>

       {/* Content Area */}
       <div className="mt-6">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 md:p-8 shadow-xl transition-colors duration-300 animate-in fade-in slide-in-from-bottom-2">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-[#1F2937] pb-4">Personal Information</h3>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-[#1F2937] border-4 border-white dark:border-[#111827] shadow-lg flex items-center justify-center font-extrabold text-3xl text-blue-600 dark:text-white">
                       SJ
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 dark:bg-[#38BDF8] text-white rounded-full border-2 border-white dark:border-[#111827] hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 dark:text-white text-lg">Sarah Jenkins</h4>
                     <p className="text-gray-500 dark:text-gray-400 text-sm">Update your photo and personal details here.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                     <input type="text" defaultValue="Sarah Jenkins" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium transition-all" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Role</label>
                     <input type="text" defaultValue="Regional Manager" disabled className="w-full px-4 py-3 bg-gray-100 dark:bg-[#1F2937] border border-gray-200 dark:border-[#374151] rounded-xl text-gray-500 dark:text-gray-400 font-medium cursor-not-allowed" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                     <div className="relative">
                       <Mail className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                       <input type="email" defaultValue="sarah.jenkins@elitegroup.bd" className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium transition-all" />
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 md:p-8 shadow-xl transition-colors duration-300 animate-in fade-in slide-in-from-bottom-2">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-[#1F2937] pb-4">Notification Preferences</h3>
               
               <div className="space-y-6">
                 {[
                   { title: 'Push Notifications', desc: 'Receive alerts when an SO triggers an exception.', default: true },
                   { title: 'Daily Report Emails', desc: 'Get a summary of team performance every evening.', default: true },
                   { title: 'Low Battery Alerts', desc: 'Notify when an SO device drops below 15%.', default: false },
                   { title: 'New Messages', desc: 'Alert when a team member sends a direct message.', default: true },
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-[#1F2937] hover:bg-gray-50 dark:hover:bg-[#1F2937]/50 transition-colors">
                      <div>
                         <div className="font-bold text-gray-900 dark:text-white">{item.title}</div>
                         <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.default} />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-[#38BDF8]"></div>
                      </label>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
             <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 md:p-8 shadow-xl transition-colors duration-300 animate-in fade-in slide-in-from-bottom-2">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-[#1F2937] pb-4">Password & Security</h3>
               
               <div className="space-y-6 max-w-2xl">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                       <Lock className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                       <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium transition-all" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                    <div className="relative">
                       <Key className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                       <input type="password" placeholder="Enter new password" className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium transition-all" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                    <div className="relative">
                       <Key className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                       <input type="password" placeholder="Confirm new password" className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-[#374151] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium transition-all" />
                    </div>
                 </div>
                 <button className="mt-4 px-6 py-3 bg-gray-100 dark:bg-[#1F2937] text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-[#374151] transition-colors border border-gray-200 dark:border-transparent">
                    Update Password
                 </button>
               </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1F2937] rounded-2xl p-6 md:p-8 shadow-xl transition-colors duration-300 animate-in fade-in slide-in-from-bottom-2">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-[#1F2937] pb-4">Theme Preferences</h3>
               
               <div className="flex items-center justify-between p-6 rounded-xl border border-gray-100 dark:border-[#1F2937] bg-gray-50 dark:bg-[#0B1120]">
                  <div>
                     <div className="font-bold text-gray-900 dark:text-white text-lg">Dark Mode</div>
                     <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Switch between light and dark themes for the entire dashboard.</div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleTheme} />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-[#38BDF8]"></div>
                  </label>
               </div>
            </div>
          )}

       </div>
    </div>
  );
};

export default ManagerSettings;
