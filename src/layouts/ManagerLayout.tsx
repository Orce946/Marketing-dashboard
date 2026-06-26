import React, { useState, createContext, useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, AlertTriangle, BarChart3, Users, Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-react';

export const ThemeContext = createContext({ isDarkMode: false, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

const ManagerLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="flex w-screen h-screen overflow-hidden bg-gray-50 dark:bg-[#0B1120] font-sans text-gray-900 dark:text-white transition-colors duration-300">
            
            {/* Sidebar Overlay for Mobile/Smaller screens */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={closeSidebar}
              ></div>
            )}

            {/* Manager Sidebar (Slide-in on mobile, fixed on large screens) */}
            <aside 
              className={`fixed lg:static inset-y-0 left-0 w-[280px] bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-[#1F2937] flex flex-col flex-shrink-0 z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
                 <div className="p-6 flex items-center justify-between border-b border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
                    <div>
                      <div className="flex items-center gap-2 text-xl font-extrabold tracking-wider">
                          <span className="text-blue-900 dark:text-[#38BDF8]">ELITE GROUP</span> <span className="text-gray-900 dark:text-white">BD</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Management Console</div>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={closeSidebar} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                       <X className="w-6 h-6" />
                    </button>
                </div>

                 <div className="flex-grow overflow-y-auto py-6 px-4 space-y-1">
                     <div className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">Main Menu</div>
                     <SidebarItem to="/manager" icon={<LayoutDashboard className="w-5 h-5" />} label="Overview Dashboard" exact onClick={closeSidebar} />
                     <SidebarItem to="/manager/map" icon={<MapIcon className="w-5 h-5" />} label="Live SO Tracking" onClick={closeSidebar} />
                     
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-3">Analytics & Logs</div>
                     <SidebarItem to="/manager/exceptions" icon={<AlertTriangle className="w-5 h-5" />} label="Exception Inbox" badge="12" onClick={closeSidebar} />
                     <SidebarItem to="/manager/reports" icon={<BarChart3 className="w-5 h-5" />} label="Daily Reports" onClick={closeSidebar} />
                     <SidebarItem to="/manager/team" icon={<Users className="w-5 h-5" />} label="Team Directory" onClick={closeSidebar} />
                 </div>

                 <div className="p-4 border-t border-gray-200 dark:border-[#1F2937] space-y-1 transition-colors duration-300">
                     <NavLink 
                        to="/manager/settings"
                        onClick={closeSidebar}
                        className={({ isActive }) => `flex items-center gap-3 w-full p-3 rounded-xl font-semibold transition-colors ${isActive ? 'bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937] hover:text-gray-900 dark:hover:text-white'}`}
                     >
                        <Settings className="w-5 h-5" />
                        Settings
                     </NavLink>
                     <button onClick={() => navigate('/')} className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937] hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">
                        <LogOut className="w-5 h-5" />
                        Logout
                     </button>
                 </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-full overflow-hidden relative">
                 <header className="h-20 border-b border-blue-800 dark:border-[#1F2937] px-4 md:px-8 flex items-center justify-between bg-blue-900 dark:bg-[#111827]/90 text-white backdrop-blur-md z-10 transition-colors duration-300 shadow-md">
                     
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setIsSidebarOpen(true)}
                          className="lg:hidden p-2 rounded-lg text-white hover:bg-blue-800 dark:hover:bg-[#1F2937] transition-colors"
                        >
                           <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Command Center</h1>
                     </div>
                     
                     <div className="flex items-center gap-4 md:gap-6">
                        
                        <button 
                           onClick={toggleTheme}
                           className="p-2 rounded-full border border-blue-400 dark:border-gray-600 hover:bg-blue-800 dark:hover:bg-gray-800 transition-colors"
                           title="Toggle Theme"
                        >
                           {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-100" />}
                        </button>

                        <div className="flex items-center gap-4 border-l border-blue-700 dark:border-gray-700 pl-4 md:pl-6">
                          <div className="text-right mr-2 hidden md:block">
                             <p className="text-sm font-bold text-white leading-tight">Sarah Jenkins</p>
                             <p className="text-xs text-blue-200 dark:text-[#38BDF8] font-medium">Regional Manager</p>
                          </div>
                          <NavLink 
                            to="/manager/settings" 
                            className="w-10 h-10 rounded-full bg-blue-800 dark:bg-[#1F2937] border border-blue-600 dark:border-[#374151] flex items-center justify-center font-bold text-white hover:ring-2 hover:ring-white dark:hover:ring-[#38BDF8] transition-all cursor-pointer"
                          >
                             SJ
                          </NavLink>
                        </div>
                     </div>
                 </header>
                 
                 <div className="flex-grow overflow-y-auto p-4 md:p-8 relative">
                    <Outlet />
                 </div>
            </main>

        </div>
      </div>
    </ThemeContext.Provider>
  );
};

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string; badge?: string; exact?: boolean; onClick?: () => void }> = ({ to, icon, label, badge, exact, onClick }) => {
  return (
    <NavLink
      to={to}
      end={exact}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center justify-between w-full p-3 rounded-xl transition-all font-semibold ${
          isActive 
            ? 'bg-blue-900/10 dark:bg-[#38BDF8]/10 text-blue-900 dark:text-[#38BDF8] border border-blue-900/20 dark:border-[#38BDF8]/20 shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F2937] hover:text-gray-900 dark:hover:text-white'
        }`
      }
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 dark:bg-[#EF4444] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default ManagerLayout;
