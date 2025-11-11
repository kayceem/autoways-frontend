import Images from '../../assets';
const oldData = {
    about_us: {
        title: "About Us",
        content: "We are a company dedicated to providing the best services to our customers."
    },
    info: {
        email: "info@autodealership.com",
        phone: "+1 (555) 123-4567",
        socialLinks: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            twitter: "https://twitter.com"
        }
    },
    brand: {
        toyota: {
            name: 'Toyota',
            description: 'Toyota is a Japanese multinational automotive manufacturer known for its reliable and fuel-efficient vehicles.',
            images: [Images.ToyotaHero, Images.ToyotaThumbnail],
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
                        {
                            id: "rav4-2024",
                            name: "Toyota RAV4 2024",
                            type: "sedan",
                            images: [Images.ToyotaCamry, Images.ToyotaCamryRight],
                            tag: "Best Seller",
                            price: 35000,
                            shortDescription: "A versatile SUV for all your adventures"
                        }
                    ]

            },
        },

        bull: {
            name: 'Bull Motors',
            description: 'Bull Motors is a rugged vehicle brand specializing in off-road and heavy-duty trucks.',
            images: [Images.BullHero, Images.BullLoader],
            productTypes: [{
                type: 'Truck',
                image: Images.BullLoader
            },
            {
                type: 'Loader',
                image: Images.BullLoader
            }
            ],
            products: {
                truck:
                    [
                        {
                            id: "bull-x1",
                            name: "Bull X1 Truck",
                            type: "truck",
                            images: [Images.BullLoader],
                            tag: "Heavy Duty",
                            price: 45000,
                            shortDescription: "Built for the toughest terrains"
                        },
                        {
                            id: "bull-x2",
                            name: "Bull X2 Truck",
                            type: "truck",
                            images: [Images.BullLoader],
                            tag: "New Model",
                            price: 50000,
                            shortDescription: "Advanced features for modern needs"
                        }
                    ]
            }
        },
    }
}
const data = {
    // Hero Section Images
    hero_images: [
        {
            url: Images.ToyotaHero,
            title: 'Discover Your Perfect Drive',
            subtitle: 'Explore our premium collection of luxury and performance vehicles',
            ctaText: 'Browse Inventory',
            alt: 'Luxury sports car on scenic road'
        },
        {
            url: Images.HeroImageI,
            title: 'Unmatched Quality & Service',
            subtitle: 'Experience excellence with every purchase at Autoways',
            ctaText: 'Learn More',
            alt: 'Premium sedan in showroom'
        },
        {
            url: Images.HeroImageII,
            title: 'Your Journey Starts Here',
            subtitle: 'Find the vehicle that matches your lifestyle and dreams',
            ctaText: 'Get Started',
            alt: 'Modern SUV on mountain road'
        },
        {
            url: Images.HeroImageIII,
            title: 'Your Journey Starts Here',
            subtitle: 'Find the vehicle that matches your lifestyle and dreams',
            ctaText: 'Get Started',
            alt: 'Modern SUV on mountain road'
        }
    ],

    // About Us Section
    about_us: {
        title: 'Welcome to Autoways',
        content: 'At Autoways, we\'re more than just a dealership—we\'re your trusted partner in finding the perfect vehicle. With over 15 years of experience, we pride ourselves on delivering exceptional customer service, transparent pricing, and an unmatched selection of premium vehicles. Our team of automotive experts is dedicated to making your car-buying experience smooth, enjoyable, and tailored to your unique needs.',
        image: Images.AutowaysAbout
    },

    // Contact Information
    info: {
        email: 'info@autoways.com',
        phone: '+1 (555) 123-4567',
        address: '123 Auto Boulevard, Car City, CC 12345',
        socialLinks: {
            facebook: 'https://facebook.com/autoways',
            instagram: 'https://instagram.com/autoways',
            twitter: 'https://twitter.com/autoways',
            linkedin: 'https://linkedin.com/company/autoways'
        }
    },

    // Brands Section
    brands: {
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
                        {
                            id: "rav4-2024",
                            name: "Toyota RAV4 2024",
                            type: "sedan",
                            images: [Images.ToyotaCamry, Images.ToyotaCamryRight],
                            tag: "Best Seller",
                            price: 35000,
                            shortDescription: "A versatile SUV for all your adventures"
                        }
                    ]

            },
        },
        bull: {
            name: 'Bull',
            description: 'The ultimate driving machine. Precision German engineering meets luxurious performance.',
            images: [Images.HeroImageI],
            logo: Images.BullLogo,
            productTypes: [{
                type: 'Truck',
                image: Images.BullLoader
            },
            {
                type: 'Loader',
                image: Images.BullLoader
            }
            ],
            products: {
                truck:
                    [
                        {
                            id: "bull-x1",
                            name: "Bull X1 Truck",
                            type: "truck",
                            images: [Images.BullLoader],
                            tag: "Heavy Duty",
                            price: 45000,
                            shortDescription: "Built for the toughest terrains"
                        },
                        {
                            id: "bull-x2",
                            name: "Bull X2 Truck",
                            type: "truck",
                            images: [Images.BullLoader],
                            tag: "New Model",
                            price: 50000,
                            shortDescription: "Advanced features for modern needs"
                        }
                    ]
            }
        },
        dongfeng: {
            name: 'Dongfeng',
            description: 'Luxury redefined. Innovation and elegance in every detail of these iconic vehicles.',
            images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80'],
            logo: Images.DongfengLogo
        },
        komatsu: {
            name: 'Komatsu',
            description: 'Electric revolution. Sustainable performance with groundbreaking autonomous technology.',
            images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80'],
            logo: Images.KomatsuLogo
        },
        eicher: {
            name: 'Eicher',
            description: 'The pursuit of perfection. Japanese luxury with meticulous craftsmanship and comfort.',
            images: ['https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80'],
            logo: Images.EicherLogo
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
            logo: Images.BullLogo
        },
        citybusiness: {
            name: 'City Business Group',
            logo: Images.BullLogo
        },
        primeventures: {
            name: 'Prime Ventures',
            logo: Images.EicherLogo
        },
        alphaenterprises: {
            name: 'Alpha Enterprises',
            logo: Images.EicherLogo
        },
        summitconsulting: {
            name: 'Summit Consulting',
            logo: Images.DongfengLogo
        },
    }
};

export default data;