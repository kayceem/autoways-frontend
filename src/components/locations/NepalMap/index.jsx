import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import useLogoMap from "../../../config/logoMap";
import { useContent } from "../../../context/globalContext";
import LoadingSpinner from "../../common/Loading";
import { assetUrl } from "../../../utils";

const createCustomIcon = () => {
    const { logoMap } = useLogoMap();
    
    return L.icon({
        iconUrl: assetUrl(logoMap.autoways),
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
        <div className="w-full h-[400px] lg:h-[600px] relative rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={center}
                zoom={8}
                scrollWheelZoom={true}
                className="w-full h-full z-[1]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations?.map((location, index) => (
                    <Marker
                        key={index}
                        position={location.position}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="text-center p-2">
                                <h3 className="font-bold text-base lg:text-lg mb-1 text-gray-900">
                                    {location.name}
                                </h3>
                                <p className="text-xs lg:text-sm text-gray-600 m-0">{location.info}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default NepalMap;
