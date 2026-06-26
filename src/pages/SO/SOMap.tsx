import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Navigation, Store, ShoppingBag, CheckCircle, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { dealers, getRecommendedVisitPlan } from '../../data/mockData';
import './SOMap.css';

// ───────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────
interface TaskLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  reason: string;
  priorityScore: number;
  type: 'visit' | 'call' | 'email';
  status: 'pending' | 'completing' | 'completed';
}

// ───────────────────────────────────────────────────
// Constants — Officer's simulated GPS position
// ───────────────────────────────────────────────────
const OFFICER_POSITION: [number, number] = [23.7808, 90.4030]; // Central Dhaka
const OFFICER_INITIALS = 'MK';

// ───────────────────────────────────────────────────
// Custom Leaflet Icons via divIcon (rendered by CSS)
// ───────────────────────────────────────────────────

// "My Position" — pulsing avatar marker
const createMyPositionIcon = () =>
  L.divIcon({
    className: '',
    html: `
      <div class="my-position-marker">
        <div class="my-position-halo"></div>
        <div class="my-position-halo-ring"></div>
        <div class="my-position-avatar">${OFFICER_INITIALS}</div>
      </div>
    `,
    iconSize: [52, 52],
    iconAnchor: [26, 26],
  });

// "To-Do Task" — elegant shield pin
const createTaskIcon = (isNext: boolean, priorityClass: string, status: string) => {
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><rect width="20" height="5" x="2" y="7"/></svg>`;

  const checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  const statusClass = status === 'completing' ? 'completing' : '';
  const shieldContent = status === 'completing' ? checkSvg : iconSvg;

  return L.divIcon({
    className: '',
    html: `
      <div class="task-marker ${isNext ? 'is-next' : ''} ${priorityClass} ${statusClass}">
        <div class="task-marker-shield">${shieldContent}</div>
        <div class="task-marker-pin"></div>
        <div class="task-marker-shadow"></div>
      </div>
    `,
    iconSize: isNext ? [52, 68] : [44, 60],
    iconAnchor: isNext ? [26, 58] : [22, 50],
  });
};

// ───────────────────────────────────────────────────
// Helper: priority class from score
// ───────────────────────────────────────────────────
const getPriorityClass = (score: number): string => {
  if (score > 70) return 'priority-high';
  if (score > 40) return 'priority-medium';
  return 'priority-low';
};

// ───────────────────────────────────────────────────
// Sub-component: Recenter map on fly-to
// ───────────────────────────────────────────────────
const FlyToPosition: React.FC<{ position: [number, number]; zoom?: number }> = ({ position, zoom = 14 }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, zoom, { duration: 1.2 });
  }, [position, zoom, map]);
  return null;
};

// ───────────────────────────────────────────────────
// Sub-component: Animated dashed route polyline
// ───────────────────────────────────────────────────
const RouteLine: React.FC<{ from: [number, number]; to: [number, number] | null }> = ({ from, to }) => {
  if (!to) return null;
  return (
    <Polyline
      positions={[from, to]}
      pathOptions={{
        color: 'rgba(37, 99, 235, 0.4)',
        weight: 3,
        dashArray: '10 8',
        lineCap: 'round',
        lineJoin: 'round',
      }}
    />
  );
};

// ───────────────────────────────────────────────────
// Main Component
// ───────────────────────────────────────────────────
const SOMap: React.FC = () => {
  const navigate = useNavigate();
  const currentUserId = 'o-1';
  const [flyTarget, setFlyTarget] = useState<[number, number]>(OFFICER_POSITION);
  const [showFlash, setShowFlash] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Build task list from mock data
  const initialTasks = useMemo<TaskLocation[]>(() => {
    const plan = getRecommendedVisitPlan(currentUserId);
    return plan.map((action) => {
      const dealer = dealers.find((d) => d.id === action.dealerId);
      if (!dealer) return null;
      return {
        id: dealer.id,
        name: dealer.name,
        lat: dealer.location.lat,
        lng: dealer.location.lng,
        reason: action.reason,
        priorityScore: action.priorityScore,
        type: action.type,
        status: 'pending' as const,
      };
    }).filter(Boolean) as TaskLocation[];
  }, []);

  const [tasks, setTasks] = useState<TaskLocation[]>(initialTasks);

  // Derived: next task (first pending)
  const nextTask = useMemo(() => tasks.find((t) => t.status === 'pending'), [tasks]);
  const pendingTasks = useMemo(() => tasks.filter((t) => t.status === 'pending'), [tasks]);
  const completedCount = useMemo(() => tasks.filter((t) => t.status === 'completed').length, [tasks]);
  const allDone = pendingTasks.length === 0 && tasks.length > 0 && completedCount > 0;

  // Icons (memoized per-task)
  const myPosIcon = useMemo(() => createMyPositionIcon(), []);

  // Handle task completion animation
  const handleCompleteTask = useCallback((taskId: string) => {
    // 1. Set status to "completing" — triggers CSS animation
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'completing' as const } : t))
    );

    // Show green flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 800);

    // 2. After animation finishes, set to "completed" and fly to next target
    setTimeout(() => {
      setTasks((prev) => {
        const updated = prev.map((t) =>
          t.id === taskId ? { ...t, status: 'completed' as const } : t
        );
        // Find the next pending task after this completion
        const nextPending = updated.find((t) => t.status === 'pending');
        if (nextPending) {
          setFlyTarget([nextPending.lat, nextPending.lng]);
        }
        return updated;
      });
    }, 750);
  }, []);

  // Locate me
  const handleLocateMe = useCallback(() => {
    setFlyTarget([...OFFICER_POSITION]);
  }, []);

  // Navigate to next task on map
  const handleNavigateToNext = useCallback(() => {
    if (nextTask) {
      setFlyTarget([nextTask.lat, nextTask.lng]);
    }
  }, [nextTask]);

  return (
    <div className="so-map-root" id="so-action-map">
      {/* Completion green flash */}
      {showFlash && <div className="completion-flash" />}

      {/* Top Overlay Bar */}
      <div className="so-map-top-bar">
        <button
          className="so-map-back-btn"
          onClick={() => navigate(-1)}
          id="so-map-back"
          aria-label="Go back"
        >
          <ArrowLeft />
        </button>

        <div className="so-map-title-pill">
          <span className="so-map-title-text">আজকের রুট (Today's Route)</span>
          <span className="so-map-task-count">
            {completedCount}/{tasks.length} সম্পন্ন
          </span>
        </div>

        <button
          className="so-map-locate-btn"
          onClick={handleLocateMe}
          id="so-map-locate"
          aria-label="Locate me"
        >
          <Navigation />
        </button>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={OFFICER_POSITION}
        zoom={13}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Ultra-clean, low-distraction light basemap */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <FlyToPosition position={flyTarget} zoom={14} />

        {/* Dashed route from officer to next task */}
        {nextTask && (
          <RouteLine
            from={OFFICER_POSITION}
            to={[nextTask.lat, nextTask.lng]}
          />
        )}

        {/* My Position Marker */}
        <Marker position={OFFICER_POSITION} icon={myPosIcon} />

        {/* Task Markers — only show pending + completing */}
        {tasks
          .filter((t) => t.status !== 'completed')
          .map((task) => {
            const isNext = nextTask?.id === task.id;
            const priorityClass = getPriorityClass(task.priorityScore);
            const icon = createTaskIcon(isNext, priorityClass, task.status);

            return (
              <Marker
                key={task.id}
                position={[task.lat, task.lng]}
                icon={icon}
              >
                <Tooltip direction="top" offset={[0, -34]} opacity={1} className="custom-map-tooltip">
                  <div className="tooltip-content">
                    <p className="tooltip-title">{task.name}</p>
                    <p className="tooltip-reason">{task.reason}</p>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Floating Bottom Task Card */}
      {!allDone && nextTask && (
        <div className="so-map-task-card-container" ref={cardRef} key={nextTask.id}>
          <div className={`so-map-task-card ${nextTask.status === 'completing' ? 'completing-card' : ''}`}>
            {/* Card Header */}
            <div className="so-map-card-header">
              <div className={`so-map-card-icon ${getPriorityClass(nextTask.priorityScore)}`}>
                {nextTask.type === 'visit' ? <Store /> : <ShoppingBag />}
              </div>
              <div className="so-map-card-info">
                <div className="so-map-card-name">{nextTask.name}</div>
                <div className="so-map-card-reason">{nextTask.reason}</div>
              </div>
              <span className="so-map-card-badge next">পরবর্তী</span>
            </div>

            {/* Progress Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingLeft: 2 }}>
              {tasks.map(t => (
                <div
                  key={t.id}
                  className={`so-map-task-dot ${
                    t.status === 'completed' ? 'done' : t.id === nextTask.id ? 'active' : 'pending'
                  }`}
                />
              ))}
              <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', marginLeft: 4 }}>
                {pendingTasks.length} বাকি
              </span>
            </div>

            {/* Action Buttons */}
            <div className="so-map-card-actions">
              <button
                className="so-map-card-btn navigate"
                onClick={handleNavigateToNext}
                id="so-map-navigate-btn"
              >
                <MapPin style={{ width: 16, height: 16, display: 'inline-block', verticalAlign: -3, marginRight: 4 }} />
                নেভিগেট
              </button>
              <button
                className={`so-map-card-btn complete ${nextTask.status === 'completing' ? 'completing-btn' : ''}`}
                onClick={() => handleCompleteTask(nextTask.id)}
                id="so-map-complete-btn"
                disabled={nextTask.status === 'completing'}
              >
                <CheckCircle style={{ width: 16, height: 16, display: 'inline-block', verticalAlign: -3, marginRight: 4 }} />
                {nextTask.status === 'completing' ? 'সম্পন্ন হচ্ছে...' : 'সম্পন্ন করুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Done Overlay */}
      {allDone && (
        <div className="so-map-all-done">
          <div className="so-map-all-done-icon">
            <CheckCircle />
          </div>
          <h2>সব কাজ সম্পন্ন! 🎉</h2>
          <p>আজকের সব ভিজিট সফলভাবে শেষ হয়েছে।</p>
        </div>
      )}
    </div>
  );
};

export default SOMap;
