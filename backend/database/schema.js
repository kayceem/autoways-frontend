import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// ==================== Hero Images Schema ====================
const HeroImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    ctaText: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== About Us Schema ====================
const AboutUsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== Contact Info Schema ====================
const ContactInfoSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    corporate_address: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String,
        linkedin: String
    }
}, { timestamps: true });

// ==================== Location Schema ====================
const LocationSchema = new Schema({
    locationId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: [Number],
        required: true,
        validate: {
            validator: function(v) {
                return v.length === 2;
            },
            message: 'Position must be an array of [latitude, longitude]'
        }
    },
    address: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== Product Specification Schemas ====================
const EngineSpecSchema = new Schema({
    model: String,
    power: String,
    torque: String,
    displacement: String,
    fuelType: String,
    fuelEconomy: String,
    emissionStandard: String
}, { _id: false });

const PerformanceSpecSchema = new Schema({
    acceleration: String,
    topSpeed: String,
    transmission: String,
    driveType: String,
    operatingWeight: String,
    bucketCapacity: String,
    maxSpeed: String,
    breakoutForce: String,
    dumpingHeight: String,
    dumpingReach: String,
    ratedOperatingCapacity: String,
    tippingLoad: String,
    travelSpeed: String,
    hydraulicFlow: String,
    operatingPressure: String
}, { _id: false });

const DimensionsSpecSchema = new Schema({
    length: String,
    width: String,
    height: String,
    wheelbase: String,
    groundClearance: String
}, { _id: false });

const BatterySpecSchema = new Schema({
    type: String,
    capacity: String,
    voltage: String,
    range: String,
    charging: {
        dcFastCharging: String,
        acCharging: String
    }
}, { _id: false });

const HydraulicsSpecSchema = new Schema({
    systemPressure: String,
    pumpFlow: String,
    cycleTime: String
}, { _id: false });

const LiftArmSpecSchema = new Schema({
    maxLiftHeight: String,
    reachAtMaxHeight: String,
    dumpAngle: String,
    rollbackAngle: String
}, { _id: false });

const CapacitiesSpecSchema = new Schema({
    seating: String,
    fuelTank: String,
    trunkSpace: String,
    cargoSpace: String,
    hydraulicOil: String,
    engineOil: String,
    hydraulicTank: String
}, { _id: false });

const SafetySpecSchema = new Schema({
    airbags: String,
    abs: String,
    stabilityControl: String,
    blindSpotMonitor: String,
    laneKeepAssist: String,
    adaptiveCruiseControl: String,
    preCollisionSystem: String,
    tractionControl: String,
    hillStartAssist: String,
    hillDescentControl: String,
    brakeLSD: String,
    tpms: String,
    rearCrossTrafficAlert: String,
    parkingAssist: String
}, { _id: false });

const OffroadSpecSchema = new Schema({
    approachAngle: String,
    departureAngle: String,
    wadingDepth: String,
    towingCapacity: String
}, { _id: false });

const MotorSpecSchema = new Schema({
    type: String,
    power: String,
    torque: String,
    driveType: String
}, { _id: false });

const ProductSpecificationsSchema = new Schema({
    engine: EngineSpecSchema,
    motor: MotorSpecSchema,
    performance: PerformanceSpecSchema,
    dimensions: DimensionsSpecSchema,
    battery: BatterySpecSchema,
    hydraulics: HydraulicsSpecSchema,
    liftArm: LiftArmSpecSchema,
    capacities: CapacitiesSpecSchema,
    safety: SafetySpecSchema,
    offroad: OffroadSpecSchema
}, { _id: false });

// ==================== Product Schema ====================
const ProductSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['normal', 'hybrid', 'electric'],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    tag: String,
    price: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    specifications: ProductSpecificationsSchema,
    features: [String],
    brochureUrl: String,
    specSheetUrl: String,
    brand: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== Product Type Schema ====================
const ProductTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { _id: false });

// ==================== Brand Schema ====================
const BrandSchema = new Schema({
    brandKey: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    heroImage : {
        type: String,
        required: true
    },
    images: [String],
    video: String,
    logo: {
        type: String,
        required: true
    },
    productTypes: [ProductTypeSchema]
}, { timestamps: true });

// ==================== Partner Schema ====================
const PartnerSchema = new Schema({
    partnerKey: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== Client Schema ====================
const ClientSchema = new Schema({
    clientKey: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== News Media Schema ====================
const NewsArticleSchema = new Schema({
    articleId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// ==================== Testimonial Schema ====================
const TestimonialSchema = new Schema({
    testimonialId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: String,
    image: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== About Us Detailed Schema ====================
const MissionVisionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    icon: String
}, { _id: false });

const ValueSchema = new Schema({
    valueId: Number,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: String
}, { _id: false });

const MilestoneSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String
}, { _id: false });

const AboutUsDetailedSchema = new Schema({
    mission: MissionVisionSchema,
    vision: MissionVisionSchema,
    values: [ValueSchema],
    milestones: [MilestoneSchema],
    chairman_message: {
        title: String,
        name: String,
        position: String,
        image: String,
        message: String
    },
    team: [{
        id: Number,
        name: String,
        position: String,
        department: String,
        image: String,
        bio: String,
        email: String,
        phone: String
    }],
    certifications: [{
        id: Number,
        name: String,
        issuedBy: String,
        year: String,
        image: String,
        description: String
    }],
    awards: [{
        id: Number,
        title: String,
        year: String,
        issuedBy: String,
        image: String,
        description: String
    }]
}, { timestamps: true });

// ==================== CSR Schema ====================
const CSRInitiativeSchema = new Schema({
    initiativeId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    impact: {
        metric: String,
        label: String
    },
    activities: [String]
}, { timestamps: true });

const CSRHeroSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

// ==================== Sister Company Schema ====================
const SisterCompanySchema = new Schema({
    companyId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    services: [String],
    contact: {
        email: String,
        phone: String,
        website: String
    },
    stats: Schema.Types.Mixed
}, { timestamps: true });

// ==================== Spares Parts Schema ====================
const SparePartSchema = new Schema({
    partId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    partNumber: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const SparePartsServiceSchema = new Schema({
    serviceId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: String
}, { timestamps: true });

const SparePartsStatsSchema = new Schema({
    partsAvailable: String,
    brandsSupported: String,
    serviceLocations: String,
    expertTechnicians: String
}, { timestamps: true });

const SparePartsContactSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hours: String
}, { timestamps: true });

// ==================== Export Models ====================
const HeroImage = mongoose.model('HeroImage', HeroImageSchema);
const AboutUs = mongoose.model('AboutUs', AboutUsSchema);
const ContactInfo = mongoose.model('ContactInfo', ContactInfoSchema);
const Location = mongoose.model('Location', LocationSchema);
const Product = mongoose.model('Product', ProductSchema);
const Brand = mongoose.model('Brand', BrandSchema);
const Partner = mongoose.model('Partner', PartnerSchema);
const Client = mongoose.model('Client', ClientSchema);
const NewsArticle = mongoose.model('NewsArticle', NewsArticleSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
const AboutUsDetailed = mongoose.model('AboutUsDetailed', AboutUsDetailedSchema);
const CSRInitiative = mongoose.model('CSRInitiative', CSRInitiativeSchema);
const CSRHero = mongoose.model('CSRHero', CSRHeroSchema);
const SisterCompany = mongoose.model('SisterCompany', SisterCompanySchema);
const SparePart = mongoose.model('SparePart', SparePartSchema);
const SparePartsService = mongoose.model('SparePartsService', SparePartsServiceSchema);
const SparePartsStats = mongoose.model('SparePartsStats', SparePartsStatsSchema);
const SparePartsContact = mongoose.model('SparePartsContact', SparePartsContactSchema);

export {
    HeroImage,
    AboutUs,
    ContactInfo,
    Location,
    Product,
    Brand,
    Partner,
    Client,
    NewsArticle,
    Testimonial,
    AboutUsDetailed,
    CSRInitiative,
    CSRHero,
    SisterCompany,
    SparePart,
    SparePartsService,
    SparePartsStats,
    SparePartsContact
};
