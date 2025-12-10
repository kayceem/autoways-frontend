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
        },
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
                address: 'Bharatpur-11, Chitwan',
                info: 'Chitwan Branch',
                phone: '+977 056-590924/056-590935'
            },
            {
                id: 4,
                name: 'Birgunj',
                position: [27.0104, 84.8788],
                address: 'Gandakchowk, Bahuwari-15',
                info: 'Birgunj Branch',
                phone: '+977 9855073521'
            },
            {
                id: 5,
                name: 'Butwal',
                position: [27.672804398931735, 83.4643811642423],
                address: 'Kalikanagar-10, Butwal',
                info: 'Butwal Branch',
                phone: '+977 071-419017'
            },
            {
                id: 6,
                name: 'Dhangadi',
                position: [28.68546267882992, 80.6201175002807],
                info: 'Dhangadi Branch',
                address: 'Mohan Pura-13, Dhangadi',
                phone: '+977 9858480133'
            },
            {
                id: 7,
                name: 'Dang',
                position: [28.004397863091956, 82.47660288245483],
                address: 'Ratanpur-14, Dang',
                info: 'Dang Dealership',
                phone: '+977 9857030854'
            },
            {
                id: 8,
                name: 'Surkhet',
                position: [28.592557669142433, 81.61688115740088],
                address: 'Birendranagar-06, Surkhet',
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
                name: 'Backhoe Loader',
                type: 'backhoe_loader',
                image: Images.BullLoader
            },
            {
                name: 'Skid',
                type: 'skid',
                image: Images.BullSkid
            }
            ],
            products: {
                backhoe_loader:
                    [
                        {
                            id: "bull-hd96",
                            name: "HD-96",
                            type: "loader",
                            fuelType: "normal",
                            images: [Images.BullHD100, Images.BullLoader, Images.BullHero],
                            tag: "Heavy Duty",
                            price: 45000,
                            shortDescription: "Built for the toughest terrains",
                            fullDescription: "The HD-96 is a powerful wheel loader designed for heavy-duty construction and mining operations. With robust construction and exceptional performance, it handles the toughest jobs with ease.",
                            specifications: {
                                engine: {
                                    model: "Cummins QSB6.7",
                                    power: "173 HP (129 kW)",
                                    displacement: "6.7L",
                                    fuelType: "Diesel",
                                    emissionStandard: "Tier 3"
                                },
                                performance: {
                                    operatingWeight: "16,500 kg",
                                    bucketCapacity: "3.0 m³",
                                    maxSpeed: "40 km/h",
                                    breakoutForce: "165 kN",
                                    dumpingHeight: "2,850 mm",
                                    dumpingReach: "1,150 mm"
                                },
                                dimensions: {
                                    length: "7,650 mm",
                                    width: "2,650 mm",
                                    height: "3,350 mm",
                                    wheelbase: "3,100 mm",
                                    groundClearance: "420 mm"
                                },
                                hydraulics: {
                                    systemPressure: "250 bar",
                                    pumpFlow: "210 L/min",
                                    cycleTime: "10.5 seconds"
                                },
                                capacities: {
                                    fuelTank: "240 L",
                                    hydraulicOil: "180 L",
                                    engineOil: "28 L"
                                }
                            },
                            features: [
                                "Air-conditioned cabin with ergonomic controls",
                                "Advanced hydraulic system for smooth operation",
                                "High visibility design for enhanced safety",
                                "Quick-attach bucket system",
                                "Heavy-duty axles and transmission",
                                "Low fuel consumption",
                                "Easy maintenance access"
                            ],
                            brochureUrl: "/brochures/bull-hd96.pdf",
                            specSheetUrl: "/specs/bull-hd96-specs.pdf"
                        },
                        {
                            id: "bull-hd76",
                            name: "HD-76",
                            type: "loader",
                            fuelType: "normal",
                            images: [Images.BullLoader, Images.BullHD100, Images.BullHero],
                            tag: "Best Seller",
                            price: 38000,
                            shortDescription: "Compact yet powerful for medium-duty tasks",
                            fullDescription: "The HD-76 offers the perfect balance between power and agility. Ideal for medium-duty construction projects, this loader delivers reliable performance in a compact package.",
                            specifications: {
                                engine: {
                                    model: "Cummins QSB4.5",
                                    power: "125 HP (93 kW)",
                                    displacement: "4.5L",
                                    fuelType: "Diesel",
                                    emissionStandard: "Tier 3"
                                },
                                performance: {
                                    operatingWeight: "12,800 kg",
                                    bucketCapacity: "2.3 m³",
                                    maxSpeed: "38 km/h",
                                    breakoutForce: "125 kN",
                                    dumpingHeight: "2,650 mm",
                                    dumpingReach: "1,050 mm"
                                },
                                dimensions: {
                                    length: "7,100 mm",
                                    width: "2,450 mm",
                                    height: "3,150 mm",
                                    wheelbase: "2,900 mm",
                                    groundClearance: "400 mm"
                                },
                                hydraulics: {
                                    systemPressure: "230 bar",
                                    pumpFlow: "180 L/min",
                                    cycleTime: "9.8 seconds"
                                },
                                capacities: {
                                    fuelTank: "200 L",
                                    hydraulicOil: "150 L",
                                    engineOil: "22 L"
                                }
                            },
                            features: [
                                "Comfortable operator cabin with AC",
                                "Efficient fuel consumption",
                                "Robust construction for durability",
                                "Easy-to-use controls",
                                "Excellent maneuverability",
                                "Quick coupler compatible",
                                "LED working lights"
                            ],
                            brochureUrl: "/brochures/bull-hd76.pdf",
                            specSheetUrl: "/specs/bull-hd76-specs.pdf"
                        },
                        {
                            id: "bull-hd100",
                            name: "HD-100",
                            type: "loader",
                            fuelType: "normal",
                            images: [Images.BullHD100, Images.BullLoader, Images.BullHero],
                            tag: "New Model",
                            price: 52000,
                            shortDescription: "Maximum power for demanding applications",
                            fullDescription: "The HD-100 is our flagship wheel loader, engineered for the most demanding applications. With superior power and capacity, it's the ultimate choice for heavy construction and mining operations.",
                            specifications: {
                                engine: {
                                    model: "Cummins QSL9",
                                    power: "220 HP (164 kW)",
                                    displacement: "8.9L",
                                    fuelType: "Diesel",
                                    emissionStandard: "Tier 3"
                                },
                                performance: {
                                    operatingWeight: "19,500 kg",
                                    bucketCapacity: "3.5 m³",
                                    maxSpeed: "42 km/h",
                                    breakoutForce: "195 kN",
                                    dumpingHeight: "3,050 mm",
                                    dumpingReach: "1,250 mm"
                                },
                                dimensions: {
                                    length: "8,100 mm",
                                    width: "2,850 mm",
                                    height: "3,550 mm",
                                    wheelbase: "3,300 mm",
                                    groundClearance: "450 mm"
                                },
                                hydraulics: {
                                    systemPressure: "270 bar",
                                    pumpFlow: "240 L/min",
                                    cycleTime: "11.2 seconds"
                                },
                                capacities: {
                                    fuelTank: "280 L",
                                    hydraulicOil: "200 L",
                                    engineOil: "32 L"
                                }
                            },
                            features: [
                                "Premium cabin with climate control",
                                "Advanced telemetry system",
                                "Automatic bucket positioning",
                                "Enhanced operator visibility",
                                "Heavy-duty drivetrain",
                                "Reinforced structure",
                                "Multiple bucket options",
                                "Integrated weighing system"
                            ],
                            brochureUrl: "/brochures/bull-hd100.pdf",
                            specSheetUrl: "/specs/bull-hd100-specs.pdf"
                        }
                    ],
                skid: [
                    {
                        id: "bull-skid-s70",
                        name: "Skid Steer S-70",
                        type: "skid",
                        fuelType: "normal",
                        images: [Images.BullSkid, Images.BullLoader, Images.BullHero],
                        tag: "Versatile",
                        price: 32000,
                        shortDescription: "Compact powerhouse for tight spaces",
                        fullDescription: "The S-70 Skid Steer Loader is designed for versatility and performance in confined spaces. Perfect for landscaping, construction, and material handling applications.",
                        specifications: {
                            engine: {
                                model: "Kubota V2403",
                                power: "74 HP (55 kW)",
                                displacement: "2.4L",
                                fuelType: "Diesel",
                                emissionStandard: "Tier 4"
                            },
                            performance: {
                                operatingWeight: "3,400 kg",
                                ratedOperatingCapacity: "1,020 kg",
                                tippingLoad: "2,040 kg",
                                travelSpeed: "12 km/h",
                                hydraulicFlow: "76 L/min",
                                operatingPressure: "245 bar"
                            },
                            dimensions: {
                                length: "3,450 mm",
                                width: "1,680 mm",
                                height: "2,050 mm",
                                wheelbase: "1,020 mm",
                                groundClearance: "220 mm"
                            },
                            capacities: {
                                fuelTank: "95 L",
                                hydraulicTank: "68 L",
                                engineOil: "8.5 L"
                            },
                            liftArm: {
                                maxLiftHeight: "3,200 mm",
                                reachAtMaxHeight: "640 mm",
                                dumpAngle: "45°",
                                rollbackAngle: "30°"
                            }
                        },
                        features: [
                            "Enclosed heated cab with AC",
                            "Pilot hydraulic controls",
                            "Universal quick-attach system",
                            "Excellent visibility",
                            "Low ground pressure",
                            "Easy maintenance",
                            "Multiple attachment options"
                        ],
                        brochureUrl: "/brochures/bull-skid-s70.pdf",
                        specSheetUrl: "/specs/bull-skid-s70-specs.pdf"
                    },
                    {
                        id: "bull-skid-s95",
                        name: "Skid Steer S-95",
                        type: "skid",
                        fuelType: "normal",
                        images: [Images.BullSkid, Images.BullHero, Images.BullLoader],
                        tag: "High Performance",
                        price: 38000,
                        shortDescription: "Enhanced power and lifting capacity",
                        fullDescription: "The S-95 delivers superior performance with increased power and capacity. Ideal for demanding construction and agricultural applications.",
                        specifications: {
                            engine: {
                                model: "Kubota V3307",
                                power: "95 HP (71 kW)",
                                displacement: "3.3L",
                                fuelType: "Diesel",
                                emissionStandard: "Tier 4"
                            },
                            performance: {
                                operatingWeight: "4,100 kg",
                                ratedOperatingCapacity: "1,360 kg",
                                tippingLoad: "2,720 kg",
                                travelSpeed: "13 km/h",
                                hydraulicFlow: "95 L/min",
                                operatingPressure: "260 bar"
                            },
                            dimensions: {
                                length: "3,650 mm",
                                width: "1,850 mm",
                                height: "2,150 mm",
                                wheelbase: "1,120 mm",
                                groundClearance: "240 mm"
                            },
                            capacities: {
                                fuelTank: "115 L",
                                hydraulicTank: "85 L",
                                engineOil: "10 L"
                            },
                            liftArm: {
                                maxLiftHeight: "3,450 mm",
                                reachAtMaxHeight: "720 mm",
                                dumpAngle: "48°",
                                rollbackAngle: "32°"
                            }
                        },
                        features: [
                            "Deluxe cab with premium comfort",
                            "High-flow hydraulics option",
                            "Self-leveling system",
                            "Backup camera standard",
                            "Reinforced lift arms",
                            "Advanced cooling system",
                            "Bluetooth connectivity"
                        ],
                        brochureUrl: "/brochures/bull-skid-s95.pdf",
                        specSheetUrl: "/specs/bull-skid-s95-specs.pdf"
                    }
                ]
            }
        },
        toyota: {
            name: 'Toyota',
            description: 'Japanese engineering excellence with legendary reliability and fuel efficiency for every journey.',
            images: [Images.HeroImageII],
            logo: Images.ToyotaLogo,
            productTypes: [{
                name: 'Sedan',
                type: 'sedan',
                image: Images.ToyotaSedan
            },
            {
                name: 'SUV',
                type: 'suv',
                image: Images.ToyotaSUV
            }],
            products: {
                sedan: [
                    {
                        id: "camry-2024-hybrid",
                        name: "Toyota Camry 2024 Hybrid",
                        type: "sedan",
                        fuelType: "hybrid",
                        images: [Images.ToyotaCamry, Images.ToyotaCamryRight, Images.ToyotaSedan],
                        tag: "Hybrid",
                        price: 32000,
                        shortDescription: "The perfect blend of luxury, performance and efficiency",
                        fullDescription: "The 2024 Toyota Camry Hybrid combines exceptional fuel efficiency with refined luxury. Experience the future of sustainable driving without compromising on performance or comfort.",
                        specifications: {
                            engine: {
                                model: "2.5L Dynamic Force 4-Cylinder + Electric Motor",
                                power: "208 HP (Combined)",
                                displacement: "2.5L",
                                fuelType: "Hybrid (Petrol + Electric)",
                                fuelEconomy: "21.2 km/L"
                            },
                            performance: {
                                acceleration: "7.6 seconds (0-100 km/h)",
                                topSpeed: "180 km/h",
                                transmission: "E-CVT",
                                driveType: "FWD"
                            },
                            battery: {
                                type: "Lithium-ion",
                                capacity: "4.3 Ah",
                                voltage: "244.8V"
                            },
                            dimensions: {
                                length: "4,885 mm",
                                width: "1,840 mm",
                                height: "1,445 mm",
                                wheelbase: "2,825 mm",
                                groundClearance: "140 mm"
                            },
                            capacities: {
                                seating: "5",
                                fuelTank: "50 L",
                                trunkSpace: "428 L"
                            },
                            safety: {
                                airbags: "9",
                                abs: "Yes",
                                stabilityControl: "Yes",
                                blindSpotMonitor: "Yes",
                                laneKeepAssist: "Yes",
                                adaptiveCruiseControl: "Yes",
                                preCollisionSystem: "Yes"
                            }
                        },
                        features: [
                            "Toyota Safety Sense 2.5+",
                            "9-inch touchscreen infotainment",
                            "Premium leather upholstery",
                            "Dual-zone automatic climate control",
                            "Wireless smartphone charging",
                            "360-degree camera system",
                            "LED headlights with auto high beam",
                            "Power moonroof",
                            "Premium JBL sound system"
                        ],
                        brochureUrl: "/brochures/camry-2024-hybrid.pdf",
                        specSheetUrl: "/specs/camry-2024-hybrid-specs.pdf"
                    },
                    {
                        id: "camry-2024",
                        name: "Toyota Camry 2024",
                        type: "sedan",
                        fuelType: "normal",
                        images: [Images.ToyotaCamry, Images.ToyotaCamryRight, Images.ToyotaSedan],
                        tag: "Best Seller",
                        price: 28000,
                        shortDescription: "Legendary reliability meets modern luxury",
                        fullDescription: "The 2024 Toyota Camry delivers uncompromising quality and proven reliability. With its elegant design and advanced features, it's the perfect choice for discerning drivers.",
                        specifications: {
                            engine: {
                                model: "2.5L Dynamic Force 4-Cylinder",
                                power: "203 HP (151 kW)",
                                torque: "250 Nm",
                                displacement: "2.5L",
                                fuelType: "Petrol",
                                fuelEconomy: "14.5 km/L"
                            },
                            performance: {
                                acceleration: "8.4 seconds (0-100 km/h)",
                                topSpeed: "200 km/h",
                                transmission: "8-Speed Automatic",
                                driveType: "FWD"
                            },
                            dimensions: {
                                length: "4,885 mm",
                                width: "1,840 mm",
                                height: "1,445 mm",
                                wheelbase: "2,825 mm",
                                groundClearance: "140 mm"
                            },
                            capacities: {
                                seating: "5",
                                fuelTank: "60 L",
                                trunkSpace: "428 L"
                            },
                            safety: {
                                airbags: "8",
                                abs: "Yes",
                                stabilityControl: "Yes",
                                tractionControl: "Yes",
                                hillStartAssist: "Yes",
                                tpms: "Yes"
                            }
                        },
                        features: [
                            "Toyota Safety Sense",
                            "8-inch touchscreen display",
                            "Leather-appointed seats",
                            "Automatic climate control",
                            "Push button start",
                            "Rearview camera",
                            "LED daytime running lights",
                            "Smart key system",
                            "Premium audio system"
                        ],
                        brochureUrl: "/brochures/camry-2024.pdf",
                        specSheetUrl: "/specs/camry-2024-specs.pdf"
                    }
                ],
                suv: [
                    {
                        id: "fortuner-2024",
                        name: "Toyota Fortuner 2024",
                        type: "suv",
                        fuelType: "normal",
                        images: [Images.ToyotaSUV, Images.HeroImageIII, Images.ToyotaHero],
                        tag: "Adventure Ready",
                        price: 48000,
                        shortDescription: "Legendary off-road capability meets premium comfort",
                        fullDescription: "The Toyota Fortuner 2024 is built for adventure. With its robust construction, advanced 4WD system, and luxurious interior, it's ready for any challenge.",
                        specifications: {
                            engine: {
                                model: "2.8L Turbo Diesel",
                                power: "201 HP (150 kW)",
                                torque: "500 Nm",
                                displacement: "2.8L",
                                fuelType: "Diesel",
                                fuelEconomy: "12.8 km/L"
                            },
                            performance: {
                                acceleration: "10.2 seconds (0-100 km/h)",
                                topSpeed: "175 km/h",
                                transmission: "6-Speed Automatic",
                                driveType: "4WD"
                            },
                            dimensions: {
                                length: "4,795 mm",
                                width: "1,855 mm",
                                height: "1,835 mm",
                                wheelbase: "2,745 mm",
                                groundClearance: "220 mm"
                            },
                            capacities: {
                                seating: "7",
                                fuelTank: "80 L",
                                cargoSpace: "200 L (3rd row up), 716 L (3rd row down)"
                            },
                            offroad: {
                                approachAngle: "29°",
                                departureAngle: "25°",
                                wadingDepth: "700 mm",
                                towingCapacity: "2,800 kg"
                            },
                            safety: {
                                airbags: "7",
                                abs: "Yes",
                                stabilityControl: "Yes",
                                hillStartAssist: "Yes",
                                hillDescentControl: "Yes",
                                tractionControl: "Yes",
                                brakeLSD: "Yes"
                            }
                        },
                        features: [
                            "4WD with low-range transfer case",
                            "Rear differential lock",
                            "9-inch touchscreen infotainment",
                            "Premium leather seats",
                            "Tri-zone climate control",
                            "Power tailgate",
                            "LED headlights and fog lamps",
                            "360-degree camera",
                            "Wireless charging pad",
                            "Premium sound system"
                        ],
                        brochureUrl: "/brochures/fortuner-2024.pdf",
                        specSheetUrl: "/specs/fortuner-2024-specs.pdf"
                    },
                    {
                        id: "rav4-2024-hybrid",
                        name: "Toyota RAV4 2024 Hybrid",
                        type: "suv",
                        fuelType: "hybrid",
                        images: [Images.ToyotaSUV, Images.ToyotaHero, Images.HeroImageIII],
                        tag: "Eco SUV",
                        price: 42000,
                        shortDescription: "Efficient hybrid power with SUV versatility",
                        fullDescription: "The RAV4 Hybrid combines Toyota's proven hybrid technology with the versatility of an SUV. Perfect for urban commutes and weekend adventures alike.",
                        specifications: {
                            engine: {
                                model: "2.5L 4-Cylinder + Electric Motor",
                                power: "219 HP (Combined)",
                                displacement: "2.5L",
                                fuelType: "Hybrid (Petrol + Electric)",
                                fuelEconomy: "18.5 km/L"
                            },
                            performance: {
                                acceleration: "8.1 seconds (0-100 km/h)",
                                topSpeed: "180 km/h",
                                transmission: "E-CVT",
                                driveType: "AWD"
                            },
                            battery: {
                                type: "Nickel-Metal Hydride",
                                capacity: "6.5 Ah",
                                voltage: "244.8V"
                            },
                            dimensions: {
                                length: "4,600 mm",
                                width: "1,855 mm",
                                height: "1,685 mm",
                                wheelbase: "2,690 mm",
                                groundClearance: "200 mm"
                            },
                            capacities: {
                                seating: "5",
                                fuelTank: "55 L",
                                cargoSpace: "580 L"
                            },
                            safety: {
                                airbags: "8",
                                abs: "Yes",
                                stabilityControl: "Yes",
                                laneKeepAssist: "Yes",
                                adaptiveCruiseControl: "Yes",
                                blindSpotMonitor: "Yes",
                                rearCrossTrafficAlert: "Yes"
                            }
                        },
                        features: [
                            "AWD with dynamic torque control",
                            "Toyota Safety Sense 2.5",
                            "8-inch touchscreen with Apple CarPlay",
                            "Heated front seats",
                            "Dual-zone climate control",
                            "Power liftgate",
                            "LED lighting package",
                            "Panoramic sunroof",
                            "Digital rearview mirror"
                        ],
                        brochureUrl: "/brochures/rav4-2024-hybrid.pdf",
                        specSheetUrl: "/specs/rav4-2024-hybrid-specs.pdf"
                    },
                    {
                        id: "bz4x-2024",
                        name: "Toyota bZ4X 2024",
                        type: "suv",
                        fuelType: "electric",
                        images: [Images.ToyotaSUV, Images.HeroImageIII, Images.ToyotaHero],
                        tag: "All-Electric",
                        price: 52000,
                        shortDescription: "Toyota's first all-electric SUV",
                        fullDescription: "The bZ4X represents Toyota's vision for electric mobility. With impressive range, advanced technology, and the quality you expect from Toyota.",
                        specifications: {
                            motor: {
                                type: "Dual Electric Motors (AWD)",
                                power: "214 HP (160 kW)",
                                torque: "336 Nm",
                                driveType: "AWD"
                            },
                            battery: {
                                type: "Lithium-ion",
                                capacity: "71.4 kWh",
                                range: "460 km (WLTP)",
                                charging: {
                                    dcFastCharging: "150 kW (10-80% in 30 min)",
                                    acCharging: "11 kW (0-100% in 7 hours)"
                                }
                            },
                            performance: {
                                acceleration: "6.9 seconds (0-100 km/h)",
                                topSpeed: "160 km/h",
                                transmission: "Single-Speed Automatic"
                            },
                            dimensions: {
                                length: "4,690 mm",
                                width: "1,860 mm",
                                height: "1,650 mm",
                                wheelbase: "2,850 mm",
                                groundClearance: "210 mm"
                            },
                            capacities: {
                                seating: "5",
                                cargoSpace: "452 L"
                            },
                            safety: {
                                airbags: "10",
                                abs: "Yes",
                                stabilityControl: "Yes",
                                laneKeepAssist: "Yes",
                                adaptiveCruiseControl: "Yes",
                                blindSpotMonitor: "Yes",
                                preCollisionSystem: "Yes",
                                parkingAssist: "Yes"
                            }
                        },
                        features: [
                            "E-Four AWD system",
                            "One-pedal driving mode",
                            "12.3-inch digital instrument cluster",
                            "12.3-inch touchscreen infotainment",
                            "Panoramic fixed glass roof",
                            "Heated and ventilated seats",
                            "Heat pump climate system",
                            "Wireless charging and connectivity",
                            "Advanced parking assistance",
                            "Over-the-air updates"
                        ],
                        brochureUrl: "/brochures/bz4x-2024.pdf",
                        specSheetUrl: "/specs/bz4x-2024-specs.pdf"
                    }
                ]
            },
        },
        dongfeng: {
            name: 'Dongfeng',
            description: 'Reliable commercial vehicles built for tough conditions and heavy-duty applications.',
            images: [Images.HeroImageII],
            logo: Images.DongfengLogo,
            productTypes: [{
                name: 'Truck',
                type: 'truck',
                image: Images.HeroImageII
            },
            {
                type: 'Tipper',
                type: 'tipper',
                image: Images.HeroImageIII
            }],
            // products: {
            //     truck: [
            //         {
            //             id: "dongfeng-df8",
            //             name: "Dongfeng DF-8 Cargo Truck",
            //             type: "truck",
            //             fuelType: "normal",
            //             images: [Images.HeroImageII, Images.EicherHero, Images.KomatsuHero],
            //             tag: "Reliable",
            //             price: 38000,
            //             shortDescription: "Heavy-duty cargo truck for commercial applications",
            //             fullDescription: "The Dongfeng DF-8 is a reliable workhorse designed for heavy cargo transportation. Built with robust components and efficient powertrain for long-haul operations.",
            //             specifications: {
            //                 engine: {
            //                     model: "Cummins ISB6.7",
            //                     power: "210 HP (157 kW)",
            //                     torque: "760 Nm",
            //                     displacement: "6.7L",
            //                     fuelType: "Diesel",
            //                     fuelEconomy: "8.5 km/L"
            //                 },
            //                 performance: {
            //                     maxSpeed: "110 km/h",
            //                     transmission: "8-Speed Manual",
            //                     driveType: "4x2"
            //                 },
            //                 dimensions: {
            //                     length: "8,995 mm",
            //                     width: "2,480 mm",
            //                     height: "3,200 mm",
            //                     wheelbase: "5,100 mm",
            //                     groundClearance: "250 mm"
            //                 },
            //                 capacities: {
            //                     gvw: "16,000 kg",
            //                     payloadCapacity: "10,000 kg",
            //                     fuelTank: "300 L",
            //                     cabSeating: "3"
            //                 },
            //                 chassis: {
            //                     frontAxle: "6,000 kg",
            //                     rearAxle: "10,000 kg",
            //                     tireSize: "10.00-20"
            //                 }
            //             },
            //             features: [
            //                 "Spacious cabin with air conditioning",
            //                 "Power steering",
            //                 "Air brake system",
            //                 "Adjustable driver seat",
            //                 "Digital instrument cluster",
            //                 "ABS brakes",
            //                 "Heavy-duty suspension",
            //                 "Backup alarm"
            //             ],
            //             brochureUrl: "/brochures/dongfeng-df8.pdf",
            //             specSheetUrl: "/specs/dongfeng-df8-specs.pdf"
            //         }
            //     ],
            //     tipper: [
            //         {
            //             id: "dongfeng-tipper-t12",
            //             name: "Dongfeng T-12 Tipper",
            //             type: "tipper",
            //             fuelType: "normal",
            //             images: [Images.HeroImageIII, Images.EicherHero, Images.KomatsuHero],
            //             tag: "Heavy Duty",
            //             price: 45000,
            //             shortDescription: "Robust tipper for construction and mining",
            //             fullDescription: "The Dongfeng T-12 Tipper is engineered for demanding construction and mining operations. Features a hydraulic tipping mechanism and reinforced body for maximum durability.",
            //             specifications: {
            //                 engine: {
            //                     model: "Cummins L9.3",
            //                     power: "340 HP (254 kW)",
            //                     torque: "1,450 Nm",
            //                     displacement: "9.3L",
            //                     fuelType: "Diesel",
            //                     fuelEconomy: "6.5 km/L"
            //                 },
            //                 performance: {
            //                     maxSpeed: "90 km/h",
            //                     transmission: "10-Speed Manual",
            //                     driveType: "6x4"
            //                 },
            //                 dimensions: {
            //                     length: "9,500 mm",
            //                     width: "2,500 mm",
            //                     height: "3,400 mm",
            //                     wheelbase: "4,500 + 1,350 mm",
            //                     groundClearance: "280 mm"
            //                 },
            //                 capacities: {
            //                     gvw: "25,000 kg",
            //                     payloadCapacity: "15,000 kg",
            //                     bodyCapacity: "12 m³",
            //                     fuelTank: "400 L"
            //                 },
            //                 tipping: {
            //                     hydraulicSystem: "Single-acting cylinder",
            //                     tippingAngle: "50°",
            //                     tippingTime: "15 seconds",
            //                     bodyMaterial: "High-strength steel"
            //                 }
            //             },
            //             features: [
            //                 "Hydraulic tipping system",
            //                 "Reinforced steel body",
            //                 "Air-conditioned cabin",
            //                 "Multi-function steering wheel",
            //                 "Air suspension driver seat",
            //                 "ABS and EBD brakes",
            //                 "Heavy-duty rear axles",
            //                 "Automatic tarp system",
            //                 "Rear camera"
            //             ],
            //             brochureUrl: "/brochures/dongfeng-t12.pdf",
            //             specSheetUrl: "/specs/dongfeng-t12-specs.pdf"
            //         }
            //     ]
            // }
        },
        komatsu: {
            name: 'Komatsu',
            description: 'World-class construction equipment with superior performance and reliability.',
            images: [Images.KomatsuHero],
            logo: Images.KomatsuLogo,
            productTypes: [{
                name: 'Excavator',
                type: 'excavator',
                image: Images.KomatsuHero
            }],
            // products: {
            //     excavator: [
            //         {
            //             id: "komatsu-pc200",
            //             name: "Komatsu PC200-11",
            //             type: "excavator",
            //             fuelType: "normal",
            //             images: [Images.KomatsuHero, Images.BullLoader, Images.BullHero],
            //             tag: "Industry Leader",
            //             price: 95000,
            //             shortDescription: "Advanced hydraulic excavator for maximum productivity",
            //             fullDescription: "The PC200-11 combines exceptional performance with fuel efficiency. Features advanced hydraulics, intelligent control systems, and superior operator comfort.",
            //             specifications: {
            //                 engine: {
            //                     model: "Komatsu SAA6D107E-3",
            //                     power: "155 HP (116 kW)",
            //                     displacement: "6.7L",
            //                     fuelType: "Diesel",
            //                     emissionStandard: "EU Stage V"
            //                 },
            //                 performance: {
            //                     operatingWeight: "20,300 kg",
            //                     bucketCapacity: "0.93 m³",
            //                     maxDiggingDepth: "6,710 mm",
            //                     maxDiggingReach: "10,070 mm",
            //                     maxDiggingHeight: "9,760 mm",
            //                     maxDumpingHeight: "6,870 mm"
            //                 },
            //                 dimensions: {
            //                     overallLength: "9,800 mm",
            //                     overallWidth: "2,800 mm",
            //                     overallHeight: "3,090 mm",
            //                     tailSwingRadius: "2,930 mm",
            //                     groundClearance: "450 mm"
            //                 },
            //                 hydraulics: {
            //                     systemPressure: "345 bar",
            //                     pumpFlow: "2 x 234 L/min",
            //                     bucketDiggingForce: "140 kN",
            //                     armDiggingForce: "100 kN"
            //                 },
            //                 capacities: {
            //                     fuelTank: "400 L",
            //                     hydraulicTank: "210 L",
            //                     engineOil: "30 L"
            //                 },
            //                 travel: {
            //                     speed: "5.5 / 3.4 km/h",
            //                     gradability: "70% (35°)",
            //                     groundPressure: "47 kPa"
            //                 }
            //             },
            //             features: [
            //                 "KOMTRAX telematics system",
            //                 "Eco-mode for fuel efficiency",
            //                 "Large LCD monitor display",
            //                 "Climate-controlled cabin",
            //                 "Hydraulic quick coupler",
            //                 "Auto-idle shutdown",
            //                 "Rearview camera standard",
            //                 "LED working lights",
            //                 "Advanced hydraulic system"
            //             ],
            //             brochureUrl: "/brochures/komatsu-pc200.pdf",
            //             specSheetUrl: "/specs/komatsu-pc200-specs.pdf"
            //         },
            //         {
            //             id: "komatsu-pc130",
            //             name: "Komatsu PC130-11",
            //             type: "excavator",
            //             fuelType: "normal",
            //             images: [Images.KomatsuHero, Images.BullHero, Images.BullLoader],
            //             tag: "Compact Power",
            //             price: 68000,
            //             shortDescription: "Versatile mid-size excavator for diverse applications",
            //             fullDescription: "The PC130-11 offers excellent balance of power and efficiency in a compact package. Perfect for urban construction and utility work.",
            //             specifications: {
            //                 engine: {
            //                     model: "Komatsu SAA4D107E-3",
            //                     power: "102 HP (76 kW)",
            //                     displacement: "4.5L",
            //                     fuelType: "Diesel",
            //                     emissionStandard: "EU Stage V"
            //                 },
            //                 performance: {
            //                     operatingWeight: "13,200 kg",
            //                     bucketCapacity: "0.54 m³",
            //                     maxDiggingDepth: "5,450 mm",
            //                     maxDiggingReach: "8,330 mm",
            //                     maxDiggingHeight: "8,290 mm",
            //                     maxDumpingHeight: "5,890 mm"
            //                 },
            //                 dimensions: {
            //                     overallLength: "8,170 mm",
            //                     overallWidth: "2,490 mm",
            //                     overallHeight: "2,800 mm",
            //                     tailSwingRadius: "2,490 mm",
            //                     groundClearance: "430 mm"
            //                 },
            //                 hydraulics: {
            //                     systemPressure: "345 bar",
            //                     pumpFlow: "2 x 157 L/min",
            //                     bucketDiggingForce: "91 kN",
            //                     armDiggingForce: "68 kN"
            //                 },
            //                 capacities: {
            //                     fuelTank: "210 L",
            //                     hydraulicTank: "130 L",
            //                     engineOil: "18 L"
            //                 },
            //                 travel: {
            //                     speed: "5.5 / 3.3 km/h",
            //                     gradability: "70% (35°)",
            //                     groundPressure: "43 kPa"
            //                 }
            //             },
            //             features: [
            //                 "KOMTRAX monitoring",
            //                 "Fuel-efficient operation",
            //                 "7-inch LCD display",
            //                 "Air-conditioned cab",
            //                 "Quick coupler compatible",
            //                 "Automatic engine idle",
            //                 "Backup camera",
            //                 "LED work lights",
            //                 "Ergonomic controls"
            //             ],
            //             brochureUrl: "/brochures/komatsu-pc130.pdf",
            //             specSheetUrl: "/specs/komatsu-pc130-specs.pdf"
            //         }
            //     ]
            // }
        },
        eicher: {
            name: 'Eicher',
            description: 'Trusted commercial vehicles delivering reliability and efficiency for businesses.',
            images: [Images.EicherHero],
            logo: Images.EicherLogo,
            productTypes: [{
                name: 'Truck',
                type: 'truck',
                image: Images.EicherHero
            },
            {
                type: 'Bus',
                type: 'bus',
                image: Images.HeroImageII
            }],
            // products: {
            //     truck: [
            //         {
            //             id: "eicher-pro-2049",
            //             name: "Eicher Pro 2049",
            //             type: "truck",
            //             fuelType: "normal",
            //             images: [Images.EicherHero, Images.HeroImageII, Images.KomatsuHero],
            //             tag: "Fuel Efficient",
            //             price: 28000,
            //             shortDescription: "Light commercial vehicle with best-in-class mileage",
            //             fullDescription: "The Eicher Pro 2049 is designed for urban and highway logistics. Known for exceptional fuel efficiency and low operating costs.",
            //             specifications: {
            //                 engine: {
            //                     model: "Eicher E494 CRS",
            //                     power: "95 HP (70 kW)",
            //                     torque: "250 Nm",
            //                     displacement: "2.98L",
            //                     fuelType: "Diesel",
            //                     fuelEconomy: "12.5 km/L"
            //                 },
            //                 performance: {
            //                     maxSpeed: "100 km/h",
            //                     transmission: "5-Speed Manual",
            //                     driveType: "4x2"
            //                 },
            //                 dimensions: {
            //                     length: "6,720 mm",
            //                     width: "2,100 mm",
            //                     height: "2,615 mm",
            //                     wheelbase: "3,800 mm",
            //                     groundClearance: "210 mm"
            //                 },
            //                 capacities: {
            //                     gvw: "4,995 kg",
            //                     payloadCapacity: "2,490 kg",
            //                     fuelTank: "90 L",
            //                     cabSeating: "3"
            //                 }
            //             },
            //             features: [
            //                 "Common rail fuel injection",
            //                 "Comfortable cabin",
            //                 "Power steering",
            //                 "Digital instrument cluster",
            //                 "Front disc brakes",
            //                 "Easy maintenance",
            //                 "Low noise levels",
            //                 "Ergonomic design"
            //             ],
            //             brochureUrl: "/brochures/eicher-pro-2049.pdf",
            //             specSheetUrl: "/specs/eicher-pro-2049-specs.pdf"
            //         }
            //     ],
            //     bus: [
            //         {
            //             id: "eicher-skyline-pro-electric",
            //             name: "Eicher Skyline Pro Electric",
            //             type: "bus",
            //             fuelType: "electric",
            //             images: [Images.EicherHero, Images.HeroImageII, Images.HeroImageIII],
            //             tag: "Zero Emission",
            //             price: 85000,
            //             shortDescription: "Electric bus for sustainable public transportation",
            //             fullDescription: "The Skyline Pro Electric represents the future of public transport. Zero emissions, low operating costs, and superior passenger comfort.",
            //             specifications: {
            //                 motor: {
            //                     type: "AC Induction Motor",
            //                     power: "250 HP (186 kW)",
            //                     torque: "2,500 Nm",
            //                     driveType: "Rear-wheel drive"
            //                 },
            //                 battery: {
            //                     type: "Lithium-ion NMC",
            //                     capacity: "250 kWh",
            //                     range: "200 km (single charge)",
            //                     charging: {
            //                         dcFastCharging: "120 kW (0-80% in 90 min)",
            //                         acCharging: "40 kW (0-100% in 6 hours)"
            //                     }
            //                 },
            //                 performance: {
            //                     maxSpeed: "80 km/h",
            //                     transmission: "Single-Speed Automatic",
            //                     gradability: "20%"
            //                 },
            //                 dimensions: {
            //                     length: "9,140 mm",
            //                     width: "2,500 mm",
            //                     height: "3,185 mm",
            //                     wheelbase: "4,880 mm"
            //                 },
            //                 capacities: {
            //                     seating: "31 + driver",
            //                     standing: "19",
            //                     totalPassengers: "50",
            //                     gvw: "16,200 kg"
            //                 },
            //                 safety: {
            //                     abs: "Yes",
            //                     ebd: "Yes",
            //                     emergencyBrakeAssist: "Yes",
            //                     fireSuppressionSystem: "Yes",
            //                     panicButton: "Yes"
            //                 }
            //             },
            //             features: [
            //                 "Zero emissions operation",
            //                 "Regenerative braking",
            //                 "Air conditioning",
            //                 "Low floor design",
            //                 "Wheelchair accessibility",
            //                 "CCTV cameras",
            //                 "USB charging ports",
            //                 "Digital destination display",
            //                 "Telematics system",
            //                 "Quiet operation"
            //             ],
            //             brochureUrl: "/brochures/eicher-skyline-electric.pdf",
            //             specSheetUrl: "/specs/eicher-skyline-electric-specs.pdf"
            //         }
            //     ]
            // }
        },
        xcmg: {
            name: 'XCMG',
            description: 'Built to perform. Rugged durability and off-road capability for the adventurous spirit.',
            images: [],
            logo: Images.XCMGLogo
        },
        ather: {
            name: 'Ather',
            description: 'Futuristic electric scooters with cutting-edge technology and eco-friendly performance.',
            images: [Images.AtherHero],
            logo: Images.AtherLogo,
            productTypes: [{
                name: 'Electric Scooter',
                type: 'electric_scooter',
                image: Images.Ather450s
            }],
            products: {
                electric_scooter: [
                    {
                        id: "ather-450x2.9",
                        name: "Ather 450X  2.9 kWh",
                        type: "scooter",
                        fuelType: "electric",
                        images: [Images.Ather450x2_9, Images.Ather450x2_9],
                        tag: "Premium Electric",
                        // price: 1800,
                        // shortDescription: "India's smartest electric scooter with superior range",
                        // fullDescription: "The Ather 450X  2.9 kWh is a premium electric scooter that combines performance, technology, and style. With its powerful motor, long range, and smart features, it redefines urban mobility.",
                        // specifications: {
                        //     motor: {
                        //         type: "PMSM (Permanent Magnet Synchronous Motor)",
                        //         power: "6.4 kW (Peak 8.7 kW)",
                        //         torque: "26 Nm",
                        //         topSpeed: "90 km/h"
                        //     },
                        //     battery: {
                        //         type: "Lithium-ion",
                        //         capacity: "3.7 kWh",
                        //         range: "105 km (TrueRange) / 146 km (Eco mode)",
                        //         charging: {
                        //             fastCharging: "0-80% in 50 minutes (Ather Grid)",
                        //             homeCharging: "0-100% in 6.5 hours"
                        //         },
                        //         warranty: "3 years / 30,000 km"
                        //     },
                        //     performance: {
                        //         acceleration: "3.3 seconds (0-40 km/h)",
                        //         rideModes: ["Eco", "Ride", "Sport", "Warp"],
                        //         hillClimb: "18°",
                        //         groundClearance: "155 mm"
                        //     },
                        //     dimensions: {
                        //         length: "1,847 mm",
                        //         width: "734 mm",
                        //         height: "1,261 mm",
                        //         wheelbase: "1,285 mm",
                        //         seatHeight: "780 mm"
                        //     },
                        //     capacities: {
                        //         loadCapacity: "150 kg",
                        //         storageSpace: "22 L (Under seat)",
                        //         weight: "108 kg"
                        //     },
                        //     features: {
                        //         brakes: "Disc brakes (Front & Rear)",
                        //         suspension: "Telescopic front, Monoshock rear",
                        //         tires: "90/90 R12 (Front), 100/80 R12 (Rear)",
                        //         wheels: "12-inch alloy wheels"
                        //     },
                        //     technology: {
                        //         display: "7-inch TFT touchscreen",
                        //         connectivity: "4G + Bluetooth + WiFi",
                        //         navigation: "Google Maps integration",
                        //         ota: "Over-the-air updates",
                        //         smartphone: "Ather App connectivity"
                        //     }
                        // },
                        // features: [
                        //     "7-inch touchscreen dashboard",
                        //     "Google Maps navigation",
                        //     "Over-the-air updates",
                        //     "Multiple ride modes",
                        //     "Reverse mode",
                        //     "Auto hold (Hill hold)",
                        //     "Fall safe detection",
                        //     "Emergency SOS",
                        //     "Guide me home lights",
                        //     "Theft detection & alerts",
                        //     "Remote diagnostics",
                        //     "LED lighting all around",
                        //     "Fast charging capability"
                        // ],
                        brochureUrl: "/brochures/ather-450x.pdf",
                        specSheetUrl: "/specs/ather-450x-specs.pdf"
                    },
                    {
                        id: "ather-450x3.7",
                        name: "Ather 450X 3.7 kWh",
                        type: "scooter",
                        fuelType: "electric",
                        images: [Images.Ather450x3_7, Images.Ather450x3_7],
                        tag: "Premium Electric",
                        // price: 1800,
                        // shortDescription: "India's smartest electric scooter with superior range",
                        // fullDescription: "The Ather 450X 3.7 kWh is a premium electric scooter that combines performance, technology, and style. With its powerful motor, long range, and smart features, it redefines urban mobility.",
                        // specifications: {
                        //     motor: {
                        //         type: "PMSM (Permanent Magnet Synchronous Motor)",
                        //         power: "6.4 kW (Peak 8.7 kW)",
                        //         torque: "26 Nm",
                        //         topSpeed: "90 km/h"
                        //     },
                        //     battery: {
                        //         type: "Lithium-ion",
                        //         capacity: "3.7 kWh",
                        //         range: "105 km (TrueRange) / 146 km (Eco mode)",
                        //         charging: {
                        //             fastCharging: "0-80% in 50 minutes (Ather Grid)",
                        //             homeCharging: "0-100% in 6.5 hours"
                        //         },
                        //         warranty: "3 years / 30,000 km"
                        //     },
                        //     performance: {
                        //         acceleration: "3.3 seconds (0-40 km/h)",
                        //         rideModes: ["Eco", "Ride", "Sport", "Warp"],
                        //         hillClimb: "18°",
                        //         groundClearance: "155 mm"
                        //     },
                        //     dimensions: {
                        //         length: "1,847 mm",
                        //         width: "734 mm",
                        //         height: "1,261 mm",
                        //         wheelbase: "1,285 mm",
                        //         seatHeight: "780 mm"
                        //     },
                        //     capacities: {
                        //         loadCapacity: "150 kg",
                        //         storageSpace: "22 L (Under seat)",
                        //         weight: "108 kg"
                        //     },
                        //     features: {
                        //         brakes: "Disc brakes (Front & Rear)",
                        //         suspension: "Telescopic front, Monoshock rear",
                        //         tires: "90/90 R12 (Front), 100/80 R12 (Rear)",
                        //         wheels: "12-inch alloy wheels"
                        //     },
                        //     technology: {
                        //         display: "7-inch TFT touchscreen",
                        //         connectivity: "4G + Bluetooth + WiFi",
                        //         navigation: "Google Maps integration",
                        //         ota: "Over-the-air updates",
                        //         smartphone: "Ather App connectivity"
                        //     }
                        // },
                        // features: [
                        //     "7-inch touchscreen dashboard",
                        //     "Google Maps navigation",
                        //     "Over-the-air updates",
                        //     "Multiple ride modes",
                        //     "Reverse mode",
                        //     "Auto hold (Hill hold)",
                        //     "Fall safe detection",
                        //     "Emergency SOS",
                        //     "Guide me home lights",
                        //     "Theft detection & alerts",
                        //     "Remote diagnostics",
                        //     "LED lighting all around",
                        //     "Fast charging capability"
                        // ],
                        brochureUrl: "/brochures/ather-450x.pdf",
                        specSheetUrl: "/specs/ather-450x-specs.pdf"
                    },
                    {
                        id: "ather-450s",
                        name: "Ather 450S",
                        type: "scooter",
                        fuelType: "electric",
                        images: [Images.Ather450s, Images.Ather450s],
                        tag: "Smart Choice",
                        // price: 1400,
                        // shortDescription: "Accessible electric mobility with smart features",
                        // fullDescription: "The Ather 450S brings electric mobility to everyone. With essential smart features and reliable performance, it's the perfect entry point to the electric revolution.",
                        // specifications: {
                        //     motor: {
                        //         type: "PMSM (Permanent Magnet Synchronous Motor)",
                        //         power: "5.4 kW (Peak 7.2 kW)",
                        //         torque: "22 Nm",
                        //         topSpeed: "90 km/h"
                        //     },
                        //     battery: {
                        //         type: "Lithium-ion",
                        //         capacity: "2.9 kWh",
                        //         range: "90 km (TrueRange) / 115 km (Eco mode)",
                        //         charging: {
                        //             fastCharging: "0-80% in 45 minutes (Ather Grid)",
                        //             homeCharging: "0-100% in 5.5 hours"
                        //         },
                        //         warranty: "3 years / 30,000 km"
                        //     },
                        //     performance: {
                        //         acceleration: "3.7 seconds (0-40 km/h)",
                        //         rideModes: ["Eco", "Ride", "Sport"],
                        //         hillClimb: "16°",
                        //         groundClearance: "155 mm"
                        //     },
                        //     dimensions: {
                        //         length: "1,847 mm",
                        //         width: "734 mm",
                        //         height: "1,261 mm",
                        //         wheelbase: "1,285 mm",
                        //         seatHeight: "780 mm"
                        //     },
                        //     capacities: {
                        //         loadCapacity: "150 kg",
                        //         storageSpace: "22 L (Under seat)",
                        //         weight: "102 kg"
                        //     },
                        //     features: {
                        //         brakes: "Disc brakes (Front & Rear)",
                        //         suspension: "Telescopic front, Monoshock rear",
                        //         tires: "90/90 R12 (Front), 100/80 R12 (Rear)",
                        //         wheels: "12-inch alloy wheels"
                        //     },
                        //     technology: {
                        //         display: "7-inch TFT touchscreen",
                        //         connectivity: "Bluetooth + WiFi",
                        //         navigation: "Turn-by-turn navigation",
                        //         ota: "Over-the-air updates",
                        //         smartphone: "Ather App connectivity"
                        //     }
                        // },
                        // features: [
                        //     "7-inch touchscreen dashboard",
                        //     "Turn-by-turn navigation",
                        //     "Over-the-air updates",
                        //     "Multiple ride modes",
                        //     "Reverse mode",
                        //     "Fall safe detection",
                        //     "Theft detection & alerts",
                        //     "Remote diagnostics",
                        //     "LED lighting",
                        //     "Fast charging support",
                        //     "Smartphone connectivity",
                        //     "Digital key"
                        // ],
                        brochureUrl: "/brochures/ather-450s.pdf",
                        specSheetUrl: "/specs/ather-450s-specs.pdf"
                    },
                ]
            }
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
            content: 'Our mission is to build a sustainable, trusted brand while creating superior long-term value for our stakeholders.',
            icon: 'mission'
        },
        vision: {
            title: 'Our Vision',
            content: ' Inspiring customer loyalty through excellence in every service we provide.',
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
        chairman_message: {
            name: "Narayan Prasad Poudel",
            title: "Chairman",
            message: "Our journey has always been guided by ambition, innovation, and a commitment to excellence. From the very beginning, our mission has been to redefine Nepal’s automotive landscape, setting new standards, embracing bold ideas, and creating lasting value for our customers, employees, and society.\n Over the years, our progress has been shaped by consistent investment in advanced technology, innovative solutions, and strategic development. Year after year, we have surpassed our own benchmarks, a reflection of the dedication, discipline, and collective strength of the Autoways family. Even in times of challenge, we have remained steadfast in optimizing operations, enhancing efficiency, and upholding disciplined governance, all while keeping a long-term vision of sustainable growth at the forefront.\n Our customers remain at the heart of everything we do. By delivering solutions tailored to their needs, we aim not only to build trust and loyalty but also to elevate the standards of mobility across Nepal. At the same time, we recognize our responsibility to society, striving to grow in harmony with the communities we serve, while maintaining our role as a dependable, progressive, and respected corporate citizen.\n Looking ahead, we continue to embrace new challenges with confidence, guided by a forward-thinking mindset and a passion for innovation. Autoways is more than a company, it is a movement, driven by ambition, purpose, and a relentless desire to shape the future of mobility in Nepal.\n Thank you for being part of our journey. Together, we will continue to redefine what is possible.           ",
            image: Images.AutowaysChairman
        },
        md_message: {
            name: " CEO & Director",
            title: " CEO & Director",
            message: "We have a dream to be the very best at what we do. But ambition alone isn’t enough. We never forget where we started, and the values that brought us here remain our guiding light. Our customers are at the heart of everything, and giving them excellence isn’t just a goal, it’s our promise. At the same time, we believe that a company is only as strong as its people, which is why we are committed to creating a workplace where talent thrives, ideas flourish, and everyone feels they belong.\n This is more than business. This is our passion, our drive, and our journey and we invite you to be part of it.",
            image: Images.AutowaysAbout
        },
        team: {
            title: 'Leadership Team',
            description: 'Our experienced leadership team brings decades of automotive industry expertise, guiding Autoways towards continued excellence and innovation.',
        //     members: [
        //         {
        //             id: 1,
        //             name: 'Ram Prasad Sharma',
        //             position: 'Chief Executive Officer',
        //             bio: 'With over 25 years in automotive industry, Ram leads Autoways strategic vision and growth.',
        //             image: null
        //         },
        //         {
        //             id: 2,
        //             name: 'Sita Devi Poudel',
        //             position: 'Chief Operations Officer',
        //             bio: 'Expert in operational excellence, Sita ensures seamless service delivery across all locations.',
        //             image: null
        //         },
        //         {
        //             id: 3,
        //             name: 'Prakash Kumar Shrestha',
        //             position: 'Head of Sales',
        //             bio: 'Leading sales strategy and customer relationships with proven track record of success.',
        //             image: null
        //         },
        //         {
        //             id: 4,
        //             name: 'Mina Tamang',
        //             position: 'Head of Service Operations',
        //             bio: 'Ensuring world-class after-sales service and customer satisfaction across Nepal.',
        //             image: null
        //         }
        //     ]
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
                image: Images.SwiftHolidaysHero,
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
                image: Images.ManipalHero,
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
                image: Images.PrativaHero,
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
                image: Images.InfomaxHero,
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
                name: 'EEvergreen Academy',
                tagline: 'Growing Minds, Nurturing Hearts',
                description: 'Premier Montessori education fostering creativity, independence, and love for learning in a nurturing environment for young minds to flourish.',
                logo: Images.EvergreenLogo,
                image: Images.EvergreenHero,
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