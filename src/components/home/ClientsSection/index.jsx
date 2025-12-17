import "./index.css";
import WaveBackground from "../../common/WaveBackground";
import { assetUrl } from '../../../utils/assetUrl';

const ClientsSection = ({ clients = {}, className = "" }) => {
    // Convert clients object to array
    const clientArray = Object.entries(clients).map(([key, client]) => ({
        id: key,
        ...client,
    }));

    // Duplicate the array for seamless infinite scroll
    const duplicatedClients = [...clientArray, ...clientArray];

    return (
        <section className={`relative py-32 px-6 bg-primary overflow-hidden ${className}`}>
            {/* Wave Background - Top */}
            <WaveBackground
                position="top"
                opacity={0.1}
                waveColor="#232323"
                animate={true}
            />

            {/* Wave Background - Bottom */}
            <WaveBackground
                position="bottom"
                opacity={0.15}
                waveColor="#b9b3b3ff"
                animate={true}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-secondary mb-4">
                        Trusted by Leading Organizations
                    </h2>
                    <p className="text-xl text-secondary max-w-2xl mx-auto">
                        Join thousands of satisfied clients who chose us for
                        their automotive needs
                    </p>
                </div>

                {/* Auto-Scrolling Horizontal Logos */}
                <div className="relative overflow-hidden mb-24">
                    {/* Gradient Fade on Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Container */}
                    <div className="flex gap-12 animate-scroll">
                        {duplicatedClients.map((client, index) => (
                            <div
                                key={`${client.id}-${index}`}
                                className="flex-shrink-0 w-[200px] h-[120px] bg-white rounded-xl p-6 flex items-center justify-center border border-primary/10 hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={
                                        assetUrl(client.logo) ||
                                        assetUrl(client.image)
                                    }
                                    alt={client.name || `Client ${client.id}`}
                                    className="max-w-full max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                    title={client.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Numerical Metrics */}
                <div className="border-t border-primary pt-16">
                    <div className="grid grid-cols-4 gap-12">
                        <div className="text-center">
                            <div className="text-6xl font-bold text-secondary mb-3">
                                1000+
                            </div>
                            <div className="text-lg text-secondary font-medium">
                                Happy Clients
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-secondary mb-3">
                                99%
                            </div>
                            <div className="text-lg text-secondary font-medium">
                                Satisfaction Rate
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-secondary mb-3">
                                24/7
                            </div>
                            <div className="text-lg text-secondary font-medium">
                                Customer Support
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-secondary mb-3">
                                20+
                            </div>
                            <div className="text-lg text-secondary font-medium">
                                Years Experience
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
