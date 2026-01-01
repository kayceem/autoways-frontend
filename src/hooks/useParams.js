// Vike-compatible useParams hook (isomorphic)
import { usePageContext } from 'vike-react/usePageContext';

export function useParams() {
  try {
    const pageContext = usePageContext();
    return pageContext?.routeParams || {};
  } catch {
    // Fallback for SSR or when context not available
    return {};
  }
}

export default useParams;
