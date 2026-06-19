import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, CheckSquare, Calendar, Users, FileText, Bell, MapPin, Bot, Menu, X, LogOut } from 'lucide-react';

const SOLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-offwhite font-sans text-text-primary">
      
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Left Slide Bar (Sidebar) */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 bg-background-sidebar text-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 flex justify-between items-center border-b border-white/10">
           <div>
             <h2 className="text-xl font-extrabold tracking-tight">ELITE GROUP</h2>
             <p className="text-sm font-medium text-white/60">Sales Officer Portal</p>
           </div>
           <button onClick={closeSidebar} className="p-2 rounded-full hover:bg-white/10 text-white">
             <X className="w-6 h-6" />
           </button>
        </div>

        <div className="flex-grow overflow-y-auto py-6 px-4 space-y-2">
           <SidebarItem to="/so" icon={<Home className="w-5 h-5" />} label="হোম (Overview)" onClick={closeSidebar} />
           <SidebarItem to="/so/attendance" icon={<Calendar className="w-5 h-5" />} label="হাজিরা (Attendance)" onClick={closeSidebar} />
           <SidebarItem to="/so/todo" icon={<CheckSquare className="w-5 h-5" />} label="আজকের কাজ (To-Do)" onClick={closeSidebar} />
           <SidebarItem to="/so/chatbot" icon={<Bot className="w-5 h-5" />} label="AI অ্যাসিস্ট্যান্ট" onClick={closeSidebar} />
           <SidebarItem to="/so/map" icon={<MapPin className="w-5 h-5" />} label="রুট ম্যাপ (Map)" onClick={closeSidebar} />
           <SidebarItem to="/so/reports" icon={<FileText className="w-5 h-5" />} label="রিপোর্ট (Reports)" onClick={closeSidebar} />
           <SidebarItem to="/so/dealers" icon={<Users className="w-5 h-5" />} label="ডিলার লিস্ট (Dealers)" onClick={closeSidebar} />
        </div>

        <div className="p-5 border-t border-white/10">
           <button className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors font-bold">
              <LogOut className="w-5 h-5" />
              লগ আউট
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow w-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-border px-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2 -ml-2 rounded-xl text-text-primary hover:bg-background-offwhite transition-colors"
             >
               <Menu className="w-7 h-7" />
             </button>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md hidden sm:flex">
                   MK
                </div>
                <div>
                  <h1 className="text-lg font-extrabold tracking-tight leading-tight">Michael K.</h1>
                  <div className="flex items-center gap-1 text-success text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    ডিউটিতে আছেন
                  </div>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-background-offwhite text-text-secondary hover:bg-border transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Main Workspace */}
        <main className="flex-grow overflow-y-auto relative pb-8">
          <Outlet />
        </main>

        {/* Global Floating Chatbot Button */}
        <NavLink 
          to="/so/chatbot"
          className="absolute bottom-6 right-6 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-hover transition-colors z-30"
        >
          <Bot className="w-8 h-8" />
        </NavLink>

      </div>

    </div>
  );
};

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string; onClick: () => void }> = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full p-3.5 rounded-xl transition-colors font-bold ${
          isActive 
            ? 'bg-accent text-white shadow-md' 
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default SOLayout;
