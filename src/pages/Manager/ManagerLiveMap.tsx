import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, Navigation2, Camera } from 'lucide-react';
import { useTheme } from '../../layouts/ManagerLayout';
import './ManagerLiveMap.css';

// Custom HTML icons for SOs
const createSOHtmlIcon = (so: any) => {
  const initials = so.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  return L.divIcon({
    className: '',
    html: `
      <div class="so-live-marker ${so.status}">
        <div class="so-beacon-ring"></div>
        <div class="so-avatar-img">
           ${initials}
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

const createPhotoIcon = () => {
  return L.divIcon({
    className: 'custom-photo-icon',
    html: `
      <div style="background-color: #10B981; width: 28px; height: 28px; border-radius: 8px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  });
};

const soData = [
  { id: 'SO-01', name: 'Md. Faruk', lat: 23.7461, lng: 90.3742, status: 'alert', visits: '4/15', lastPing: '2m ago', alertReason: 'GPS Deviation > 2km', route: [[23.7340, 90.3928], [23.7461, 90.3742]] },
  { id: 'SO-02', name: 'Ahsan', lat: 23.7925, lng: 90.4078, status: 'alert', visits: '12/12', lastPing: '1m ago', alertReason: 'Fast Visit', route: [[23.7749, 90.3659], [23.8048, 90.3654], [23.7925, 90.4078]] },
  { id: 'SO-03', name: 'Kamrul', lat: 23.7395, lng: 90.3756, status: 'active', visits: '8/10', lastPing: 'Just now', route: [[23.7104, 90.4074], [23.7253, 90.3976], [23.7395, 90.3756]] },
  { id: 'SO-04', name: 'Hasan', lat: 23.7510, lng: 90.3935, status: 'active', visits: '5/8', lastPing: '5m ago', route: [] },
  { id: 'SO-05', name: 'Rahim', lat: 23.8740, lng: 90.3995, status: 'inactive', visits: '0/10', lastPing: '2h ago', route: [] },
];

const photoUploads = [
  { id: 'p1', soId: 'SO-03', lat: 23.7104, lng: 90.4074, time: '10:15 AM', type: 'Competitor Promo Material', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400' },
  { id: 'p2', soId: 'SO-02', lat: 23.7749, lng: 90.3659, time: '11:30 AM', type: 'Stock Verification', url: 'https://images.unsplash.com/photo-1580913428023-02c695666d61?auto=format&fit=crop&q=80&w=400' }
];

const dhakaCenter: [number, number] = [23.7808, 90.4030];

const DARK_MAP_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_MAP_TILES = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

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
  const [selectedSO, setSelectedSO] = useState<string | null>(null);

  const photoIcon = createPhotoIcon();

  const getIconForStatus = (so: any) => {
    return createSOHtmlIcon(so);
  };

  return (
    <div className="h-full w-full bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1F2937] overflow-hidden shadow-xl relative flex transition-colors duration-300 manager-map-root">
       
       {/* Sidebar SO List */}
       <div className="w-[320px] h-full bg-gray-50 dark:bg-[#0B1120] border-r border-gray-200 dark:border-[#1F2937] flex flex-col flex-shrink-0 z-10 relative transition-colors duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
             <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Navigation2 className="w-5 h-5 text-blue-600 dark:text-[#38BDF8]" />
                Live SO Tracking
             </h2>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Click an SO to view their route history today.</p>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
             
             {soData.map(so => (
               <div 
                 key={so.id} 
                 onClick={() => setSelectedSO(selectedSO === so.id ? null : so.id)}
                 className={`p-3 rounded-xl border flex flex-col gap-2 cursor-pointer transition-colors duration-300 ${so.status === 'alert' ? 'bg-red-50 dark:bg-[#EF4444]/10 border-red-200 dark:border-[#EF4444]/30 hover:bg-red-100 dark:hover:bg-[#EF4444]/20' : so.status === 'inactive' ? 'bg-transparent border-gray-200 dark:border-[#1F2937] opacity-60' : 'bg-white dark:bg-[#1F2937]/50 border-gray-200 dark:border-[#374151] hover:bg-gray-100 dark:hover:bg-[#1F2937] shadow-sm dark:shadow-none'} ${selectedSO === so.id ? 'ring-2 ring-blue-500' : ''}`}
               >
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{so.id} ({so.name})</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last Ping: {so.lastPing}</div>
                     </div>
                     <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${so.status === 'alert' ? 'bg-red-600 dark:bg-[#EF4444] text-white' : so.status === 'inactive' ? 'bg-gray-400 dark:bg-gray-700 text-white' : 'bg-blue-100 dark:bg-[#38BDF8]/20 text-blue-700 dark:text-[#38BDF8] border border-blue-200 dark:border-transparent'}`}>
                        {so.visits} Visits
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
             <React.Fragment key={so.id}>
                <Marker 
                 position={[so.lat, so.lng]}
                 icon={getIconForStatus(so)}
               >
                 <Tooltip direction="right" offset={[15, 0]} opacity={1}>
                   <div className="font-sans min-w-[170px]">
                     <div className="font-extrabold text-[15px] mb-2">{so.name}</div>
                     
                     <div className="flex items-center gap-2 mb-2">
                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                         so.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                         so.status === 'alert' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                         'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                       }`}>
                         {so.status === 'active' ? 'On Route' : so.status === 'alert' ? 'Alert' : 'Idle'}
                       </span>
                     </div>

                     <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                       <span>Visits</span>
                       <span className="font-bold text-gray-900 dark:text-white">{so.visits}</span>
                     </div>
                     
                     {so.alertReason && (
                       <div className="mt-1 mb-2 p-1.5 rounded-lg text-[10px] font-bold bg-orange-50 border border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-500/30 dark:text-orange-400">
                          {so.alertReason}
                       </div>
                     )}

                     <div className="text-[10px] text-gray-500 font-medium mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                       Active {so.lastPing}
                     </div>
                   </div>
                 </Tooltip>
               </Marker>

               {/* Route Polyline (only show if selected or globally active) */}
               {selectedSO === so.id && so.route.length > 0 && (
                 <Polyline 
                   positions={so.route as [number, number][]} 
                   color={isDarkMode ? '#38BDF8' : '#3B82F6'} 
                   weight={4} 
                   opacity={0.7} 
                   dashArray="5, 10" 
                 />
               )}
             </React.Fragment>
           ))}

           {/* Photo / Proof of Visit Markers */}
           {photoUploads.map(photo => (
             <Marker key={photo.id} position={[photo.lat, photo.lng]} icon={photoIcon}>
               <Popup className={isDarkMode ? 'manager-popup-dark' : 'manager-popup-light'}>
                 <div className={`p-1 min-w-[200px] ${isDarkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-900'}`}>
                   <h3 className="font-extrabold text-sm mb-1">{photo.soId} Proof of Visit</h3>
                   <p className="text-xs text-gray-500 mb-2">{photo.time} - {photo.type}</p>
                   <img src={photo.url} alt="Proof" className="w-full h-32 object-cover rounded-lg" />
                 </div>
               </Popup>
             </Marker>
           ))}

         </MapContainer>

         {/* Map Legend */}
         <div className={`absolute bottom-6 right-6 z-[400] backdrop-blur border p-4 rounded-xl shadow-2xl flex flex-col gap-2 transition-colors duration-300 ${isDarkMode ? 'bg-[#111827]/90 border-[#1F2937]' : 'bg-white/90 border-gray-200'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Map Legend</h4>
            <div className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]' : 'bg-blue-600'}`}></span> SO Active Tracking
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#EF4444] shadow-[0_0_8px_#EF4444]' : 'bg-red-500'}`}></span> SO Exception
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               <span className="w-3 h-3 rounded-sm bg-emerald-500 flex items-center justify-center"><Camera className="w-2 h-2 text-white" /></span> Photo Upload
            </div>
         </div>

       </div>
       
       <style>{`
          .manager-popup-dark .leaflet-popup-content-wrapper {
             background-color: #111827; border: 1px solid #374151; color: white; border-radius: 12px;
             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
          }
          .manager-popup-dark .leaflet-popup-tip { background-color: #111827; border: 1px solid #374151; }
          .manager-popup-light .leaflet-popup-content-wrapper {
             background-color: #ffffff; border: 1px solid #e5e7eb; color: #111827; border-radius: 12px;
             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .manager-popup-light .leaflet-popup-tip { background-color: #ffffff; border: 1px solid #e5e7eb; }
       `}</style>
    </div>
  );
};

export default ManagerLiveMap;
