import { Link } from 'react-router-dom';
import { User, Users } from 'lucide-react';

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Salesforce <span className="text-blue-500">Pro</span></h1>
          <p className="text-slate-400 text-lg">Select your role to continue to the dashboard</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Manager Card */}
          <Link 
            to="/manager" 
            className="group relative bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Manager View</h2>
              <p className="text-slate-400">Territory overview, team performance, and risk alerts.</p>
            </div>
          </Link>

          {/* Sales Officer Card */}
          <Link 
            to="/so" 
            className="group relative bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="h-10 w-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Sales Officer View</h2>
              <p className="text-slate-400">Daily plan, attendance, route maps, and AI assistant.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
