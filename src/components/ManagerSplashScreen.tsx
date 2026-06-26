import React, { useState, useEffect } from 'react';

const MANAGER_SPLASH_KEY = 'manager_splash_shown_v1';

const BOOT_LINES = [
  'Authenticating credentials...',
  'Loading territory data...',
  'Syncing live SO positions...',
  'Fetching exception alerts...',
  'System Ready ✓',
];

const ManagerSplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'enter' | 'stay' | 'exit'>('enter');
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(MANAGER_SPLASH_KEY);
    if (!alreadyShown) {
      setVisible(true);
      const stayTimer = setTimeout(() => setPhase('stay'), 100);
      const exitTimer = setTimeout(() => setPhase('exit'), 2800);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(MANAGER_SPLASH_KEY, 'true');
      }, 3400);
      return () => {
        clearTimeout(stayTimer);
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  // Typewriter effect for boot lines
  useEffect(() => {
    if (!visible || phase === 'enter') return;
    if (bootLineIndex >= BOOT_LINES.length) return;

    const currentLine = BOOT_LINES[bootLineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayedText(prev => prev + currentLine[charIndex]);
        setCharIndex(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      // Move to next line after a short pause
      if (bootLineIndex < BOOT_LINES.length - 1) {
        const t = setTimeout(() => {
          setDisplayedText('');
          setCharIndex(0);
          setBootLineIndex(i => i + 1);
        }, 320);
        return () => clearTimeout(t);
      }
    }
  }, [visible, phase, charIndex, bootLineIndex]);

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
        background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 50%, #0B1F3A 100%)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(0.97)' : 'scale(1)',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
        overflow: 'hidden',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          animation: 'mgr-grid-drift 8s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Top-left corner scan line accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)',
        animation: 'mgr-scan-line 2.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Center Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'translateY(24px)' : 'translateY(0)',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 28px',
            borderRadius: 16,
            background: 'rgba(56,189,248,0.08)',
            border: '1px solid rgba(56,189,248,0.25)',
            boxShadow: '0 0 40px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Logo block */}
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #1D4ED8, #38BDF8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 16,
            color: '#fff',
            letterSpacing: -1,
            boxShadow: '0 4px 16px rgba(56,189,248,0.3)',
          }}>
            EG
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#F0F9FF', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              ELITE GROUP BD
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#38BDF8', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              Command Center
            </div>
          </div>
        </div>

        {/* Boot terminal output */}
        <div
          style={{
            width: 340,
            padding: '16px 20px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(56,189,248,0.12)',
            minHeight: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#38BDF8', fontSize: 12, fontWeight: 700 }}>{'>'}</span>
            <span style={{ color: '#94A3B8', fontSize: 12, fontWeight: 500 }}>
              {displayedText}
              <span style={{ animation: 'mgr-cursor-blink 0.8s step-end infinite', color: '#38BDF8' }}>|</span>
            </span>
          </div>
          {/* Completed lines as thin progress dots */}
          {bootLineIndex > 0 && (
            <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
              {BOOT_LINES.slice(0, bootLineIndex).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 2,
                    flex: 1,
                    borderRadius: 2,
                    background: i === BOOT_LINES.length - 2 ? '#22C55E' : '#38BDF8',
                    opacity: 0.7,
                  }}
                />
              ))}
              {BOOT_LINES.slice(bootLineIndex).map((_, i) => (
                <div key={i + bootLineIndex} style={{ height: 2, flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom version tag */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        color: 'rgba(148,163,184,0.5)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
      }}>
        Management Console v2.0
      </div>

      <style>{`
        @keyframes mgr-grid-drift {
          0% { background-position: 0 0; }
          100% { background-position: 32px 32px; }
        }
        @keyframes mgr-scan-line {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        @keyframes mgr-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ManagerSplashScreen;
