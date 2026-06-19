import React, { useEffect, useState } from 'react';
import { Navigation, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom high-visibility markers
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const successIcon = createCustomIcon('#059669'); // Emerald Green
const warningIcon = createCustomIcon('#D97706'); // Amber
const dangerIcon = createCustomIcon('#DC2626');  // Red

const dealers = [
  { id: 1, name: 'করিম পেইন্ট হাউজ (Karim Paint House)', lat: 23.7461, lng: 90.3742, status: 'warning', due: '৳1.8 লাখ' },
  { id: 2, name: 'রহমান হার্ডওয়্যার (Rahman Hardware)', lat: 23.7372, lng: 90.3854, status: 'danger', due: '৳5.2 লাখ' },
  { id: 3, name: 'আলম এন্টারপ্রাইজ (Alam Enterprise)', lat: 23.7395, lng: 90.3756, status: 'success', due: 'ক্লিয়ার' },
  { id: 4, name: 'ঢালী সুপার শপ (Dhali Super Shop)', lat: 23.7925, lng: 90.4078, status: 'success', due: 'ক্লিয়ার' },
  { id: 5, name: 'নিউ স্টার পেইন্টস (New Star Paints)', lat: 23.7380, lng: 90.4120, status: 'warning', due: '৳1.5 লাখ' },
  { id: 6, name: 'মডার্ন কালার সেন্টার (Modern Color Center)', lat: 23.8740, lng: 90.3995, status: 'warning', due: '৳2.0 লাখ' },
  { id: 7, name: 'প্রাইম বিল্ডিং ম্যাটেরিয়ালস (Prime Building)', lat: 23.7510, lng: 90.3935, status: 'danger', due: '৳7.5 লাখ' },
];

const dhakaCenter: [number, number] = [23.7808, 90.4030]; // Central Dhaka

// Helper component to recenter map
const RecenterMap: React.FC<{lat: number, lng: number}> = ({lat, lng}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
};

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SOMap: React.FC = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState<[number, number]>(dhakaCenter);
  const [activeRoute, setActiveRoute] = useState('All Dhaka Route');

  const getIconForStatus = (status: string) => {
    if (status === 'success') return successIcon;
    if (status === 'warning') return warningIcon;
    return dangerIcon;
  };

  return (
    <div className="h-full w-full relative bg-gray-100 flex flex-col">
       
       {/* Map UI Overlay (Top) */}
       <div className="absolute top-4 left-4 right-4 z-[400] flex gap-2 pointer-events-none">
          <button 
            onClick={() => navigate(-1)} 
            className="w-14 h-14 bg-white/95 backdrop-blur text-text-primary rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform pointer-events-auto border-2 border-border"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-white/95 backdrop-blur border-2 border-border p-3 rounded-2xl flex-grow shadow-lg font-bold text-text-primary flex items-center justify-between pointer-events-auto">
             <span>{activeRoute}</span>
             <div className="flex gap-1">
               <span className="w-3 h-3 rounded-full bg-danger"></span>
               <span className="w-3 h-3 rounded-full bg-warning"></span>
               <span className="w-3 h-3 rounded-full bg-success"></span>
             </div>
          </div>
          <button 
            onClick={() => setCenter(dhakaCenter)}
            className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform pointer-events-auto"
          >
             <Navigation className="w-6 h-6" />
          </button>
       </div>

       {/* Leaflet Map Container */}
       <div className="flex-grow w-full z-0">
         <MapContainer 
            center={center} 
            zoom={12} 
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
         >
           <TileLayer
             url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
           />
           
           <RecenterMap lat={center[0]} lng={center[1]} />

           {dealers.map(dealer => (
             <Marker 
               key={dealer.id} 
               position={[dealer.lat, dealer.lng]}
               icon={getIconForStatus(dealer.status)}
             >
               <Popup className="rounded-2xl border-2 border-border shadow-lg">
                 <div className="p-1 min-w-[180px]">
                   <h3 className="font-extrabold text-lg text-text-primary leading-tight mb-1">{dealer.name}</h3>
                   <p className={`font-bold text-sm ${dealer.status === 'danger' ? 'text-danger' : dealer.status === 'warning' ? 'text-warning' : 'text-success'}`}>
                     বাকি: {dealer.due}
                   </p>
                   <button className="mt-3 w-full py-2 bg-accent text-white font-bold rounded-lg text-sm active:bg-accent-hover transition-colors">
                     ভিজিট শুরু করুন
                   </button>
                 </div>
               </Popup>
             </Marker>
           ))}
         </MapContainer>
       </div>
       
       {/* Map UI Overlay (Bottom - Above Nav) */}
       <div className="absolute bottom-4 left-4 right-4 z-[400]">
          <button className="w-full py-4 bg-text-primary text-white font-extrabold rounded-2xl shadow-up flex items-center justify-center gap-2 active:scale-95 transition-transform">
             <Layers className="w-5 h-5" />
             রুট ম্যাপ আপডেট করুন
          </button>
       </div>
       
    </div>
  );
};

export default SOMap;
