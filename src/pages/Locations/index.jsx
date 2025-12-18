import NepalMap from '../../components/locations/NepalMap';
import './index.css';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';

const Locations = () => {
    const { content, isLoading } = useContent();
    if (isLoading) return <LoadingSpinner size={64} />;
    const locations = content?.locations ? content.locations : [];
    console.log('Locations content:', locations);
    return (
        <div className="locations-page">
            <div className="locations-container">
                {/* Header Section */}
                <div className="locations-header">
                    <h1 className="locations-title">Our Locations</h1>
                    <p className="locations-subtitle">
                        Find Autoways across Nepal. We're here to serve you at multiple locations nationwide.
                    </p>
                </div>

                {/* Map Section */}
                <div className="map-section">
                    <NepalMap />
                </div>

                {/* Locations Info Section */}
                <div className="locations-info">
                    <div className="info-grid">
                        {locations.map((location) => (
                            <div key={location.locationId} className="info-card">
                                <h3 className="info-title">{location.name}</h3>
                                <p className="info-address">{location.address}</p>
                                <p className="info-description">{location.info}</p>
                                <p className="info-email">{content.contactInfo?.[0].email}</p>
                                <p className="info-contact">{location.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;
