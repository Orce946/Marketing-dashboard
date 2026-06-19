import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOAttendance: React.FC = () => {
  const navigate = useNavigate();
  const [punchedIn, setPunchedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [punchTime, setPunchTime] = useState<Date | null>(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch device location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (_error) => {
          setLocationError("লোকেশন পাওয়া যাচ্ছে না");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("ডিভাইসে জিপিএস নেই");
    }
  }, []);

  const handlePunch = () => {
    if (!punchedIn) {
      setPunchTime(new Date());
    }
    setPunchedIn(!punchedIn);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto h-full flex flex-col">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center active:bg-gray-100 bg-white"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
      </div>

      <div className="text-center pb-4">
        <h2 className="text-4xl font-extrabold text-text-primary mb-2 font-mono tracking-tighter">
          {formatTime(currentTime)}
        </h2>
        <p className="text-text-secondary font-bold">{formatDate(currentTime)}</p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Massive Punch Button */}
        <button 
          onClick={handlePunch}
          className={`w-64 h-64 rounded-full flex flex-col items-center justify-center shadow-lg transition-all active:scale-95 ${
            punchedIn 
              ? 'bg-danger text-white border-8 border-danger/20' 
              : 'bg-success text-white border-8 border-success/20'
          }`}
        >
          <Clock className="w-16 h-16 mb-4" />
          <span className="text-2xl font-extrabold uppercase tracking-widest">
            {punchedIn ? 'Punch Out' : 'Punch In'}
          </span>
          <span className="text-sm font-bold mt-2 opacity-90">
            {punchedIn ? 'ডিউটি শেষ করুন' : 'ডিউটি শুরু করুন'}
          </span>
        </button>
      </div>

      <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-text-secondary">
          <Navigation className={`w-6 h-6 ${location ? 'text-accent animate-pulse' : 'text-text-muted'}`} />
          <div>
             <p className="font-bold text-text-primary text-sm">বর্তমান লোকেশন (GPS)</p>
             {location ? (
                <p className="text-xs font-mono font-bold mt-0.5">{location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° E</p>
             ) : (
                <p className="text-xs text-danger font-bold mt-0.5">{locationError || "লোকেশন খুঁজছে..."}</p>
             )}
          </div>
        </div>
        
        {punchedIn && punchTime && (
          <div className="flex items-center gap-3 text-text-secondary pt-4 border-t border-border">
            <CheckCircle className="w-6 h-6 text-success" />
            <div>
               <p className="font-bold text-text-primary text-sm">চেক-ইন স্ট্যাটাস</p>
               <p className="text-xs text-success font-bold mt-0.5">{formatTime(punchTime)}-এ শুরু হয়েছে</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SOAttendance;
