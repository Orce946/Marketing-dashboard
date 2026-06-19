import React from 'react';
import { Download, Clock, CheckSquare, Target, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const SOReports: React.FC = () => {
  const navigate = useNavigate();
  const reportData = {
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    attendance: {
      punchIn: '08:45 AM',
      punchOut: 'Pending',
      totalHours: '04h 52m',
    },
    tasks: [
      { id: 1, name: 'Apex MegaMart', type: 'Collection', status: 'Completed', amount: 1200 },
      { id: 2, name: 'Dhali Super Shop', type: 'Visit', status: 'Completed', amount: 0 },
      { id: 3, name: 'Rahim Store', type: 'Order', status: 'Pending', amount: 0 },
    ],
    progress: {
      salesTarget: 3500,
      salesAchieved: 2450,
      percentage: 70,
    }
  };

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ['ELITE GROUP - Sales Officer Daily Report'],
      ['Officer:', 'Michael K.'],
      ['Date:', reportData.date],
      [],
      ['--- ATTENDANCE ---'],
      ['Punch In', reportData.attendance.punchIn],
      ['Punch Out', reportData.attendance.punchOut],
      ['Total Hours', reportData.attendance.totalHours],
      [],
      ['--- PROGRESS ---'],
      ['Sales Target', `Tk ${reportData.progress.salesTarget}`],
      ['Sales Achieved', `Tk ${reportData.progress.salesAchieved}`],
      ['Achievement %', `${reportData.progress.percentage}%`],
      [],
      ['--- TASKS SUMMARY ---'],
      ['Total Assigned', reportData.tasks.length],
      ['Completed', reportData.tasks.filter(t => t.status === 'Completed').length],
      ['Pending', reportData.tasks.filter(t => t.status === 'Pending').length],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    
    // Style column widths
    wsSummary['!cols'] = [{ wch: 20 }, { wch: 30 }];
    
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Daily Summary');

    // Tasks Sheet
    const wsTasks = XLSX.utils.json_to_sheet(reportData.tasks);
    wsTasks['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, wsTasks, 'Task Details');

    // Save
    XLSX.writeFile(wb, `Daily_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const completedTasksCount = reportData.tasks.filter(t => t.status === 'Completed').length;
  const totalTasksCount = reportData.tasks.length;

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto pb-24">
      
      <div className="flex items-center gap-4 pt-2">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center active:bg-gray-100 bg-white"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-text-primary">আজকের দৈনিক রিপোর্ট</h2>
          <p className="text-text-secondary font-bold text-sm mt-1">{reportData.date}</p>
        </div>
      </div>

      {/* Massive Download Button */}
      <button 
        onClick={handleDownloadExcel}
        className="w-full py-5 bg-success text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <FileSpreadsheet className="w-10 h-10" />
        <span className="font-extrabold text-xl uppercase tracking-wider">Download XLS Report</span>
        <span className="text-xs font-bold opacity-90">ম্যানেজারকে পাঠাতে এক্সেল ডাউনলোড করুন</span>
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        
        <div className="bg-white border-2 border-border rounded-2xl p-4 shadow-sm">
           <div className="flex items-center gap-2 mb-2 text-text-secondary">
             <Clock className="w-5 h-5" />
             <h3 className="font-bold text-sm uppercase">হাজিরা (Time)</h3>
           </div>
           <p className="font-extrabold text-xl">{reportData.attendance.totalHours}</p>
           <p className="text-xs font-bold text-text-muted mt-1">ইন: {reportData.attendance.punchIn}</p>
        </div>

        <div className="bg-white border-2 border-border rounded-2xl p-4 shadow-sm">
           <div className="flex items-center gap-2 mb-2 text-text-secondary">
             <Target className="w-5 h-5" />
             <h3 className="font-bold text-sm uppercase">বিক্রি (Sales)</h3>
           </div>
           <p className="font-extrabold text-xl text-accent">৳{reportData.progress.salesAchieved}</p>
           <p className="text-xs font-bold text-success mt-1">{reportData.progress.percentage}% টার্গেট পূরণ</p>
        </div>

      </div>

      {/* Task Summary */}
      <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm">
         <div className="flex items-center gap-2 mb-4 text-text-secondary">
           <CheckSquare className="w-6 h-6" />
           <h3 className="font-bold text-lg uppercase tracking-wide">আজকের কাজ (Tasks)</h3>
         </div>
         
         <div className="space-y-3">
            {reportData.tasks.map(task => (
              <div key={task.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="font-bold text-text-primary">{task.name}</p>
                  <p className="text-xs font-bold text-text-muted">{task.type}</p>
                </div>
                <div>
                  {task.status === 'Completed' ? (
                    <span className="px-3 py-1 bg-success/15 text-success font-bold text-xs rounded-full border border-success/30">সম্পন্ন</span>
                  ) : (
                    <span className="px-3 py-1 bg-warning/15 text-warning font-bold text-xs rounded-full border border-warning/30">বাকি</span>
                  )}
                </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default SOReports;
