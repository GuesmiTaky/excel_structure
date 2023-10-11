import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './mapLeaflet.css'; // Importer le fichier CSS personnalisé
import 'leaflet/dist/leaflet.css'; // Importer le fichier CSS de Leaflet

// Configuration de l'icône de marqueur personnalisée
const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});


const MapLeaflet = () => {
    return (
        <div className="map-container">
            <MapContainer center={[43.45893061333703, 5.4756414257642625]} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[43.45893061333703, 5.4756414257642625]} icon={customMarkerIcon} />
                <Marker position={[43.32892784226774, 5.431401524105555]} icon={customMarkerIcon} />
            </MapContainer>
        </div>
    );
};

export default MapLeaflet;
