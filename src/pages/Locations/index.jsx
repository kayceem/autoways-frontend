import NepalMap from '../../components/locations/NepalMap';
import './index.css';

const Locations = () => {
    return (
        <main className="locations-page">
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
                        <div className="info-card">
                            <h3 className="info-title">Kathmandu</h3>
                            <p className="info-description">Capital City - Main Office</p>
                        </div>
                        <div className="info-card">
                            <h3 className="info-title">Pokhara</h3>
                            <p className="info-description">Pokhara Branch</p>
                        </div>
                        <div className="info-card">
                            <h3 className="info-title">Biratnagar</h3>
                            <p className="info-description">Biratnagar Branch</p>
                        </div>
                        <div className="info-card">
                            <h3 className="info-title">Birgunj</h3>
                            <p className="info-description">Birgunj Branch</p>
                        </div>
                        <div className="info-card">
                            <h3 className="info-title">Nepalgunj</h3>
                            <p className="info-description">Nepalgunj Branch</p>
                        </div>
                        <div className="info-card">
                            <h3 className="info-title">Dharan</h3>
                            <p className="info-description">Dharan Branch</p>
                        </div>
                        <div className="info-card">
                            <h3 className="info-title">Hetauda</h3>
                            <p className="info-description">Hetauda Branch</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Locations;
