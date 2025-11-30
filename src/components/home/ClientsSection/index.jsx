import "./index.css";
const ClientsSection = ({ clients = {}, className = "" }) => {
    // Convert clients object to array
    const clientArray = Object.entries(clients).map(([key, client]) => ({
        id: key,
        ...client,
    }));

    // Duplicate the array for seamless infinite scroll
    const duplicatedClients = [...clientArray, ...clientArray];

    return (
        <section className={`py-32 px-6 bg-primary ${className}`}>
            {/* Wavy Background Pattern */}
            <div className="absolute inset-0 opacity-[0.09]">
                <svg
                    className="absolute w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 800"
                    fill="none"
                >
                    {/* Flowing Wave 1 */}
                    <path
                        d="M-100,200 C200,100 400,300 600,200 S1000,100 1200,200 S1600,300 1800,200"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Flowing Wave 2 */}
                    <path
                        d="M-100,350 C150,250 350,450 600,350 S900,250 1150,350 S1400,450 1700,350"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                    {/* Flowing Wave 3 */}
                    <path
                        d="M-50,500 C200,400 450,600 700,500 S1050,400 1300,500 S1550,600 1800,500"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Flowing Wave 4 */}
                    <path
                        d="M-100,650 C100,550 350,750 650,650 S950,550 1250,650 S1550,750 1800,650"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Curved Accent Lines */}
            <div className="absolute inset-0 opacity-[0.1]">
                <svg
                    className="absolute w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 800"
                    fill="none"
                >
                    {/* Sweeping Curve 1 */}
                    <path
                        d="M0,100 Q360,400 720,200 T1440,300"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                    />
                    {/* Sweeping Curve 2 */}
                    <path
                        d="M0,600 Q400,300 800,500 T1440,400"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Circular Arc */}
                    <circle
                        cx="1200"
                        cy="150"
                        r="200"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                    {/* Circular Arc 2 */}
                    <circle
                        cx="200"
                        cy="700"
                        r="150"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
            </div>
            <div className="max-w-7xl mx-auto">
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
                                        client.logo ||
                                        client.image ||
                                        client.images?.[0]
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
                                {clientArray.length}+
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
                                15+
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
