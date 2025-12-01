import Images from '../../assets';
const data = {
    // Hero Section Images
    hero_images: [
        {
            url: Images.HeroImageI,
            title: 'Unmatched Quality & Service',
            subtitle: 'Experience excellence with every purchase at Autoways',
            ctaText: 'Learn More',
            alt: 'Premium sedan in showroom'
        },
        {
            url: Images.HeroImageII,
            title: 'Discover Your Perfect Drive',
            subtitle: 'Explore our premium collection of luxury and performance vehicles',
            ctaText: 'Browse Inventory',
            alt: 'Luxury sports car on scenic road'
        },
        {
            url: Images.HeroImageIII,
            title: 'Your Journey Starts Here',
            subtitle: 'Find the vehicle that matches your lifestyle and dreams',
            ctaText: 'Get Started',
            alt: 'Modern SUV on mountain road'
        },
        {
            url: Images.HeroIV,
            title: 'Engineering Excellence',
            subtitle: 'Experience the pinnacle of automotive innovation and design',
            ctaText: 'Explore Models',
            alt: 'Advanced vehicle technology showcase'
        },
        {
            url: Images.HeroV,
            title: 'Built to Perform',
            subtitle: 'Rugged durability and off-road capability for the adventurous spirit',
            ctaText: 'View Collection',
            alt: 'Off-road vehicle conquering tough terrain'
        }
    ],

    // About Us Section
    about_us: {
        title: 'Welcome to Autoways',
        content: "Rooted in a strong legacy of entrepreneurship, Autoways has been a trusted name in Nepal’s automotive industry since its establishment in 2002 AD. Built on the core principle of “Inspiring customer loyalty through excellence in every service we provide” the company has cultivated a reputation for unwavering quality, professionalism, and integrity. \
With a strong commitment to innovation and operational excellence, Autoways continues to empower its talented workforce and contribute meaningfully to the nation’s economic progress. Our dedication to delivering superior services has fostered long-lasting relationships with customers, partners, and communities across Nepal. \
Autoways is privileged to represent some of the world’s most esteemed automotive brands including BULL Machines, Toyota, Komatsu, Ather, and Eicher, bringing global standards, advanced technology, and exceptional value to the market. \
Driven by purpose and shaped by excellence, Autoways remains committed to elevating mobility, advancing industry standards, and setting new benchmarks for quality and service in Nepal. \
",
        image: Images.AutowaysAbout
    },

    // Contact Information
    info: {
        email: "info@autoways.com.np",
        phone: "+977 061-582469",
        corporate_address: 'Kathnmandu, Nepal',
        address: 'Pokhara-9, Nayabazar, Kaski, Nepal',
        socialLinks: {
            facebook: 'https://facebook.com/autoways',
            instagram: 'https://instagram.com/autoways',
            twitter: 'https://twitter.com/autoways',
            linkedin: 'https://linkedin.com/company/autoways'
        }
    },
    locations: {
        center: [28.216404638438576, 83.98947531110578],
        points: [
            {
                id: 1,
                name: 'Kathmandu',
                position: [27.677199603297105, 85.3016552380678],
                address: 'Dhobigat-03, Lalitpur',
                info: 'Corporate Office',
                phone: '+977 01-5921699'
            },
            {
                id: 2,
                name: 'Pokhara',
                position: [28.216404638438576, 83.98947531110578],
                address: 'Nayabazar-09, Kaski',
                info: 'Head Office',
                phone: '+977 061-582469'
            },
            {
                id: 3,
                name: 'Chitwan',
                position: [27.675309702690157, 84.43153021108655],
                address:'Bharatpur-11, Chitwan',
                info: 'Chitwan Branch',
                phone: '+977 056-590924/056-590935'
            },
            {
                id: 4,
                name: 'Birgunj',
                position: [27.0104, 84.8788],
                address:'Gandakchowk, Bahuwari-15',
                info: 'Birgunj Branch',
                phone: '+977 9855073521'
            },
            {
                id: 5,
                name: 'Butwal',
                position: [27.672804398931735, 83.4643811642423],
                address:'Kalikanagar-10, Butwal',
                info: 'Butwal Branch',
                phone: '+977 071-419017'
            },
            {
                id: 6,
                name: 'Dhangadi',
                position: [28.68546267882992, 80.6201175002807],
                info: 'Dhangadi Branch',
                address:'Mohan Pura-13, Dhangadi',
                phone: '+977 9858480133'
            },
            {
                id: 7,
                name: 'Dang',
                position: [28.004397863091956, 82.47660288245483],
                address:'Ratanpur-14, Dang',
                info: 'Dang Dealership',
                phone: '+977 9857030854'
            },
            {
                id: 8,
                name: 'Surkhet',
                position: [28.592557669142433, 81.61688115740088],
                address:'Birendranagar-06, Surkhet',
                info: 'Surkhet Dealership',
                phone: '+977 9858030851'
            },
        ]
    },

    // Brands Section
    brands: {

        bull: {
            name: 'Bull',
            description: 'The ultimate driving machine. Precision German engineering meets luxurious performance.',
            images: [Images.BullHero],
            video: Images.BullVideo,
            logo: Images.BullLogo,
            productTypes: [{
                type: 'Loader',
                image: Images.BullLoader
            },
            {
                type: 'Skid',
                image: Images.BullSkid
            }
            ],
            products: {
                loader:
                    [
                        {
                            id: "bull-x1",
                            name: "HD-96",
                            type: "loader",
                            images: [Images.BullHD100, Images.BullHD100],
                            tag: "Heavy Duty",
                            price: 45000,
                            shortDescription: "Built for the toughest terrains"
                        },
                        {
                            id: "bull-x2",
                            name: "HD-76",
                            type: "loader",
                            images: [Images.BullHD100, Images.BullHD100],
                            tag: "New Model",
                            price: 50000,
                            shortDescription: "Advanced features for modern needs"
                        },
                        {
                            id: "bull-x2",
                            name: "HD-100",
                            type: "loader",
                            images: [Images.BullHD100, Images.BullHD100],
                            tag: "New Model",
                            price: 50000,
                            shortDescription: "Advanced features for modern needs"
                        }
                    ]
            }
        },
        toyota: {
            name: 'Toyota',
            description: 'Japanese engineering excellence with legendary reliability and fuel efficiency for every journey.',
            images: [Images.HeroImageIII],
            logo: Images.ToyotaLogo,
            productTypes: [{
                type: 'Sedan',
                image: Images.ToyotaSedan
            },
            {
                type: 'SUV',
                image: Images.ToyotaSUV
            }],
            products: {
                sedan:
                    [
                        {
                            id: "camry-2024",
                            name: "Toyota Camry 2024",
                            type: "sedan",
                            images: [Images.ToyotaCamry, Images.ToyotaCamryRight],
                            tag: "New Arrival",
                            price: 28000,
                            shortDescription: "The perfect blend of luxury and performance"
                        },
                    ]

            },
        },
        dongfeng: {
            name: 'Dongfeng',
            description: 'Luxury redefined. Innovation and elegance in every detail of these iconic vehicles.',
            images: [],
            logo: Images.DongfengLogo
        },
        komatsu: {
            name: 'Komatsu',
            description: 'Electric revolution. Sustainable performance with groundbreaking autonomous technology.',
            images: [Images.KomatsuHero],
            logo: Images.KomatsuLogo
        },
        eicher: {
            name: 'Eicher',
            description: 'The pursuit of perfection. Japanese luxury with meticulous craftsmanship and comfort.',
            images: [Images.EicherHero],
            logo: Images.EicherLogo
        },
        xcmg: {
            name: 'XCMG',
            description: 'Built to perform. Rugged durability and off-road capability for the adventurous spirit.',
            images: [],
            logo: Images.XCMGLogo
        },
        ather: {
            name: 'Ather',
            description: 'Futuristic design. Cutting-edge technology and eco-friendly performance in perfect harmony.',
            images: [],
            logo: Images.AtherLogo
        }
    },

    // Partners Section
    partners: {
        manipal: {
            name: 'Manipal Teaching Hospital',
            description: 'Flexible financing solutions with competitive rates for all credit types.',
            logo: Images.ManipalLogo,
            category: 'Healthcare'
        },
        prativa: {
            name: 'Prativa Secondary School',
            description: 'Educational institution partner providing community engagement and support.',
            logo: Images.PrativaLogo,
            category: 'Education'
        },
        swift: {
            name: 'Swift Holidays',
            description: 'Travel agency partner offering exclusive deals for our customers.',
            logo: Images.SwiftHolidaysLogo,
            category: 'Travel'
        },
        info_max: {
            name: 'InfoMax College',
            description: 'Educational institution partner providing community engagement and support.',
            logo: Images.InfoMaxLogo,
            category: 'Education'
        },
        evergreen: {
            name: 'Evergreen Montessori School',
            description: 'Educational institution partner providing community engagement and support.',
            logo: Images.EvergreenLogo,
            category: 'Education'
        }

    },

    // Clients Section
    clients: {
        techcorp: {
            name: 'TechCorp Industries',
            logo: Images.ToyotaLogo
        },
        globallogistics: {
            name: 'Global Logistics',
            logo: Images.BullLogo
        },
        innovatesolutions: {
            name: 'Innovate Solutions',
            logo: Images.AtherLogo
        },
        citybusiness: {
            name: 'City Business Group',
            logo: Images.KomatsuLogo
        },
        primeventures: {
            name: 'Prime Ventures',
            logo: Images.EicherLogo
        },
        alphaenterprises: {
            name: 'Alpha Enterprises',
            logo: Images.XCMGLogo
        },
        summitconsulting: {
            name: 'Summit Consulting',
            logo: Images.DongfengLogo
        },
    }
};

export default data;