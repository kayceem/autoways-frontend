import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './index.css';

const SpecificationsDisplay = ({ specifications = {}, fuelType = 'normal' }) => {
    const [openSection, setOpenSection] = useState(null);

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
                <div className="flex flex-col gap-2 pl-3 border-l-2 border-neutral-300">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="flex gap-2 items-start">
                            <span className="text-xs lg:text-sm font-medium opacity-60 text-secondary flex-shrink-0 min-w-[120px]">{formatKey(subKey)}:</span>
                            <span className="text-xs lg:text-sm font-semibold text-secondary">
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

    const toggleSection = (sectionId) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
    };

    const renderSpecSection = (title, data, sectionId) => {
        if (!data || Object.keys(data).length === 0) return null;

        const isOpen = openSection === sectionId;

        return (
            <div className="mb-3 bg-primary rounded-lg border border-neutral-200 overflow-hidden transition-all duration-200 hover:border-neutral-300">
                <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between gap-4 text-left hover:bg-accent transition-colors duration-200"
                >
                    <h3 className="text-base lg:text-lg font-bold text-secondary flex items-center gap-3">
                        <span className="w-1 h-5 bg-accent-2 rounded"></span>
                        {title}
                    </h3>
                    <ChevronDown
                        size={20}
                        className={`flex-shrink-0 text-secondary accordion-chevron ${isOpen ? 'open' : ''}`}
                    />
                </button>

                <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
                    <div className="px-4 lg:px-6 pb-4 lg:pb-5 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                            {Object.entries(data).map(([key, value]) => (
                                <div key={key} className="bg-accent/10 p-3 lg:p-4 rounded-lg border border-accent/20 transition-all duration-200 hover:bg-accent/20 hover:border-accent/40">
                                    <div className="text-xs font-semibold opacity-60 mb-1.5 uppercase tracking-wide text-secondary">{formatKey(key)}</div>
                                    <div className="text-sm lg:text-base font-semibold leading-relaxed text-secondary">{renderSpecValue(value)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full space-y-3">
            {/* Engine/Motor Section */}
            {fuelType === 'electric' && specifications.motor && (
                renderSpecSection('Motor', specifications.motor, 'motor')
            )}
            {fuelType !== 'electric' && specifications.engine && (
                renderSpecSection('Engine', specifications.engine, 'engine')
            )}

            {/* Battery Section (for electric and hybrid) */}
            {(fuelType === 'electric' || fuelType.startsWith('hybrid')) && specifications.battery && (
                renderSpecSection('Battery', specifications.battery, 'battery')
            )}

            {/* Performance */}
            {specifications.performance && (
                renderSpecSection('Performance', specifications.performance, 'performance')
            )}

            {/* Dimensions */}
            {specifications.dimensions && (
                renderSpecSection('Dimensions', specifications.dimensions, 'dimensions')
            )}

            {/* Capacities */}
            {specifications.capacities && (
                renderSpecSection('Capacities', specifications.capacities, 'capacities')
            )}

            {/* Hydraulics (for construction equipment) */}
            {specifications.hydraulics && (
                renderSpecSection('Hydraulics', specifications.hydraulics, 'hydraulics')
            )}

            {/* Lift Arm (for skid steers) */}
            {specifications.liftArm && (
                renderSpecSection('Lift Arm', specifications.liftArm, 'liftArm')
            )}

            {/* Tipping (for tippers) */}
            {specifications.tipping && (
                renderSpecSection('Tipping System', specifications.tipping, 'tipping')
            )}

            {/* Chassis (for trucks) */}
            {specifications.chassis && (
                renderSpecSection('Chassis', specifications.chassis, 'chassis')
            )}

            {/* Offroad (for SUVs) */}
            {specifications.offroad && (
                renderSpecSection('Off-Road Capability', specifications.offroad, 'offroad')
            )}

            {/* Travel (for excavators) */}
            {specifications.travel && (
                renderSpecSection('Travel', specifications.travel, 'travel')
            )}

            {/* Safety */}
            {specifications.safety && (
                renderSpecSection('Safety Features', specifications.safety, 'safety')
            )}

            {/* Features (for scooters) */}
            {specifications.features && (
                renderSpecSection('Features', specifications.features, 'features')
            )}

            {/* Technology (for scooters) */}
            {specifications.technology && (
                renderSpecSection('Technology', specifications.technology, 'technology')
            )}
        </div>
    );
};

export default SpecificationsDisplay;
