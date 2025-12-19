const SpecificationsDisplay = ({ specifications = {}, fuelType = 'normal' }) => {
    if (!specifications || Object.keys(specifications).length === 0) {
        return null;
    }

    const formatKey = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    };

    const renderSpecValue = (value) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
                <div className="flex flex-col gap-2 pl-2 border-l-2 border-accent">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="flex gap-2 items-start">
                            <span className="text-sm font-semibold opacity-70 text-primary flex-shrink-0">{formatKey(subKey)}:</span>
                            <span className="text-sm font-medium text-primary">
                                {typeof subValue === 'object' ? JSON.stringify(subValue) : subValue}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value?.toString() || 'N/A';
    };

    const renderSpecSection = (title, data) => {
        if (!data || Object.keys(data).length === 0) return null;

        return (
            <div className="mb-6 lg:mb-10 bg-gradient-to-br from-secondary to-secondary/95 rounded-2xl p-4 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg lg:text-2xl font-bold mb-4 lg:mb-6 pb-3 border-b-2 border-accent flex items-center text-primary">
                    <span className="w-1 h-6 bg-accent mr-3 rounded"></span>
                    {title}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="bg-primary/5 p-3 lg:p-4 rounded-xl border border-primary/10 transition-all duration-300 hover:bg-accent/5 hover:border-accent hover:translate-x-1">
                            <div className="text-xs lg:text-sm font-semibold opacity-70 mb-2 uppercase tracking-wide text-primary">{formatKey(key)}</div>
                            <div className="text-sm lg:text-base font-semibold leading-relaxed text-primary">{renderSpecValue(value)}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Engine/Motor Section */}
            {fuelType === 'electric' && specifications.motor && (
                renderSpecSection('Motor', specifications.motor)
            )}
            {fuelType !== 'electric' && specifications.engine && (
                renderSpecSection('Engine', specifications.engine)
            )}

            {/* Battery Section (for electric and hybrid) */}
            {(fuelType === 'electric' || fuelType.startsWith('hybrid')) && specifications.battery && (
                renderSpecSection('Battery', specifications.battery)
            )}

            {/* Performance */}
            {specifications.performance && (
                renderSpecSection('Performance', specifications.performance)
            )}

            {/* Dimensions */}
            {specifications.dimensions && (
                renderSpecSection('Dimensions', specifications.dimensions)
            )}

            {/* Capacities */}
            {specifications.capacities && (
                renderSpecSection('Capacities', specifications.capacities)
            )}

            {/* Hydraulics (for construction equipment) */}
            {specifications.hydraulics && (
                renderSpecSection('Hydraulics', specifications.hydraulics)
            )}

            {/* Lift Arm (for skid steers) */}
            {specifications.liftArm && (
                renderSpecSection('Lift Arm', specifications.liftArm)
            )}

            {/* Tipping (for tippers) */}
            {specifications.tipping && (
                renderSpecSection('Tipping System', specifications.tipping)
            )}

            {/* Chassis (for trucks) */}
            {specifications.chassis && (
                renderSpecSection('Chassis', specifications.chassis)
            )}

            {/* Offroad (for SUVs) */}
            {specifications.offroad && (
                renderSpecSection('Off-Road Capability', specifications.offroad)
            )}

            {/* Travel (for excavators) */}
            {specifications.travel && (
                renderSpecSection('Travel', specifications.travel)
            )}

            {/* Safety */}
            {specifications.safety && (
                renderSpecSection('Safety Features', specifications.safety)
            )}

            {/* Features (for scooters) */}
            {specifications.features && (
                renderSpecSection('Features', specifications.features)
            )}

            {/* Technology (for scooters) */}
            {specifications.technology && (
                renderSpecSection('Technology', specifications.technology)
            )}
        </div>
    );
};

export default SpecificationsDisplay;
