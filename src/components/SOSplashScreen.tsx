import React, { useState, useEffect } from 'react';

const SO_SPLASH_KEY = 'so_splash_shown_v1';

const SOSplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'enter' | 'stay' | 'exit'>('enter');

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SO_SPLASH_KEY);
    if (!alreadyShown) {
      setVisible(true);
      // Phase: enter → stay → exit
      const stayTimer = setTimeout(() => setPhase('stay'), 100);
      const exitTimer = setTimeout(() => setPhase('exit'), 2000);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(SO_SPLASH_KEY, 'true');
      }, 2600);
      return () => {
        clearTimeout(stayTimer);
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #22C55E 0%, #16A34A 50%, #15803D 100%)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* Background pulse rings */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.25)',
              animation: `so-ring-pulse 2.4s ease-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transition: 'all 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)',
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 26,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255,255,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, fontFamily: 'sans-serif' }}>EG</span>
        </div>

        {/* Brand name */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: 1, fontFamily: 'sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            ELITE GROUP BD
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontFamily: 'sans-serif', letterSpacing: 2, textTransform: 'uppercase' }}>
            Sales Force
          </div>
        </div>

        {/* Bangla tagline */}
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            marginTop: 4,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            transition: 'all 0.8s ease 0.3s',
            opacity: phase === 'enter' ? 0 : 1,
            transform: phase === 'enter' ? 'translateY(10px)' : 'translateY(0)',
          }}
        >
          আপনার কাজ, আপনার সাফল্য
        </div>
      </div>

      {/* Bottom loading bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              background: '#fff',
              borderRadius: 4,
              animation: 'so-load-bar 2s ease-in-out forwards',
            }}
          />
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, fontFamily: 'sans-serif' }}>
          লোড হচ্ছে...
        </div>
      </div>

      <style>{`
        @keyframes so-ring-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes so-load-bar {
          0% { width: 0%; }
          60% { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SOSplashScreen;
