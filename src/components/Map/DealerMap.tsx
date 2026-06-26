import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Dealer } from '../../data/mockData';
import { getNextBestAction } from '../../data/mockData';
import '../../pages/SO/SOMap.css';

// Fix leaflet default marker icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DealerMapProps {
  dealers: Dealer[];
  center?: [number, number];
  zoom?: number;
}

const getPriorityClass = (score: number): string => {
  if (score > 70) return 'priority-high';
  if (score > 40) return 'priority-medium';
  return 'priority-low';
};

const createTaskIcon = (priorityClass: string) => {
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><rect width="20" height="5" x="2" y="7"/></svg>`;

  return L.divIcon({
    className: '',
    html: `
      <div class="task-marker ${priorityClass}">
        <div class="task-marker-shield">${iconSvg}</div>
        <div class="task-marker-pin"></div>
        <div class="task-marker-shadow"></div>
      </div>
    `,
    iconSize: [44, 60],
    iconAnchor: [22, 50],
  });
};

export function DealerMap({ dealers, center = [23.8103, 90.4125], zoom = 12 }: DealerMapProps) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-border so-map-root" style={{ height: '300px' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {dealers.map((dealer) => {
          const action = getNextBestAction(dealer);
          const icon = createTaskIcon(getPriorityClass(action.priorityScore));
          
          return (
            <Marker key={dealer.id} position={[dealer.location.lat, dealer.location.lng]} icon={icon}>
              <Tooltip direction="top" offset={[0, -34]} opacity={1} className="custom-map-tooltip">
                <div className="tooltip-content">
                  <p className="tooltip-title">{dealer.name}</p>
                  <p className="tooltip-reason">{action.reason}</p>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
