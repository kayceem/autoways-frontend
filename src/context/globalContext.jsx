import { createContext, useContext } from "react";
import useContentQuery from "../hooks/useContentQuery";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const { data, isLoading, isError, refetch } = useContentQuery();

  return (
    <ContentContext.Provider value={{ content: data, isLoading, isError, refetch }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
