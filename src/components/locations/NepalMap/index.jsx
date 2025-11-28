import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import autowaysLogo from '../../../assets/images/autoways-logo.png';
import './index.css';

// Create custom icon using autoways logo
const createCustomIcon = () => {
    return L.icon({
        iconUrl: autowaysLogo,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

// Nepal locations with 7 major cities
const locations = [
    {
        id: 1,
        name: 'Kathmandu',
        position: [27.7172, 85.3240],
        info: 'Capital City - Main Office'
    },
    {
        id: 2,
        name: 'Pokhara',
        position: [28.2096, 83.9856],
        info: 'Pokhara Branch'
    },
    {
        id: 3,
        name: 'Biratnagar',
        position: [26.4525, 87.2718],
        info: 'Biratnagar Branch'
    },
    {
        id: 4,
        name: 'Birgunj',
        position: [27.0104, 84.8788],
        info: 'Birgunj Branch'
    },
    {
        id: 5,
        name: 'Nepalgunj',
        position: [28.0500, 81.6167],
        info: 'Nepalgunj Branch'
    },
    {
        id: 6,
        name: 'Dharan',
        position: [26.8124, 87.2833],
        info: 'Dharan Branch'
    },
    {
        id: 7,
        name: 'Hetauda',
        position: [27.4287, 85.0326],
        info: 'Hetauda Branch'
    }
];

const NepalMap = () => {
    const customIcon = createCustomIcon();

    // Center of Nepal
    const center = [28.3949, 84.1240];

    return (
        <div className="nepal-map-container">
            <MapContainer
                center={center}
                zoom={7}
                scrollWheelZoom={true}
                className="nepal-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={location.position}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="popup-content">
                                <h3 className="font-bold text-lg">{location.name}</h3>
                                <p className="text-sm">{location.info}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default NepalMap;
