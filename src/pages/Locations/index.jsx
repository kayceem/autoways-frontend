import NepalMap from '../../components/locations/NepalMap';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';

const Locations = () => {
    const { content, isLoading } = useContent();
    if (isLoading) return <LoadingSpinner size={64} />;
    const locations = content?.locations ? content.locations : [];
    return (
        <div className="min-h-screen bg-primary">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
                {/* Header Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-5xl font-bold text-secondary mb-3 lg:mb-4">Our Locations</h1>
                    <p className="text-sm lg:text-lg text-secondary opacity-80 max-w-2xl mx-auto">
                        Find Autoways across Nepal. We're here to serve you at multiple locations nationwide.
                    </p>
                </div>

                {/* Map Section */}
                <div className="mb-8 lg:mb-12">
                    <NepalMap />
                </div>

                {/* Locations Info Section */}
                <div className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        {locations.map((location) => (
                            <div key={location.locationId} className="bg-primary rounded-lg p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-lg lg:text-xl font-bold text-primary mb-2 lg:mb-3">{location.name}</h3>
                                <p className="text-sm lg:text-base text-primary mb-2">{location.address}</p>
                                <p className="text-xs lg:text-sm text-primary opacity-80 mb-2 lg:mb-3">{location.info}</p>
                                <p className="text-xs lg:text-sm text-accent font-semibold">{content.contactInfo?.[0].email}</p>
                                <p className="text-xs lg:text-sm text-accent font-semibold">{location.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;
