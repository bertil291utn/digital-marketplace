import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [totalTokens, setTotalTokens] = useState();
  const [totalRoyalties, setTotalRoyalties] = useState();

  const updateTotalTokens = (payload) => {
    setTotalTokens(payload);
  };

  const updateTotalRoyalties = (payload) => {
    setTotalRoyalties(payload);
  };

  return (
    <GlobalContext.Provider
      value={{
        totalTokens,
        updateTotalTokens,
        totalRoyalties,
        updateTotalRoyalties,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
