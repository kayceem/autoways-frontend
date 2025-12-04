import './index.css';

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
                <div className="spec-nested">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="spec-nested-item">
                            <span className="spec-nested-key">{formatKey(subKey)}:</span>
                            <span className="spec-nested-value">
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
            <div className="spec-section">
                <h3 className="spec-section-title">{title}</h3>
                <div className="spec-grid">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="spec-item">
                            <div className="spec-label">{formatKey(key)}</div>
                            <div className="spec-value">{renderSpecValue(value)}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="specifications-display">
            {/* Engine/Motor Section */}
            {fuelType === 'electric' && specifications.motor && (
                renderSpecSection('Motor', specifications.motor)
            )}
            {fuelType !== 'electric' && specifications.engine && (
                renderSpecSection('Engine', specifications.engine)
            )}

            {/* Battery Section (for electric and hybrid) */}
            {(fuelType === 'electric' || fuelType === 'hybrid') && specifications.battery && (
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
