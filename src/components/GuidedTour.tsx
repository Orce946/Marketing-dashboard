import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, X } from 'lucide-react';

const TOUR_KEY = 'so_guided_tour_done_v1';

interface TourStep {
  targetId: string;
  placement: 'top' | 'bottom' | 'center';
  title: string;
  label: string;
  body: string;
}

const steps: TourStep[] = [
  { targetId: '', placement: 'center', title: 'স্বাগতম!', label: '', body: 'আপনার সেলস ড্যাশবোর্ড প্রস্তুত। আসুন, ৩০ সেকেন্ডে পুরো অ্যাপটি ঘুরে দেখি।' },
  { targetId: 'tour-profile', placement: 'bottom', title: 'অ্যাকাউন্ট মেনু', label: 'ধাপ ১ — আপনার প্রোফাইল', body: 'এখানে আপনার নাম ও অ্যাভাটার রয়েছে। ট্যাপ করলে প্রোফাইল, সেটিংস ও লগ আউট পাবেন।' },
  { targetId: 'tour-notifications', placement: 'bottom', title: 'আপডেট ও সতর্কতা', label: 'ধাপ ২ — নোটিফিকেশন', body: 'নতুন কাজ, ডিলার আপডেট বা ম্যানেজারের বার্তা এখানে দেখা যাবে। লাল ডট মানে নতুন নোটিফিকেশন।' },
  { targetId: 'tour-nav-home', placement: 'top', title: 'আজকের সারসংক্ষেপ', label: 'ধাপ ৩ — হোম', body: 'দৈনিক পারফরম্যান্স, টার্গেট অগ্রগতি এবং রুট ওভারভিউ একনজরে দেখুন।' },
  { targetId: 'tour-nav-todo', placement: 'top', title: 'টাস্ক লিস্ট', label: 'ধাপ ৪ — আজকের কাজ', body: 'ম্যানেজার আপনার জন্য যে কাজ নির্ধারণ করেছেন তা এখানে দেখুন। কাজ শেষ হলে টিক দিন।' },
  { targetId: 'tour-nav-map', placement: 'top', title: 'রুট ম্যাপ', label: 'ধাপ ৫ — লাইভ ম্যাপ', body: 'আজকের ভিজিটের রুট, পরবর্তী গন্তব্য এবং কাজের অগ্রগতি লাইভ ম্যাপে দেখুন।' },
  { targetId: 'tour-nav-reports', placement: 'top', title: 'দৈনিক রিপোর্ট', label: 'ধাপ ৬ — রিপোর্ট', body: 'দিন শেষে বিক্রয়, সংগ্রহ ও ভিজিটের সম্পূর্ণ রিপোর্ট এখানে সাবমিট করুন।' },
  { targetId: 'tour-chatbot', placement: 'top', title: 'আপনার স্মার্ট সহকারী', label: 'ধাপ ৭ — AI সহকারী', body: 'যেকোনো প্রশ্ন বা সাহায্যের জন্য এই বাটনটি ট্যাপ করুন। AI সঠিক পরামর্শ দেবে।' },
];

const SOGuidedTour: React.FC = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [spotlight, setSpotlight] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY);
    if (!done) {
      const t = setTimeout(() => setActive(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const step = steps[index];
    if (!step.targetId) {
      // center modal
      setSpotlight({ top: 0, left: 0, width: 0, height: 0 });
      setTooltipPos({ top: window.innerHeight / 2 - 140, left: window.innerWidth / 2 - 145 });
      return;
    }
    const el = document.getElementById(step.targetId);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpotlight({ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12 });

    const tooltipWidth = 290;
    let top = 0;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (step.placement === 'bottom') top = rect.bottom + 12;
    else top = rect.top - 170;

    // clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
    top = Math.max(8, top);
    setTooltipPos({ top, left });
  }, [active, index]);

  const dismiss = () => {
    setActive(false);
    localStorage.setItem(TOUR_KEY, 'true');
  };

  const next = () => { if (index < steps.length - 1) setIndex(i => i + 1); else dismiss(); };
  const back = () => { if (index > 0) setIndex(i => i - 1); };

  if (!active) return null;

  const step = steps[index];
  const isCenter = !step.targetId;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99000, pointerEvents: 'none' }}>
      {/* Dark overlay */}
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', pointerEvents: 'all' }}
        onClick={dismiss}
      />

      {/* Spotlight cutout */}
      {!isCenter && spotlight.width > 0 && (
        <div
          style={{
            position: 'absolute',
            top: spotlight.top,
            left: spotlight.left,
            width: spotlight.width,
            height: spotlight.height,
            borderRadius: 12,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
            border: '2px solid rgba(34,197,94,0.7)',
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          top: tooltipPos.top,
          left: tooltipPos.left,
          width: 290,
          background: '#fff',
          borderRadius: 20,
          padding: '18px 18px 16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          border: '1px solid rgba(0,0,0,0.06)',
          pointerEvents: 'all',
          zIndex: 99001,
          transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Progress bar (skip for center/welcome) */}
        {index > 0 && (
          <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
            {steps.slice(1).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background: i < index ? '#22C55E' : i === index - 1 ? '#4ADE80' : '#E5E7EB',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Welcome icon */}
        {isCenter && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #4ADE80, #16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(34,197,94,0.35)' }}>
              <Sparkles style={{ width: 28, height: 28, color: '#fff' }} />
            </div>
          </div>
        )}

        {/* Label */}
        {step.label && (
          <p style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, margin: '0 0 4px' }}>
            {step.label}
          </p>
        )}

        {/* Title */}
        <h3 style={{ fontSize: isCenter ? 17 : 15, fontWeight: 800, color: '#111827', margin: '0 0 6px', textAlign: isCenter ? 'center' : 'left' }}>
          {step.title}
        </h3>

        {/* Body */}
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: '0 0 16px', textAlign: isCenter ? 'center' : 'left' }}>
          {step.body}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <button
            onClick={dismiss}
            style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0' }}
          >
            <X style={{ width: 12, height: 12 }} /> এড়িয়ে যান
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {index > 0 && (
              <button
                onClick={back}
                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', borderRadius: 10, background: '#F3F4F6', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#374151' }}
              >
                <ChevronLeft style={{ width: 14, height: 14 }} /> পেছনে
              </button>
            )}
            <button
              onClick={next}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px', borderRadius: 10, background: 'linear-gradient(135deg, #22C55E, #16A34A)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, color: '#fff', boxShadow: '0 4px 12px rgba(34,197,94,0.35)' }}
            >
              {index < steps.length - 1 ? (<>পরবর্তী <ChevronRight style={{ width: 14, height: 14 }} /></>) : 'শুরু করুন! 🎉'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOGuidedTour;
