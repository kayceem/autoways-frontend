import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './index.css';

const SpecificationsDisplay = ({ specifications = {}, fuelType = 'normal' }) => {
    const [openSections, setOpenSections] = useState({});

    if (!specifications || Object.keys(specifications).length === 0) {
        return null;
    }

    // const formatKey = (key) => {
    //     return key
    //         .replace(/([A-Z])/g, ' $1')
    //         .replace(/^./, (str) => str.toUpperCase())
    //         .trim();
    // };

    // const renderSpecValue = (value) => {
    //     if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    //         return (
    //             <div className="flex flex-col gap-3 pl-4 border-l-2 border-accent/20">
    //                 {Object.entries(value).map(([subKey, subValue]) => (
    //                     <div key={subKey} className="flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-3">
    //                         <span className="text-xs font-semibold opacity-50 text-secondary uppercase tracking-wider min-w-[140px]">{formatKey(subKey)}</span>
    //                         <span className="text-sm lg:text-base font-bold text-secondary">
    //                             {typeof subValue === 'object' ? JSON.stringify(subValue) : subValue}
    //                         </span>
    //                     </div>
    //                 ))}
    //             </div>
    //         );
    //     }
    //     if (Array.isArray(value)) {
    //         return value.join(', ');
    //     }
    //     return value?.toString() || 'N/A';
    // };

    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const renderSpecSection = (title, data=[], sectionId) => {
        if (!data || data.length === 0) return null;

        const isOpen = openSections[sectionId];

        return (
            <div className="mb-4 bg-primary rounded-xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-sm">
                <button
                    onClick={() => toggleSection(sectionId)}
                    className={`w-full px-5 lg:px-7 py-4 lg:py-5 flex items-center justify-between gap-4 text-left hover:bg-accent/5 ${!isOpen ? 'transition-all duration-300 group' : ''}`}
                >
                    <h3 className="text-base lg:text-xl font-bold text-secondary flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                        <span className="w-1 h-6 bg-accent-2 rounded group-hover:h-8 transition-all duration-300"></span>
                        {title}
                    </h3>
                    <ChevronDown
                        size={22}
                        className={`flex-shrink-0 text-secondary accordion-chevron ${isOpen ? 'open' : ''} group-hover:text-accent transition-colors duration-300`}
                    />
                </button>

                <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
                    <div className="px-5 lg:px-7 pb-6 lg:pb-8 pt-2">
                        <div className="space-y-4 lg:space-y-5">
                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-start gap-2 lg:gap-80 py-3 border-b border-neutral-100 last:border-b-0 hover:bg-accent/5 px-3 rounded transition-all duration-200 animate-slide-up"
                                    style={{animationDelay: `${index * 30}ms`}}
                                >
                                    <div className="text-xs lg:text-sm font-bold opacity-60 text-secondary uppercase tracking-wider min-w-[160px] sm:w-[160px] flex-shrink-0">
                                        {item.name}
                                    </div>
                                    <div className="text-sm lg:text-base font-semibold leading-relaxed text-secondary flex-1">
                                        {item.value}
                                    </div>
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
            {specifications.general && (
                renderSpecSection('General', specifications.general, 'general')
            )}
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

            {/* Interior */}
            {specifications.interior && (
                renderSpecSection('Interior', specifications.interior, 'interior')
            )}

            {/* Features (for scooters) */}
            {specifications.features && (
                renderSpecSection('Features', specifications.features, 'features')
            )}

            {/* Technology (for scooters) */}
            {specifications.technology && (
                renderSpecSection('Technology', specifications.technology, 'technology')
            )}

            {/* Connectivity */}
            {specifications.connectivity && (
                renderSpecSection('Connectivity', specifications.connectivity, 'connectivity')
            )}

            {/* Range */}
            {specifications.range && (
                renderSpecSection('Range', specifications.range, 'range')
            )} 

            {/* Ride Assist */}
            {specifications.rideAssist && (
                renderSpecSection('Ride Assist', specifications.rideAssist, 'rideAssist')
            )}

            {/* Electronics */}
            {specifications.electronics && (
                renderSpecSection('Electronics', specifications.electronics, 'electronics')
            )}
        </div>
    );
};

export default SpecificationsDisplay;
