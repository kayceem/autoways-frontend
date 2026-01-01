// Vike-compatible Navigate component (isomorphic)
// Replaces react-router-dom's Navigate for redirects
import { useEffect } from 'react';

export function Navigate({ to, replace = false }) {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      if (replace) {
        window.location.replace(to);
      } else {
        window.location.href = to;
      }
    }
  }, [to, replace]);

  return null;
}

export default Navigate;
