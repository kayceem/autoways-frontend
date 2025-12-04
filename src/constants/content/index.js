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
    },

    // News & Media Section
    news_media: {
        featured: {
            id: 1,
            title: 'Autoways Expands Electric Vehicle Portfolio with Ather Partnership',
            category: 'Company News',
            date: '2024-11-15',
            image: Images.HeroImageII,
            excerpt: 'Autoways announces strategic expansion into electric mobility sector, bringing cutting-edge Ather electric scooters to Nepal market.',
            content: 'In a significant move towards sustainable mobility, Autoways has strengthened its commitment to electric vehicles by expanding its partnership with Ather Energy. This development marks a new chapter in Nepal\'s automotive industry, offering customers access to advanced electric two-wheelers with smart connectivity features.'
        },
        articles: [
            {
                id: 2,
                title: 'Autoways Celebrates 20+ Years of Automotive Excellence in Nepal',
                category: 'Milestone',
                date: '2024-10-20',
                image: Images.AutowaysAbout,
                excerpt: 'Two decades of trust, quality, and innovation - Autoways marks its journey as Nepal\'s premier automotive distributor.',
                content: 'Since 2002, Autoways has been at the forefront of Nepal\'s automotive industry, bringing world-class brands and exceptional service to customers across the nation.'
            },
            {
                id: 3,
                title: 'New Toyota Camry 2024 Launches in Nepal',
                category: 'Product Launch',
                date: '2024-09-10',
                image: Images.ToyotaCamry,
                excerpt: 'Experience the perfect blend of luxury and performance with the all-new Toyota Camry 2024, now available at Autoways.',
                content: 'The latest generation Toyota Camry brings enhanced safety features, superior fuel efficiency, and refined luxury to the Nepalese market.'
            },
            {
                id: 4,
                title: 'BULL Machines Sets New Standards in Construction Equipment',
                category: 'Industry News',
                date: '2024-08-25',
                image: Images.BullHero,
                excerpt: 'Heavy-duty loaders and skid steers designed for Nepal\'s challenging terrain now available through Autoways.',
                content: 'BULL Machines continues to revolutionize the construction and infrastructure sector with its robust and reliable equipment range.'
            },
            {
                id: 5,
                title: 'Autoways Opens New Service Center in Kathmandu',
                category: 'Expansion',
                date: '2024-07-12',
                image: Images.HeroImageI,
                excerpt: 'State-of-the-art facility in Dhobigat enhances customer service capabilities with advanced diagnostic equipment.',
                content: 'The new service center features modern equipment and trained technicians to provide best-in-class after-sales support.'
            },
            {
                id: 6,
                title: 'Komatsu Equipment Drives Infrastructure Development',
                category: 'Industry Impact',
                date: '2024-06-05',
                image: Images.KomatsuHero,
                excerpt: 'Autoways-distributed Komatsu machinery plays crucial role in major infrastructure projects across Nepal.',
                content: 'From road construction to mining operations, Komatsu equipment continues to demonstrate exceptional performance and reliability.'
            }
        ]
    },

    // Testimonials Section
    testimonials: [
        {
            id: 1,
            name: 'Rajesh Shrestha',
            position: 'Construction Company Owner',
            company: 'Shrestha Builders Pvt. Ltd.',
            image: null,
            rating: 5,
            text: 'We have been using BULL machines from Autoways for over 5 years now. The build quality is exceptional and the after-sales service is outstanding. Their team is always ready to help, and spare parts are readily available. Highly recommended for any construction business.',
            date: '2024-10-15',
            category: 'BULL Machines'
        },
        {
            id: 2,
            name: 'Sunita Karki',
            position: 'Fleet Manager',
            company: 'Himalayan Logistics',
            image: null,
            rating: 5,
            text: 'Our Toyota fleet from Autoways has been incredibly reliable. The fuel efficiency is excellent, and maintenance costs are low. The professional service from the Autoways team makes fleet management so much easier. We have expanded our partnership year after year.',
            date: '2024-09-22',
            category: 'Toyota'
        },
        {
            id: 3,
            name: 'Anil Thapa',
            position: 'Individual Buyer',
            company: null,
            image: null,
            rating: 5,
            text: 'Purchasing my first Ather electric scooter from Autoways was the best decision. The riding experience is smooth, the technology is cutting-edge, and I am saving so much on fuel costs. The staff guided me through every feature patiently.',
            date: '2024-08-30',
            category: 'Ather'
        },
        {
            id: 4,
            name: 'Dipak Gurung',
            position: 'Mining Operations Manager',
            company: 'Nepal Minerals Pvt. Ltd.',
            image: null,
            rating: 5,
            text: 'Komatsu equipment from Autoways has transformed our mining operations. The machines are built for tough conditions and deliver consistent performance. The technical support team is knowledgeable and responsive. Worth every rupee invested.',
            date: '2024-07-18',
            category: 'Komatsu'
        },
        {
            id: 5,
            name: 'Priya Maharjan',
            position: 'Business Owner',
            company: 'Kathmandu Traders',
            image: null,
            rating: 5,
            text: 'I recently purchased an Eicher commercial vehicle for my business. Autoways made the entire process seamless - from financing options to delivery. The vehicle performance exceeds expectations and has significantly improved our logistics efficiency.',
            date: '2024-06-25',
            category: 'Eicher'
        },
        {
            id: 6,
            name: 'Bishnu Tamang',
            position: 'Infrastructure Developer',
            company: 'Mountain Roads Construction',
            image: null,
            rating: 5,
            text: 'Working with challenging mountain terrain requires reliable equipment. The XCMG machinery from Autoways has proven to be robust and dependable. The service network across Nepal ensures minimal downtime. Excellent value for money.',
            date: '2024-05-10',
            category: 'XCMG'
        },
        {
            id: 7,
            name: 'Kamala Adhikari',
            position: 'Transport Business Owner',
            company: 'Pokhara Transport Services',
            image: null,
            rating: 5,
            text: 'Our Dongfeng vehicles from Autoways have been workhorses for our transport business. Low maintenance, high reliability, and excellent support from the Autoways team. They truly understand the needs of commercial vehicle operators.',
            date: '2024-04-15',
            category: 'Dongfeng'
        },
        {
            id: 8,
            name: 'Suresh Rai',
            position: 'Individual Customer',
            company: null,
            image: null,
            rating: 5,
            text: 'The buying experience at Autoways was exceptional. The team was professional, transparent, and helped me choose the right Toyota model for my family. Post-purchase service has been equally impressive. Will definitely recommend to friends.',
            date: '2024-03-20',
            category: 'Toyota'
        }
    ],

    // About Us Detailed Section
    about_us_detailed: {
        mission: {
            title: 'Our Mission',
            content: 'To inspire customer loyalty through excellence in every service we provide, delivering world-class automotive solutions that enhance mobility, productivity, and quality of life across Nepal.',
            icon: 'mission'
        },
        vision: {
            title: 'Our Vision',
            content: 'To be Nepal\'s most trusted and innovative automotive partner, recognized for exceptional quality, sustainable practices, and meaningful contributions to national development.',
            icon: 'vision'
        },
        values: [
            {
                id: 1,
                title: 'Integrity',
                description: 'We conduct business with honesty, transparency, and ethical practices in every interaction.',
                icon: 'integrity'
            },
            {
                id: 2,
                title: 'Excellence',
                description: 'We strive for the highest standards in products, services, and customer experiences.',
                icon: 'excellence'
            },
            {
                id: 3,
                title: 'Innovation',
                description: 'We embrace change and continuously seek better solutions for our customers and industry.',
                icon: 'innovation'
            },
            {
                id: 4,
                title: 'Customer Focus',
                description: 'We prioritize customer needs and build lasting relationships through exceptional service.',
                icon: 'customer'
            },
            {
                id: 5,
                title: 'Teamwork',
                description: 'We foster a collaborative environment where talented individuals work together towards shared goals.',
                icon: 'teamwork'
            },
            {
                id: 6,
                title: 'Social Responsibility',
                description: 'We contribute positively to communities and support sustainable development across Nepal.',
                icon: 'social'
            }
        ],
        milestones: [
            {
                year: '2002',
                title: 'Foundation',
                description: 'Autoways established with vision to transform Nepal\'s automotive industry'
            },
            {
                year: '2005',
                title: 'First Expansion',
                description: 'Opened branches in Pokhara and Chitwan, extending reach beyond Kathmandu'
            },
            {
                year: '2010',
                title: 'Brand Portfolio Growth',
                description: 'Became authorized distributor for multiple international automotive brands'
            },
            {
                year: '2015',
                title: 'Service Excellence',
                description: 'Launched state-of-the-art service centers with trained technical teams'
            },
            {
                year: '2018',
                title: 'National Presence',
                description: 'Expanded to 8 locations across Nepal with comprehensive service network'
            },
            {
                year: '2020',
                title: 'Digital Transformation',
                description: 'Introduced online platforms and digital customer service solutions'
            },
            {
                year: '2022',
                title: '20 Years Milestone',
                description: 'Celebrated two decades of excellence and customer trust'
            },
            {
                year: '2024',
                title: 'Electric Future',
                description: 'Strengthened commitment to sustainable mobility with electric vehicle expansion'
            }
        ],
        team: {
            title: 'Leadership Team',
            description: 'Our experienced leadership team brings decades of automotive industry expertise, guiding Autoways towards continued excellence and innovation.',
            members: [
                {
                    id: 1,
                    name: 'Ram Prasad Sharma',
                    position: 'Chief Executive Officer',
                    bio: 'With over 25 years in automotive industry, Ram leads Autoways strategic vision and growth.',
                    image: null
                },
                {
                    id: 2,
                    name: 'Sita Devi Poudel',
                    position: 'Chief Operations Officer',
                    bio: 'Expert in operational excellence, Sita ensures seamless service delivery across all locations.',
                    image: null
                },
                {
                    id: 3,
                    name: 'Prakash Kumar Shrestha',
                    position: 'Head of Sales',
                    bio: 'Leading sales strategy and customer relationships with proven track record of success.',
                    image: null
                },
                {
                    id: 4,
                    name: 'Mina Tamang',
                    position: 'Head of Service Operations',
                    bio: 'Ensuring world-class after-sales service and customer satisfaction across Nepal.',
                    image: null
                }
            ]
        },
        stats: {
            yearsOfExperience: '20+',
            happyCustomers: '10,000+',
            vehiclesSold: '15,000+',
            serviceCenters: '8',
            brands: '7',
            employees: '200+'
        }
    }
};

export default data;