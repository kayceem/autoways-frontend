const { SiGeneralelectric } = require('@icons-pack/react-simple-icons');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ==================== Hero Images Schema ====================
const HeroImageSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    ctaText: {
        type: String,
    },
    alt: {
        type: String,
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
            validator: function (v) {
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

// ==================== Product Specifications Schema ====================
const ProductSpecificationsSchema = new Schema({
    general: Schema.Types.Mixed,
    engine: Schema.Types.Mixed,
    motor: Schema.Types.Mixed,
    performance: Schema.Types.Mixed,
    dimensions: Schema.Types.Mixed,
    battery: Schema.Types.Mixed,
    hydraulics: Schema.Types.Mixed,
    liftArm: Schema.Types.Mixed,
    capacities: Schema.Types.Mixed,
    safety: Schema.Types.Mixed,
    offroad: Schema.Types.Mixed,
    electronics: Schema.Types.Mixed,
}, { _id: false });

// ==================== Product Schema ====================
const ProductSchema = new Schema({
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
        enum: ['petrol', 'diesel', 'hybrid-petrol', 'hybrid-diesel', 'electric'],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    tag: String,
    price: Number,
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
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    heroImage: {
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

// ==================== About Us Section Schemas ====================
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
    },
    stats: {
        investment: String,
        beneficiaries: String,
        initiatives: String,
        partnersCount: String,
        yearsActive: String,
    }
}, { timestamps: true });

// ==================== Sister Company Schema ====================
const SisterCompanySchema = new Schema({
    slug: {
        type: String,
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
}, { timestamps: true });

// ==================== Spares Parts Schema ====================
const SparePartSchema = new Schema({
    // auto-increment can be handled via a plugin or manually in application logic
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    parts: [{
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        }
    }],
    services: [{

        serviceId: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true
        }
    }],
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
    },
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
    md_message: {
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
const CSRInitiative = mongoose.model('CSRInitiative', CSRInitiativeSchema);
const CSRHero = mongoose.model('CSRHero', CSRHeroSchema);
const SisterCompany = mongoose.model('SisterCompany', SisterCompanySchema);
const SparePart = mongoose.model('SparePart', SparePartSchema);

module.exports = {
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
    CSRInitiative,
    CSRHero,
    SisterCompany,
    SparePart,
};
