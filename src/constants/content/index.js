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
                description: 'Autoways established with vision to transform Nepal\'s automotive industry',
                image: Images.AutowaysAbout
            },
            {
                year: '2005',
                title: 'First Expansion',
                description: 'Opened branches in Pokhara and Chitwan, extending reach beyond Kathmandu',
                image: Images.HeroImageIII
            },
            {
                year: '2010',
                title: 'Brand Portfolio Growth',
                description: 'Became authorized distributor for multiple international automotive brands',
                image: Images.BullHero
            },
            {
                year: '2015',
                title: 'Service Excellence',
                description: 'Launched state-of-the-art service centers with trained technical teams',
                image: Images.ToyotaCamry
            },
            {
                year: '2018',
                title: 'National Presence',
                description: 'Expanded to 8 locations across Nepal with comprehensive service network',
                image: Images.EicherHero
            },
            {
                year: '2020',
                title: 'Digital Transformation',
                description: 'Introduced online platforms and digital customer service solutions',
                image: Images.KomatsuHero
            },
            {
                year: '2022',
                title: '20 Years Milestone',
                description: 'Celebrated two decades of excellence and customer trust',
                image: Images.HeroImageII
            },
            {
                year: '2024',
                title: 'Electric Future',
                description: 'Strengthened commitment to sustainable mobility with electric vehicle expansion',
                image: Images.HeroImageIII
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
    },

    // CSR (Corporate Social Responsibility) Section
    csr: {
        hero: {
            title: 'Corporate Social Responsibility',
            subtitle: 'Driving positive change in communities across Nepal',
            description: 'At Autoways, we believe in growing together with the communities we serve. Our CSR initiatives focus on education, healthcare, environmental sustainability, and community development.',
            image: Images.AutowaysAbout
        },
        initiatives: [
            {
                id: 1,
                title: 'Education Support',
                category: 'Education',
                description: 'Partnering with schools and educational institutions to provide quality education opportunities, scholarships, and learning resources for underprivileged students across Nepal.',
                image: Images.HeroImageIII,
                impact: {
                    metric: '500+',
                    label: 'Students Supported'
                },
                activities: [
                    'Scholarship programs for deserving students',
                    'Infrastructure development in rural schools',
                    'Computer labs and learning resources',
                    'Teacher training and development programs'
                ]
            },
            {
                id: 2,
                title: 'Healthcare Initiatives',
                category: 'Healthcare',
                description: 'Supporting healthcare facilities and organizing medical camps to ensure accessible healthcare services for communities in remote and underserved areas.',
                image: Images.HeroImageII,
                impact: {
                    metric: '3000+',
                    label: 'People Reached'
                },
                activities: [
                    'Free medical camps in rural areas',
                    'Healthcare equipment donation to hospitals',
                    'Health awareness programs',
                    'Support for emergency medical services'
                ]
            },
            {
                id: 3,
                title: 'Environmental Sustainability',
                category: 'Environment',
                description: 'Committed to reducing environmental impact through green practices, promoting electric vehicles, and supporting environmental conservation projects.',
                image: Images.KomatsuHero,
                impact: {
                    metric: '10,000+',
                    label: 'Trees Planted'
                },
                activities: [
                    'Tree plantation drives',
                    'Promotion of electric and eco-friendly vehicles',
                    'Waste management and recycling programs',
                    'Carbon footprint reduction initiatives'
                ]
            },
            {
                id: 4,
                title: 'Community Development',
                category: 'Community',
                description: 'Empowering local communities through skill development programs, infrastructure support, and creating sustainable livelihood opportunities.',
                image: Images.EicherHero,
                impact: {
                    metric: '1000+',
                    label: 'Lives Impacted'
                },
                activities: [
                    'Vocational training programs',
                    'Support for local entrepreneurs',
                    'Community infrastructure projects',
                    'Disaster relief and rehabilitation support'
                ]
            },
            {
                id: 5,
                title: 'Road Safety Awareness',
                category: 'Safety',
                description: 'Promoting road safety through awareness campaigns, training programs, and supporting traffic safety infrastructure development.',
                image: Images.BullHero,
                impact: {
                    metric: '50+',
                    label: 'Awareness Programs'
                },
                activities: [
                    'Road safety awareness campaigns',
                    'Driver training and certification programs',
                    'School safety education programs',
                    'Support for traffic safety infrastructure'
                ]
            },
            {
                id: 6,
                title: 'Women Empowerment',
                category: 'Empowerment',
                description: 'Supporting women entrepreneurs and creating opportunities for women in the automotive industry through training, mentorship, and employment.',
                image: Images.ToyotaCamry,
                impact: {
                    metric: '200+',
                    label: 'Women Trained'
                },
                activities: [
                    'Women entrepreneurship programs',
                    'Technical training for women',
                    'Employment opportunities in automotive sector',
                    'Mentorship and leadership development'
                ]
            }
        ],
        partners: [
            {
                id: 1,
                name: 'Manipal Teaching Hospital',
                type: 'Healthcare Partner',
                description: 'Collaborative healthcare initiatives and medical support programs',
                logo: Images.ManipalLogo
            },
            {
                id: 2,
                name: 'Prativa Secondary School',
                type: 'Education Partner',
                description: 'Educational development and student scholarship programs',
                logo: Images.PrativaLogo
            },
            {
                id: 3,
                name: 'InfoMax College',
                type: 'Education Partner',
                description: 'Technical education and skill development initiatives',
                logo: Images.InfoMaxLogo
            },
            {
                id: 4,
                name: 'Evergreen Montessori School',
                type: 'Education Partner',
                description: 'Early childhood education support and development',
                logo: Images.EvergreenLogo
            }
        ],
        stats: {
            yearsActive: '20+',
            beneficiaries: '15,000+',
            initiatives: '50+',
            partnersCount: '25+',
            investment: 'NPR 10M+'
        },
        commitment: {
            title: 'Our Commitment to Society',
            content: 'Autoways is committed to being a responsible corporate citizen. We believe that business success goes hand-in-hand with social responsibility. Through our CSR initiatives, we aim to create lasting positive impact on communities, contribute to sustainable development, and build a better future for Nepal. Our focus remains on education, healthcare, environmental conservation, and community empowerment – the foundations of a thriving society.',
            quote: 'Success is not just about profit, but about the positive impact we create in the communities we serve.',
            author: 'Autoways Leadership Team'
        }
    },

    // Sister Companies Section
    sister_companies: {
        hero: {
            title: 'Our Sister Companies',
            subtitle: 'A family of excellence across diverse industries',
            description: 'United by shared values of quality, innovation, and customer excellence, our sister companies represent a diverse portfolio of successful businesses contributing to Nepal\'s economic growth.'
        },
        companies: [
            {
                id: 1,
                name: 'Swift Holidays',
                tagline: 'Your Gateway to Unforgettable Adventures',
                description: 'Premier travel and tourism company offering curated travel experiences across Nepal and beyond. From trekking expeditions to luxury tours, Swift Holidays creates memorable journeys tailored to your dreams.',
                logo: Images.SwiftHolidaysLogo,
                image: Images.HeroImageIII,
                category: 'Travel & Tourism',
                services: [
                    'Adventure Trekking & Expeditions',
                    'Luxury Tour Packages',
                    'Hotel & Resort Bookings',
                    'Corporate Travel Solutions',
                    'Visa & Documentation Support'
                ],
                contact: {
                    email: 'info@swiftholidays.com',
                    phone: '+977 061-582400',
                    website: 'www.swiftholidays.com'
                },
                stats: {
                    yearsOfExperience: '15+',
                    happyClients: '5,000+',
                    destinations: '50+',
                    rating: '4.9/5'
                }
            },
            {
                id: 2,
                name: 'Manipal Teaching Hospital',
                tagline: 'Caring for Health, Caring for Life',
                description: 'Leading multi-specialty teaching hospital delivering world-class healthcare with state-of-the-art facilities, experienced medical professionals, and compassionate patient care.',
                logo: Images.ManipalLogo,
                image: Images.HeroImageII,
                category: 'Healthcare',
                services: [
                    'Emergency & Trauma Care',
                    'Advanced Surgical Procedures',
                    'Diagnostic & Imaging Services',
                    'Specialized Medical Departments',
                    'Health Check-up Packages'
                ],
                contact: {
                    email: 'info@manipalhospital.edu.np',
                    phone: '+977 061-417766',
                    website: 'www.manipalhospital.edu.np'
                },
                stats: {
                    yearsOfExperience: '20+',
                    patients: '100,000+',
                    specialists: '150+',
                    beds: '350+'
                }
            },
            {
                id: 3,
                name: 'Prativa Secondary School',
                tagline: 'Nurturing Tomorrow\'s Leaders',
                description: 'Excellence in education with modern teaching methodologies, comprehensive curriculum, and holistic development approach preparing students for global challenges.',
                logo: Images.PrativaLogo,
                image: Images.AutowaysAbout,
                category: 'Education',
                services: [
                    'Quality Secondary Education',
                    'Extracurricular Activities',
                    'Sports & Physical Education',
                    'Science & Technology Labs',
                    'Career Counseling & Guidance'
                ],
                contact: {
                    email: 'info@prativaschool.edu.np',
                    phone: '+977 061-540234',
                    website: 'www.prativaschool.edu.np'
                },
                stats: {
                    established: '2005',
                    students: '800+',
                    teachers: '50+',
                    successRate: '95%'
                }
            },
            {
                id: 4,
                name: 'InfoMax College',
                tagline: 'Empowering Through Technology Education',
                description: 'Leading technical education institution specializing in IT, management, and professional courses with industry-aligned curriculum and experienced faculty.',
                logo: Images.InfoMaxLogo,
                image: Images.ToyotaCamry,
                category: 'Higher Education',
                services: [
                    'BIT, BCA, BIM Programs',
                    'Management Courses',
                    'IT Certification Programs',
                    'Industry Internships',
                    'Placement Support'
                ],
                contact: {
                    email: 'info@infomaxcollege.edu.np',
                    phone: '+977 061-536987',
                    website: 'www.infomaxcollege.edu.np'
                },
                stats: {
                    established: '2008',
                    students: '1,200+',
                    faculty: '60+',
                    placementRate: '90%'
                }
            },
            {
                id: 5,
                name: 'Evergreen Montessori School',
                tagline: 'Growing Minds, Nurturing Hearts',
                description: 'Premier Montessori education fostering creativity, independence, and love for learning in a nurturing environment for young minds to flourish.',
                logo: Images.EvergreenLogo,
                image: Images.HeroImageI,
                category: 'Early Education',
                services: [
                    'Montessori Methodology',
                    'Play-based Learning',
                    'Creative Arts & Music',
                    'Outdoor Activities',
                    'Parent Partnership Programs'
                ],
                contact: {
                    email: 'info@evergreenmontessori.edu.np',
                    phone: '+977 061-523456',
                    website: 'www.evergreenmontessori.edu.np'
                },
                stats: {
                    established: '2010',
                    students: '300+',
                    staff: '25+',
                    ageGroup: '2-6 years'
                }
            }
        ],
        values: {
            title: 'Our Shared Values',
            description: 'United across industries by common principles of excellence, integrity, and customer-first approach',
            items: [
                {
                    id: 1,
                    title: 'Quality First',
                    description: 'Uncompromising standards in products and services',
                    icon: 'quality'
                },
                {
                    id: 2,
                    title: 'Innovation',
                    description: 'Continuously evolving to meet changing needs',
                    icon: 'innovation'
                },
                {
                    id: 3,
                    title: 'Customer Excellence',
                    description: 'Exceeding expectations in every interaction',
                    icon: 'customer'
                },
                {
                    id: 4,
                    title: 'Social Responsibility',
                    description: 'Contributing positively to communities',
                    icon: 'social'
                }
            ]
        }
    },

    // Spares and Parts Section
    spares_parts: {
        hero: {
            title: 'Genuine Spares & Parts',
            subtitle: 'Quality parts for lasting performance',
            description: 'Comprehensive inventory of genuine OEM parts and accessories for all our represented brands. Expert support, competitive pricing, and quick delivery across Nepal.',
            image: Images.BullHero
        },
        categories: [
            {
                id: 1,
                name: 'Engine Parts',
                description: 'Complete range of engine components and replacement parts',
                icon: 'engine',
                image: Images.BullLoader,
                subcategories: [
                    'Pistons & Rings',
                    'Cylinder Heads',
                    'Gaskets & Seals',
                    'Timing Belts & Chains',
                    'Oil Filters',
                    'Air Filters',
                    'Fuel Injectors',
                    'Spark Plugs'
                ]
            },
            {
                id: 2,
                name: 'Transmission Parts',
                description: 'Gearbox components and transmission system parts',
                icon: 'transmission',
                image: Images.ToyotaSedan,
                subcategories: [
                    'Clutch Kits',
                    'Gearbox Oil',
                    'Transmission Filters',
                    'Synchro Rings',
                    'Bearings & Shafts',
                    'Torque Converters'
                ]
            },
            {
                id: 3,
                name: 'Brake System',
                description: 'Complete braking system components for safety',
                icon: 'brakes',
                image: Images.BullSkid,
                subcategories: [
                    'Brake Pads',
                    'Brake Discs & Rotors',
                    'Brake Fluid',
                    'Brake Calipers',
                    'Brake Lines & Hoses',
                    'Master Cylinders',
                    'ABS Components'
                ]
            },
            {
                id: 4,
                name: 'Suspension & Steering',
                description: 'Steering and suspension parts for smooth ride',
                icon: 'suspension',
                image: Images.ToyotaSUV,
                subcategories: [
                    'Shock Absorbers',
                    'Struts & Springs',
                    'Control Arms',
                    'Ball Joints',
                    'Tie Rod Ends',
                    'Steering Racks',
                    'Bushings'
                ]
            },
            {
                id: 5,
                name: 'Electrical Components',
                description: 'Complete electrical and electronic parts',
                icon: 'electrical',
                image: Images.KomatsuHero,
                subcategories: [
                    'Batteries',
                    'Alternators',
                    'Starters',
                    'Sensors',
                    'Wiring Harnesses',
                    'Relays & Fuses',
                    'Lighting Components',
                    'ECU Modules'
                ]
            },
            {
                id: 6,
                name: 'Body & Exterior',
                description: 'Body panels, lights, and exterior accessories',
                icon: 'body',
                image: Images.EicherHero,
                subcategories: [
                    'Headlights & Tail Lights',
                    'Bumpers & Grilles',
                    'Mirrors',
                    'Door Handles',
                    'Windshields',
                    'Weather Strips',
                    'Emblems & Badges'
                ]
            },
            {
                id: 7,
                name: 'Interior Parts',
                description: 'Interior components and comfort accessories',
                icon: 'interior',
                image: Images.ToyotaCamry,
                subcategories: [
                    'Seats & Seat Covers',
                    'Dashboard Components',
                    'Door Panels',
                    'Floor Mats',
                    'Audio Systems',
                    'Climate Control Parts',
                    'Instrument Clusters'
                ]
            },
            {
                id: 8,
                name: 'Fluids & Lubricants',
                description: 'Essential fluids and maintenance products',
                icon: 'fluids',
                image: Images.BullHD100,
                subcategories: [
                    'Engine Oil',
                    'Transmission Oil',
                    'Brake Fluid',
                    'Coolants',
                    'Hydraulic Oil',
                    'Greases',
                    'Cleaning Products'
                ]
            }
        ],
        brands_supported: [
            {
                name: 'Toyota',
                logo: Images.ToyotaLogo,
                description: 'Genuine Toyota parts with warranty'
            },
            {
                name: 'Bull',
                logo: Images.BullLogo,
                description: 'Original Bull machinery parts'
            },
            {
                name: 'Komatsu',
                logo: Images.KomatsuLogo,
                description: 'Authentic Komatsu spare parts'
            },
            {
                name: 'Eicher',
                logo: Images.EicherLogo,
                description: 'OEM Eicher commercial parts'
            },
            {
                name: 'XCMG',
                logo: Images.XCMGLogo,
                description: 'Genuine XCMG equipment parts'
            },
            {
                name: 'Dongfeng',
                logo: Images.DongfengLogo,
                description: 'Original Dongfeng parts'
            },
            {
                name: 'Ather',
                logo: Images.AtherLogo,
                description: 'Authentic Ather electric parts'
            }
        ],
        services: [
            {
                id: 1,
                title: 'Expert Consultation',
                description: 'Our trained staff helps you find the right parts for your vehicle',
                icon: 'consultation'
            },
            {
                id: 2,
                title: 'Genuine Parts',
                description: 'All parts are 100% genuine OEM with manufacturer warranty',
                icon: 'genuine'
            },
            {
                id: 3,
                title: 'Fast Delivery',
                description: 'Quick delivery across Nepal with tracking support',
                icon: 'delivery'
            },
            {
                id: 4,
                title: 'Competitive Pricing',
                description: 'Best prices with transparent billing and no hidden charges',
                icon: 'pricing'
            },
            {
                id: 5,
                title: 'Installation Support',
                description: 'Professional installation services at our service centers',
                icon: 'installation'
            },
            {
                id: 6,
                title: 'Warranty Support',
                description: 'Comprehensive warranty coverage on all genuine parts',
                icon: 'warranty'
            }
        ],
        featured_products: [
            {
                id: 1,
                name: 'Toyota Genuine Oil Filter',
                category: 'Engine Parts',
                brand: 'Toyota',
                partNumber: 'TO-90915-YZZD2',
                price: 850,
                image: Images.ToyotaCamry,
                inStock: true,
                description: 'High-quality oil filter for Toyota vehicles'
            },
            {
                id: 2,
                name: 'Bull HD Hydraulic Oil',
                category: 'Fluids & Lubricants',
                brand: 'Bull',
                partNumber: 'BL-HYD-68-20L',
                price: 12500,
                image: Images.BullLoader,
                inStock: true,
                description: '20L premium hydraulic oil for Bull machines'
            },
            {
                id: 3,
                name: 'Komatsu Air Filter',
                category: 'Engine Parts',
                brand: 'Komatsu',
                partNumber: 'KM-600-185-4100',
                price: 3200,
                image: Images.KomatsuHero,
                inStock: true,
                description: 'Genuine air filter for Komatsu equipment'
            },
            {
                id: 4,
                name: 'Ather Battery Pack',
                category: 'Electrical Components',
                brand: 'Ather',
                partNumber: 'AT-BAT-450X',
                price: 85000,
                image: Images.AtherLogo,
                inStock: true,
                description: 'Original Ather 450X battery pack'
            }
        ],
        stats: {
            partsAvailable: '10,000+',
            brandsSupported: '7',
            serviceLocations: '8',
            expertTechnicians: '50+'
        },
        contact: {
            title: 'Need Help Finding Parts?',
            description: 'Our parts specialists are ready to assist you',
            phone: '+977 061-582469',
            email: 'parts@autoways.com.np',
            hours: 'Sunday - Friday: 9:00 AM - 6:00 PM'
        }
    }
};

export default data;