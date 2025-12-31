import NepalMap from '../../components/locations/NepalMap';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import SEO from '../../components/common/SEO';
import StructuredData from '../../components/common/StructuredData';
import { generateLocalBusinessSchema } from '../../utils/seoHelpers';

const Locations = () => {
    const { content, isLoading } = useContent();
    if (isLoading) return <LoadingSpinner size={64} />;
    const locations = content?.locations ? content.locations : [];

    // Generate LocalBusiness schema for each location
    const locationSchemas = locations.map(location =>
        generateLocalBusinessSchema({
            name: `Autoways ${location.info} - ${location.name}`,
            address: location.address,
            phone: location.phone,
            position: location.position,
        })
    ).filter(Boolean);

    return (
        <>
        <SEO
            title="Our Locations | Service Centers Across Nepal"
            description="Find Autoways service centers and showrooms across Nepal. Visit us in Kathmandu, Pokhara, Chitwan, and other locations for Bull machines, Toyota, and automotive services."
            keywords="autoways locations, autoways nepal branches, bull service center nepal, toyota showroom nepal, autoways pokhara, autoways kathmandu"
            url="/locations"
            type="website"
        />
        {locationSchemas.length > 0 && <StructuredData schema={locationSchemas} />}
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
                        {locations.map((location, index) => (
                            <div key={index} className="bg-primary rounded-lg p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-lg lg:text-xl font-bold text-primary mb-2 lg:mb-3">{location.name}</h3>
                                <p className="text-sm lg:text-base text-primary mb-2">{location.address}</p>
                                <p className="text-xs lg:text-sm text-primary opacity-80 mb-2 lg:mb-3">{location.info}</p>
                                <p>
                                    <a className="text-xs lg:text-sm text-accent font-semibold hover:opacity-80"  href={`mailto:${content.contactInfo?.[0].email}`}>{content.contactInfo?.[0].email}</a>
                                </p>
                                <p>
                                    <a className="text-xs lg:text-sm text-accent font-semibold hover:opacity-80" href={`tel:${location.phone}`}>{location.phone}</a>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Locations;
