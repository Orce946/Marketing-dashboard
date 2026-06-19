import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { Home, CheckSquare, Calendar, Users, FileText, Bell, MapPin, Bot, X, LogOut, Search, LayoutGrid, User, Settings, HelpCircle } from 'lucide-react';

const SOLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const closeSidebar = () => setIsSidebarOpen(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Search navigation items
  const navItems = [
    { label: 'হোম (Overview)', path: '/so' },
    { label: 'হাজিরা (Attendance)', path: '/so/attendance' },
    { label: 'আজকের কাজ (To-Do)', path: '/so/todo' },
    { label: 'AI অ্যাসিস্ট্যান্ট', path: '/so/chatbot' },
    { label: 'রুট ম্যাপ (Map)', path: '/so/map' },
    { label: 'রিপোর্ট (Reports)', path: '/so/reports' },
    { label: 'ডিলার লিস্ট (Dealers)', path: '/so/dealers' },
    { label: 'টাস্ক কমপ্লিশন (Task Complete)', path: '/so/task-complete' },
  ];

  const filteredNavItems = searchQuery.trim()
    ? navItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Sample notifications
  const notifications = [
    { id: 1, text: 'নতুন ডিলার যোগ হয়েছে — মিরপুর এলাকায়', time: '২ মিনিট আগে', unread: true },
    { id: 2, text: 'আজকের টাস্ক আপডেট করা হয়েছে', time: '১৫ মিনিট আগে', unread: true },
    { id: 3, text: 'রিপোর্ট সাবমিট সফল হয়েছে', time: '১ ঘণ্টা আগে', unread: false },
    { id: 4, text: 'অ্যাটেন্ডেন্স কনফার্ম করুন', time: '৩ ঘণ্টা আগে', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-offwhite font-sans text-text-primary relative">
      
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
           <button onClick={() => navigate('/')} className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors font-bold">
              <LogOut className="w-5 h-5" />
              লগ আউট
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow w-full overflow-hidden relative bg-gray-50">
        
        {/* Blue Upper Background (bKash style) */}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-accent z-0 pb-10"></div>

        {/* Top Header - Inside the Blue Background */}
        <header className="flex-shrink-0 pt-4 pb-2 px-4 flex items-center justify-between relative z-50 text-white">
          
          {/* Left: Account button with avatar and name */}
          <div className="relative" ref={accountRef}>
            <div className="flex items-center gap-3 p-1.5 pr-3">
              <div 
                onClick={() => { setIsAccountOpen(!isAccountOpen); setIsNotificationOpen(false); }}
                className="w-12 h-12 bg-white border-2 border-white/20 text-accent rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-white/90 transition-colors"
              >
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-extrabold leading-tight tracking-tight text-white">Michael K.</p>
                <button className="text-xs bg-white text-accent font-bold px-3 py-1 rounded-full mt-1 shadow-sm flex items-center gap-1 active:scale-95 transition-transform">
                  <span className="w-3 h-3 rounded-full bg-accent text-white flex items-center justify-center text-[8px] font-black">৳</span> ব্যালেন্স দেখুন
                </button>
              </div>
            </div>

            {/* Account Dropdown */}
            {isAccountOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 text-text-primary">
                <div className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      MK
                    </div>
                    <div>
                      <p className="font-extrabold text-sm">Michael K.</p>
                      <p className="text-xs text-text-muted">সেলস অফিসার</p>
                      <div className="flex items-center gap-1 text-success text-xs font-bold mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        ডিউটিতে আছেন
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => { setIsAccountOpen(false); navigate('/so'); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-background-offwhite transition-colors"
                  >
                    <User className="w-4 h-4" /> প্রোফাইল দেখুন
                  </button>
                  <button 
                    onClick={() => { setIsAccountOpen(false); navigate('/so/attendance'); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-background-offwhite transition-colors"
                  >
                    <Settings className="w-4 h-4" /> সেটিংস
                  </button>
                  <button 
                    onClick={() => { setIsAccountOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-background-offwhite transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" /> সাহায্য
                  </button>
                </div>
                <div className="p-2 border-t border-border">
                  <button 
                    onClick={() => { setIsAccountOpen(false); navigate('/'); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-danger hover:bg-danger/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> লগ আউট
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right: Search, Notification Bell, Grid Menu */}
          <div className="flex items-center gap-3">
            
            {/* Search Button */}
            <button 
              onClick={() => { setIsSearchOpen(true); setIsNotificationOpen(false); setIsAccountOpen(false); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-accent hover:bg-white/90 shadow-md transition-colors"
              id="so-search-btn"
              title="সার্চ করুন"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsAccountOpen(false); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-accent hover:bg-white/90 shadow-md transition-colors relative"
                id="so-notification-btn"
                title="নোটিফিকেশন"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50 text-text-primary">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-extrabold text-sm">নোটিফিকেশন</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">{unreadCount} নতুন</span>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <button
                        key={n.id}
                        onClick={() => setIsNotificationOpen(false)}
                        className={`w-full text-left px-4 py-3 border-b border-border/50 hover:bg-background-offwhite transition-colors ${n.unread ? 'bg-accent/[0.03]' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          {n.unread && (
                            <span className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></span>
                          )}
                          {!n.unread && <span className="w-2 h-2 mt-1.5 flex-shrink-0"></span>}
                          <div>
                            <p className={`text-sm leading-snug ${n.unread ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>{n.text}</p>
                            <p className="text-xs text-text-muted mt-1">{n.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button 
                      onClick={() => setIsNotificationOpen(false)}
                      className="w-full text-center text-sm font-bold text-accent hover:text-accent-hover transition-colors py-1"
                    >
                      সব দেখুন
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Grid Menu Button (opens sidebar) */}
            <button 
              onClick={() => { setIsSidebarOpen(true); setIsNotificationOpen(false); setIsAccountOpen(false); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-accent hover:bg-white/90 shadow-md transition-colors"
              id="so-grid-menu-btn"
              title="মেনু"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

          </div>
        </header>

        {/* Search Overlay */}
        {isSearchOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}></div>
            <div className="fixed top-0 left-0 right-0 z-50 p-4 pt-3">
              <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="w-5 h-5 text-text-muted flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="পেজ বা ফিচার সার্চ করুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow bg-transparent outline-none text-sm font-medium text-text-primary placeholder:text-text-muted"
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="p-1 rounded-lg hover:bg-background-offwhite transition-colors"
                  >
                    <X className="w-4 h-4 text-text-muted" />
                  </button>
                </div>
                {searchQuery.trim() && (
                  <div className="max-h-64 overflow-y-auto p-2">
                    {filteredNavItems.length > 0 ? (
                      filteredNavItems.map(item => (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setIsSearchOpen(false); setSearchQuery(''); }}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-background-offwhite hover:text-text-primary transition-colors"
                        >
                          <Search className="w-4 h-4 text-text-muted" />
                          {item.label}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-text-muted text-center py-4 font-medium">কোনো ফলাফল পাওয়া যায়নি</p>
                    )}
                  </div>
                )}
                {!searchQuery.trim() && (
                  <div className="p-3">
                    <p className="text-xs text-text-muted font-medium px-2 mb-2">দ্রুত যান</p>
                    {navItems.slice(0, 5).map(item => (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setIsSearchOpen(false); setSearchQuery(''); }}
                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-background-offwhite hover:text-text-primary transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Middle Div: Scrollable Main Workspace overlapping the blue background */}
        <main className="flex-grow overflow-y-auto z-10 mt-6 bg-white rounded-t-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] relative flex flex-col mx-0 pb-16">
          <div className="flex-grow">
            <Outlet />
          </div>
        </main>

        {/* Bottom Nav Bar - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-between w-full max-w-xl mx-auto px-6 py-2.5">
            <Link to="/so" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/so' ? 'text-accent' : 'text-text-muted hover:text-accent'} transition-colors flex-1`}>
               <Home className="w-6 h-6" />
               <span className="text-[10px] font-bold whitespace-nowrap">হোম</span>
            </Link>
            <Link to="/so/attendance" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/so/attendance' ? 'text-accent' : 'text-text-muted hover:text-accent'} transition-colors flex-1`}>
               <Calendar className="w-6 h-6" />
               <span className="text-[10px] font-bold whitespace-nowrap">হাজিরা</span>
            </Link>
            <Link to="/so/todo" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/so/todo' ? 'text-accent' : 'text-text-muted hover:text-accent'} transition-colors flex-1`}>
               <CheckSquare className="w-6 h-6" />
               <span className="text-[10px] font-bold whitespace-nowrap">টাস্ক</span>
            </Link>
            <Link to="/so/map" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/so/map' ? 'text-accent' : 'text-text-muted hover:text-accent'} transition-colors flex-1`}>
               <MapPin className="w-6 h-6" />
               <span className="text-[10px] font-bold whitespace-nowrap">ম্যাপ</span>
            </Link>
            <Link to="/so/reports" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/so/reports' ? 'text-accent' : 'text-text-muted hover:text-accent'} transition-colors flex-1`}>
               <FileText className="w-6 h-6" />
               <span className="text-[10px] font-bold whitespace-nowrap">রিপোর্ট</span>
            </Link>
            <Link to="/so/dealers" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/so/dealers' ? 'text-accent' : 'text-text-muted hover:text-accent'} transition-colors flex-1`}>
               <Users className="w-6 h-6" />
               <span className="text-[10px] font-bold whitespace-nowrap">ডিলার</span>
            </Link>
          </div>
        </div>

        {/* Global Floating Chatbot Button */}
        <NavLink 
          to="/so/chatbot"
          className="absolute bottom-20 right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-hover transition-transform hover:scale-105 active:scale-95 z-30"
        >
          <Bot className="w-7 h-7" />
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
