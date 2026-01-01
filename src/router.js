// Router compatibility layer for Vike
// This provides react-router-dom-like APIs using Vike's routing
// The vite alias redirects all 'react-router-dom' imports here

export { Link } from './components/common/Link.jsx';
export { Navigate } from './components/common/Navigate.jsx';
export { useParams } from './hooks/useParams.js';

// useLocation hook
export function useLocation() {
  if (typeof window !== 'undefined') {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: window.history.state,
    };
  }
  return { pathname: '/', search: '', hash: '', state: null };
}

// useNavigate hook
export function useNavigate() {
  return (to, options = {}) => {
    if (typeof window !== 'undefined') {
      if (options.replace) {
        window.location.replace(to);
      } else {
        window.location.href = to;
      }
    }
  };
}

// useSearchParams hook
export function useSearchParams() {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const setSearchParams = (params) => {
      const newParams = new URLSearchParams(params);
      window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
    };
    return [searchParams, setSearchParams];
  }
  return [new URLSearchParams(), () => {}];
}

// BrowserRouter - no-op wrapper for compatibility
export function BrowserRouter({ children }) {
  return children;
}

// Routes & Route - no-op for compatibility (Vike handles routing)
export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}

// Outlet - placeholder for nested routes
export function Outlet() {
  return null;
}
