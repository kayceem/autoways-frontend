# Asset URL Handling

This document explains how asset URLs from the backend are automatically transformed to full URLs in the frontend.

## Overview

The backend serves assets (images, videos, etc.) and returns their paths in API responses. The frontend automatically converts these relative paths to full URLs using the backend base URL.

**Example:**
- Backend returns: `"/assets/images/brands/eicher/eicher-hero.jpg"`
- Frontend converts to: `"http://localhost:5000/assets/images/brands/eicher/eicher-hero.jpg"`

## How It Works

### 1. Automatic Transformation (Recommended)

**All API responses are automatically transformed** - you don't need to do anything special!

When you fetch data using the API service, asset URLs are automatically converted:

```javascript
// Example: Fetching brand data
const { data } = useContentQuery();

// The images are already full URLs - no manual transformation needed!
console.log(data.brands.eicher.images[0]);
// Output: "http://localhost:5000/assets/images/brands/eicher/eicher-hero.jpg"

// Use directly in components
<img src={brandData.images[0]} alt="Brand Hero" />
```

### 2. Manual Transformation (Optional)

If you need to manually transform asset URLs (e.g., for hardcoded paths or external data), use the `useAssetUrl` hook:

```javascript
import useAssetUrl from '../hooks/useAssetUrl';

function MyComponent() {
  const { getUrl, transformUrls, assetsBaseUrl } = useAssetUrl();

  // Convert a single URL
  const imageUrl = getUrl("/assets/images/logo.png");

  // Transform an object with multiple asset fields
  const data = {
    image: "/assets/banner.jpg",
    images: ["/assets/img1.jpg", "/assets/img2.jpg"]
  };
  const transformed = transformUrls(data);

  // Get the base URL
  console.log(assetsBaseUrl); // "http://localhost:5000"

  return <img src={imageUrl} alt="Logo" />;
}
```

### 3. Direct Utility Functions

You can also import the utility functions directly:

```javascript
import { getAssetUrl, transformAssetUrls } from '../utils/assetUrl';

// Convert single URL
const fullUrl = getAssetUrl("/assets/images/hero.jpg");

// Transform object/array
const transformed = transformAssetUrls(myData);
```

## Configuration

The asset base URL is configured in `/src/config/index.js`:

```javascript
const config = {
  baseUrl: 'http://localhost:5000/api',  // API base URL
  assetsBaseUrl: 'http://localhost:5000', // Assets base URL (auto-derived)
};
```

### Environment Variables

Set the API base URL using the `VITE_APP_BASE_URL` environment variable:

```bash
# .env file
VITE_APP_BASE_URL=https://api.example.com/api
```

The assets base URL is automatically derived by removing the `/api` suffix.

## Supported Asset Fields

The following field names are automatically detected and transformed:

- `image`, `images`
- `video`, `videos`
- `thumbnail`, `thumbnails`
- `defaultImage`
- `hero_images`
- `logo`
- `icon`

## Smart URL Detection

The transformation is smart and won't break existing URLs:

- ✅ Relative paths: `/assets/image.jpg` → `http://localhost:5000/assets/image.jpg`
- ✅ Already full URLs: `http://example.com/image.jpg` → unchanged
- ✅ Data URLs: `data:image/png;base64,...` → unchanged
- ✅ Empty/null values: handled gracefully

## Examples

### Example 1: Product Images

```javascript
const ProductCard = ({ product }) => {
  // product.images is already transformed automatically!
  return (
    <div>
      <img src={product.images[0]} alt={product.name} />
      <img src={product.defaultImage} alt={product.name} />
    </div>
  );
};
```

### Example 2: Brand Hero Images

```javascript
const BrandLanding = () => {
  const { content } = useContent();
  const brandData = content.brands?.toyota;

  // brandData.images is already full URLs
  return (
    <div style={{ backgroundImage: `url(${brandData.images[0]})` }}>
      <h1>Toyota</h1>
    </div>
  );
};
```

### Example 3: Manual Transformation

```javascript
const CustomComponent = () => {
  const { getUrl } = useAssetUrl();

  // Hardcoded path that needs transformation
  const logoPath = "/assets/images/logo.png";

  return <img src={getUrl(logoPath)} alt="Logo" />;
};
```

## Technical Details

### Implementation Files

1. **Config**: `/src/config/index.js` - Base URL configuration
2. **Utilities**: `/src/utils/assetUrl.js` - Transformation functions
3. **Interceptor**: `/src/services/apiService/index.js` - Automatic transformation
4. **Hook**: `/src/hooks/useAssetUrl/index.js` - React hook for manual usage

### How Automatic Transformation Works

The Axios response interceptor automatically transforms all API responses:

```javascript
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = transformAssetUrls(response.data);
    }
    return response;
  }
);
```

This means **every API response** has its asset URLs automatically converted before reaching your components!

## Best Practices

1. **Rely on automatic transformation** - Let the interceptor handle it
2. **Only use manual methods** when working with non-API data
3. **Don't hardcode backend URLs** in components - use the utilities
4. **Environment variables** - Use `VITE_APP_BASE_URL` for different environments

## Troubleshooting

### Assets not loading?

1. Check the backend URL in `.env`: `VITE_APP_BASE_URL`
2. Verify the backend is serving assets correctly
3. Check browser console for the actual URLs being requested
4. Ensure asset paths from backend start with `/assets/`

### Need to debug?

```javascript
const { assetsBaseUrl } = useAssetUrl();
console.log('Assets base URL:', assetsBaseUrl);
console.log('Transformed URL:', getAssetUrl('/assets/test.jpg'));
```
