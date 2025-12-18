import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import logoMap from "../../../config/logoMap";
import { useContent } from "../../../context/globalContext";
import LoadingSpinner from "../../common/Loading";

const createCustomIcon = () => {
    return L.icon({
        iconUrl: logoMap.autoways,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

const NepalMap = () => {
    const customIcon = createCustomIcon();
    const { content, isLoading } = useContent();
    if (isLoading) return <LoadingSpinner size={64} />;
    
    const locations = content?.locations || [];
    const center = locations?.[0].position;
    return (
        <div className="nepal-map-container">
            <MapContainer
                center={center}
                zoom={8}
                scrollWheelZoom={true}
                className="nepal-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations?.map((location) => (
                    <Marker
                        key={location._id}
                        position={location.position}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="popup-content">
                                <h3 className="font-bold text-lg">
                                    {location.name}
                                </h3>
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
