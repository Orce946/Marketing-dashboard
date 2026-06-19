import { useState, useEffect } from 'react';
import { DollarSign, AlertCircle, Users, Activity } from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';
import { AlertCard } from '../../components/ui/AlertCard';
import { DealerMap } from '../../components/Map/DealerMap';
import { dealers, salesOfficers, getAllAlerts } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function ManagerDashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalDues, setTotalDues] = useState(0);
  const alerts = getAllAlerts();

  useEffect(() => {
    let sales = 0;
    let dues = 0;
    dealers.forEach(d => {
      sales += d.sales.ytd;
      dues += d.dues.total;
    });
    setTotalSales(sales);
    setTotalDues(dues);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl text-white">Manager<span className="text-blue-500">View</span></span>
          </div>
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Switch Role</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Territory Sales" 
            value={`$${totalSales.toLocaleString()}`}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard 
            title="Total Outstanding Dues" 
            value={`$${totalDues.toLocaleString()}`}
            icon={<AlertCircle className="h-5 w-5" />}
            trend={{ value: 5, isPositive: false }}
          />
          <MetricCard 
            title="Active Risk Alerts" 
            value={alerts.length}
            icon={<Activity className="h-5 w-5" />}
            className="border-amber-500/30 bg-amber-500/5"
          />
          <MetricCard 
            title="Total Sales Officers" 
            value={salesOfficers.length}
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map Section */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">Territory Map Overview</h2>
              <DealerMap dealers={dealers} />
            </div>

            {/* Team Performance */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6">Team Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-sm">
                      <th className="pb-3 font-medium">Officer</th>
                      <th className="pb-3 font-medium">Dealers</th>
                      <th className="pb-3 font-medium">YTD Sales</th>
                      <th className="pb-3 font-medium">Outstanding Dues</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {salesOfficers.map(officer => (
                      <tr key={officer.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 font-medium text-white">{officer.name}</td>
                        <td className="py-4">{officer.dealersCount}</td>
                        <td className="py-4 text-emerald-400">${officer.totalSales.toLocaleString()}</td>
                        <td className="py-4 text-rose-400">${officer.totalDues.toLocaleString()}</td>
                        <td className="py-4 text-right">
                          <Link to={`/officer/${officer.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">View Profile</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Priority Alerts</h2>
                <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded-full">{alerts.length} New</span>
              </div>
              <div className="space-y-4">
                {alerts.map((alert, idx) => (
                  <AlertCard
                    key={idx}
                    type={alert.type}
                    title={alert.type === 'collection' ? 'Collection Risk' : 'Sales Decline'}
                    message={alert.message}
                    actionText="View Dealer"
                  />
                ))}
                {alerts.length === 0 && (
                  <p className="text-slate-500 text-sm italic text-center py-8">No active alerts. All good!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
