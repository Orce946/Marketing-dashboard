import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Dealer } from '../../data/mockData';

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

export function DealerMap({ dealers, center = [23.8103, 90.4125], zoom = 12 }: DealerMapProps) {
  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-slate-700">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {dealers.map((dealer) => (
          <Marker key={dealer.id} position={[dealer.location.lat, dealer.location.lng]}>
            <Popup>
              <div className="text-slate-900 font-sans">
                <h3 className="font-bold text-lg mb-1">{dealer.name}</h3>
                <p className="text-sm mb-1">{dealer.location.address}</p>
                <div className="text-sm">
                  <span className="font-semibold text-rose-600">Dues: </span>
                  ${dealer.dues.total}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
