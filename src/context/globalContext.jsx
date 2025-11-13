import { createContext, useContext } from "react";
import useContentQuery from "../hooks/useContentQuery";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const { data, isLoading, isError, refetch } = useContentQuery();
    const value = {
    content: data ?? {},
    isLoading,
    isError,
    refetch,
  };
  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
