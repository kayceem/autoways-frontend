# Sister Companies Landing Page

This is a modular landing page for displaying sister companies. The page has been architected with reusable components for better maintainability and scalability.

## Schema

The Sister Company schema is defined in `backend/database/schema.js` (lines 406-444):

```javascript
{
  companyId: Number,        // Unique identifier
  name: String,            // Company name
  tagline: String,         // Company tagline
  description: String,     // Company description
  logo: String,            // Logo URL
  image: String,           // Banner image URL
  category: String,        // Company category
  services: [String],      // Array of services
  contact: {
    email: String,
    phone: String,
    website: String
  },
  stats: Mixed            // Dynamic stats object
}
```

## Component Architecture

The page follows a modular architecture with the following components:

### Main Page Component
- **index.jsx** (52 lines) - Main orchestrator component
  - Manages state for category filtering
  - Fetches data from global context
  - Renders all child components

### Modular Components (`./components/`)

1. **HeroSection.jsx**
   - Displays the hero section with title, subtitle, and description
   - Props: `{ hero }`

2. **CategoryFilter.jsx**
   - Interactive category filter buttons
   - Props: `{ categories, selectedCategory, onCategoryChange }`

3. **CompanyCard.jsx**
   - Individual company card with all details
   - Displays: image, logo, category, tagline, description, services, stats, contact
   - Props: `{ company, index }`

4. **CompaniesGrid.jsx**
   - Grid layout for displaying multiple company cards
   - Props: `{ companies }`

5. **SharedValuesSection.jsx**
   - Displays shared values across all sister companies
   - Props: `{ values }`

6. **CTASection.jsx**
   - Call-to-action section with links to contact and about pages
   - Props: None

## Usage

```jsx
import SisterCompanies from './pages/SisterCompanies';

// In your router
<Route path="/sister-companies" element={<SisterCompanies />} />
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Category Filtering**: Filter companies by category
- **Animations**: Fade-in and hover effects
- **Modular Architecture**: Easy to maintain and extend
- **Reusable Components**: Components can be used independently

## Data Structure

The page expects data from `useContent()` context in the following format:

```javascript
{
  sister_companies: {
    hero: {
      title: String,
      subtitle: String,
      description: String
    },
    companies: [SisterCompanySchema],
    values: {
      title: String,
      description: String,
      items: [
        {
          id: Number,
          title: String,
          description: String
        }
      ]
    }
  }
}
```

## Benefits of Modular Architecture

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used in other pages
3. **Testability**: Easier to write unit tests for individual components
4. **Scalability**: Easy to add new features or modify existing ones
5. **Code Organization**: Clear separation of concerns
6. **Reduced Complexity**: Main page reduced from 247 lines to 52 lines
