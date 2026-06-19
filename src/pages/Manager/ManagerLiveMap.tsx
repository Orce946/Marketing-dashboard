import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, User, Navigation2 } from 'lucide-react';
import { useTheme } from '../../layouts/ManagerLayout';

// Custom icons for SOs
const createSOIcon = (color: string, isDarkMode: boolean) => {
  const borderColor = isDarkMode ? '#111827' : '#ffffff';
  return L.divIcon({
    className: 'custom-so-icon',
    html: `
      <div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid ${borderColor}; box-shadow: 0 0 15px ${color}80; display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const soData = [
  { id: 'SO-01', name: 'Md. Faruk', lat: 23.7461, lng: 90.3742, status: 'alert', battery: '42%', lastPing: '2m ago', alertReason: 'GPS Deviation > 2km' },
  { id: 'SO-02', name: 'Ahsan', lat: 23.7925, lng: 90.4078, status: 'alert', battery: '15%', lastPing: '1m ago', alertReason: 'Low Battery & Fast Visit' },
  { id: 'SO-03', name: 'Kamrul', lat: 23.7395, lng: 90.3756, status: 'active', battery: '88%', lastPing: 'Just now' },
  { id: 'SO-04', name: 'Hasan', lat: 23.7510, lng: 90.3935, status: 'active', battery: '65%', lastPing: '5m ago' },
  { id: 'SO-05', name: 'Rahim', lat: 23.8740, lng: 90.3995, status: 'inactive', battery: '0%', lastPing: '2h ago' },
];

const dhakaCenter: [number, number] = [23.7808, 90.4030];

// Leaflet tile layers
const DARK_MAP_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_MAP_TILES = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

// Helper component to force tile update on theme change
const ThemeLayer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <TileLayer
       key={isDarkMode ? 'dark' : 'light'}
       url={isDarkMode ? DARK_MAP_TILES : LIGHT_MAP_TILES}
       attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
    />
  );
};

const ManagerLiveMap: React.FC = () => {
  const { isDarkMode } = useTheme();

  const activeIcon = createSOIcon(isDarkMode ? '#38BDF8' : '#2563EB', isDarkMode); 
  const alertIcon = createSOIcon('#EF4444', isDarkMode);  
  const inactiveIcon = createSOIcon('#9CA3AF', isDarkMode); 

  const getIconForStatus = (status: string) => {
    if (status === 'alert') return alertIcon;
    if (status === 'inactive') return inactiveIcon;
    return activeIcon;
  };

  return (
    <div className="h-full w-full bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1F2937] overflow-hidden shadow-xl relative flex transition-colors duration-300">
       
       {/* Sidebar SO List */}
       <div className="w-[320px] h-full bg-gray-50 dark:bg-[#0B1120] border-r border-gray-200 dark:border-[#1F2937] flex flex-col flex-shrink-0 z-10 relative transition-colors duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
             <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Navigation2 className="w-5 h-5 text-blue-600 dark:text-[#38BDF8]" />
                Live SO Tracking
             </h2>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Real-time GPS telemetry from field apps.</p>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
             
             {soData.map(so => (
               <div key={so.id} className={`p-3 rounded-xl border flex flex-col gap-2 cursor-pointer transition-colors duration-300 ${so.status === 'alert' ? 'bg-red-50 dark:bg-[#EF4444]/10 border-red-200 dark:border-[#EF4444]/30 hover:bg-red-100 dark:hover:bg-[#EF4444]/20' : so.status === 'inactive' ? 'bg-transparent border-gray-200 dark:border-[#1F2937] opacity-60' : 'bg-white dark:bg-[#1F2937]/50 border-gray-200 dark:border-[#374151] hover:bg-gray-100 dark:hover:bg-[#1F2937] shadow-sm dark:shadow-none'}`}>
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{so.id} ({so.name})</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last Ping: {so.lastPing}</div>
                     </div>
                     <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${so.status === 'alert' ? 'bg-red-600 dark:bg-[#EF4444] text-white' : so.status === 'inactive' ? 'bg-gray-400 dark:bg-gray-700 text-white' : 'bg-blue-100 dark:bg-[#38BDF8]/20 text-blue-700 dark:text-[#38BDF8] border border-blue-200 dark:border-transparent'}`}>
                        {so.battery}
                     </div>
                  </div>
                  {so.alertReason && (
                    <div className="text-xs font-bold text-red-600 dark:text-[#EF4444] flex items-center gap-1 mt-1">
                       <AlertTriangle className="w-3 h-3" /> {so.alertReason}
                    </div>
                  )}
               </div>
             ))}

          </div>
       </div>

       {/* Map View */}
       <div className="flex-grow h-full relative z-0" style={{ backgroundColor: isDarkMode ? '#0B1120' : '#E5E7EB' }}>
         <MapContainer 
            center={dhakaCenter} 
            zoom={12} 
            zoomControl={false}
            style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}
         >
           <ThemeLayer isDarkMode={isDarkMode} />

           {soData.map(so => (
             <Marker 
               key={so.id} 
               position={[so.lat, so.lng]}
               icon={getIconForStatus(so.status)}
             >
               <Popup className={isDarkMode ? 'manager-popup-dark' : 'manager-popup-light'}>
                 <div className={`p-2 min-w-[200px] ${isDarkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-900'}`}>
                   <h3 className="font-extrabold text-base mb-1">{so.id} - {so.name}</h3>
                   <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Battery: <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{so.battery}</span></div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status: <span className={`font-bold capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{so.status}</span></div>
                   </div>
                   {so.alertReason && (
                     <div className={`mt-3 p-2 rounded-lg text-xs font-bold ${isDarkMode ? 'bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444]' : 'bg-red-50 border border-red-200 text-red-600'}`}>
                        Alert: {so.alertReason}
                     </div>
                   )}
                   <button className={`mt-3 w-full py-2 font-bold rounded-lg text-xs transition-colors ${isDarkMode ? 'bg-[#1F2937] hover:bg-[#374151] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200'}`}>
                     View Route History
                   </button>
                 </div>
               </Popup>
             </Marker>
           ))}
         </MapContainer>

         {/* Map Legend */}
         <div className={`absolute bottom-6 right-6 z-[400] backdrop-blur border p-4 rounded-xl shadow-2xl flex flex-col gap-2 transition-colors duration-300 ${isDarkMode ? 'bg-[#111827]/90 border-[#1F2937]' : 'bg-white/90 border-gray-200'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status Legend</h4>
            <div className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]' : 'bg-blue-600'}`}></span> Active Tracking
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#EF4444] shadow-[0_0_8px_#EF4444]' : 'bg-red-500'}`}></span> Exception/Alert
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-gray-500 shadow-[0_0_8px_#9CA3AF]' : 'bg-gray-400'}`}></span> Inactive/Offline
            </div>
         </div>

       </div>
       
       <style>{`
          /* Custom CSS for dark mode popup */
          .manager-popup-dark .leaflet-popup-content-wrapper {
             background-color: #111827;
             border: 1px solid #374151;
             color: white;
             border-radius: 12px;
             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
          }
          .manager-popup-dark .leaflet-popup-tip {
             background-color: #111827;
             border: 1px solid #374151;
          }

          /* Custom CSS for light mode popup */
          .manager-popup-light .leaflet-popup-content-wrapper {
             background-color: #ffffff;
             border: 1px solid #e5e7eb;
             color: #111827;
             border-radius: 12px;
             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .manager-popup-light .leaflet-popup-tip {
             background-color: #ffffff;
             border: 1px solid #e5e7eb;
          }
       `}</style>
    </div>
  );
};

export default ManagerLiveMap;
