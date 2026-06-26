import React, { useState, useEffect } from 'react';
import Joyride, { type CallBackProps, STATUS, type Step } from 'react-joyride';
import { Sparkles, ChevronRight, ChevronLeft, X } from 'lucide-react';

const TOUR_KEY = 'so_guided_tour_done_v1';

const steps: Step[] = [
  {
    target: 'body',
    placement: 'center',
    disableBeacon: true,
    content: (
      <div className="text-center px-2">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        <h2 className="text-lg font-extrabold text-gray-900 mb-1">Elite Group BD-তে স্বাগতম!</h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          আপনার সেলস ড্যাশবোর্ড প্রস্তুত। আসুন, ৩০ সেকেন্ডে পুরো অ্যাপটি ঘুরে দেখি।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-profile',
    placement: 'bottom',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ১ — আপনার প্রোফাইল</p>
        <h3 className="font-extrabold text-gray-900 mb-1">অ্যাকাউন্ট মেনু</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          এখানে আপনার নাম ও অ্যাভাটার রয়েছে। ট্যাপ করলে প্রোফাইল, সেটিংস ও লগ আউট অপশন পাবেন।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-notifications',
    placement: 'bottom',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ২ — নোটিফিকেশন</p>
        <h3 className="font-extrabold text-gray-900 mb-1">আপডেট ও সতর্কতা</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          নতুন কাজ, ডিলার আপডেট বা ম্যানেজারের বার্তা এখানে দেখা যাবে। লাল ডট মানে নতুন নোটিফিকেশন আছে।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-nav-home',
    placement: 'top',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ৩ — হোম</p>
        <h3 className="font-extrabold text-gray-900 mb-1">আজকের সারসংক্ষেপ</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          আপনার দৈনিক পারফরম্যান্স, টার্গেট অগ্রগতি এবং রুট ওভারভিউ এখানে একনজরে দেখুন।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-nav-todo',
    placement: 'top',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ৪ — আজকের কাজ</p>
        <h3 className="font-extrabold text-gray-900 mb-1">টাস্ক লিস্ট</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          ম্যানেজার আপনার জন্য যে কাজ নির্ধারণ করেছেন তা এখানে দেখুন। কাজ শেষ হলে টিক দিন।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-nav-map',
    placement: 'top',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ৫ — লাইভ ম্যাপ</p>
        <h3 className="font-extrabold text-gray-900 mb-1">রুট ম্যাপ</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          আপনার আজকের ভিজিটের রুট, পরবর্তী গন্তব্য এবং কাজের অগ্রগতি লাইভ ম্যাপে দেখুন।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-nav-reports',
    placement: 'top',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ৬ — রিপোর্ট</p>
        <h3 className="font-extrabold text-gray-900 mb-1">দৈনিক রিপোর্ট</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          দিন শেষে আপনার বিক্রয়, সংগ্রহ ও ভিজিটের সম্পূর্ণ রিপোর্ট এখানে সাবমিট করুন।
        </p>
      </div>
    ),
  },
  {
    target: '#tour-chatbot',
    placement: 'top-end',
    disableBeacon: true,
    content: (
      <div>
        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">ধাপ ৭ — AI সহকারী</p>
        <h3 className="font-extrabold text-gray-900 mb-1">আপনার স্মার্ট সহকারী</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          যেকোনো প্রশ্ন বা সাহায্যের জন্য এই বাটনটি ট্যাপ করুন। AI আপনাকে সঠিক পরামর্শ দেবে।
        </p>
      </div>
    ),
  },
];

// Custom Tooltip Component
const TourTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}: any) => (
  <div
    {...tooltipProps}
    className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 p-5 max-w-[290px] w-[290px] font-sans"
  >
    {/* Step indicator */}
    {index > 0 && (
      <div className="flex gap-1 mb-3">
        {steps.slice(1).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < index ? 'bg-orange-500' : i === index - 1 ? 'bg-orange-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )}

    {/* Content */}
    <div className="mb-4">{step.content}</div>

    {/* Actions */}
    <div className="flex items-center justify-between gap-2">
      <button
        {...closeProps}
        className="text-xs text-gray-400 hover:text-gray-600 font-semibold flex items-center gap-1 transition-colors"
      >
        <X className="w-3 h-3" /> এড়িয়ে যান
      </button>

      <div className="flex items-center gap-2">
        {index > 0 && (
          <button
            {...backProps}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> পেছনে
          </button>
        )}
        <button
          {...primaryProps}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/30 transition-all active:scale-95"
        >
          {continuous && index < steps.length - 1 ? (
            <>পরবর্তী <ChevronRight className="w-3.5 h-3.5" /></>
          ) : (
            'শুরু করুন! 🎉'
          )}
        </button>
      </div>
    </div>
  </div>
);

const SOGuidedTour: React.FC = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Only show tour if it hasn't been completed before
    const isDone = localStorage.getItem(TOUR_KEY);
    if (!isDone) {
      // Small delay so the UI fully renders first
      const timer = setTimeout(() => setRun(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem(TOUR_KEY, 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      scrollToFirstStep
      disableScrolling={false}
      tooltipComponent={TourTooltip}
      callback={handleCallback}
      styles={{
        options: {
          zIndex: 9999,
          overlayColor: 'rgba(0, 0, 0, 0.55)',
          spotlightShadow: '0 0 0 3px rgba(249, 115, 22, 0.5)',
        },
        spotlight: {
          borderRadius: 16,
        },
      }}
      floaterProps={{
        disableAnimation: false,
      }}
    />
  );
};

export default SOGuidedTour;
