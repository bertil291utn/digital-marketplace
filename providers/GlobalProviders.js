import { createContext, useContext, useState } from 'react';
import { layerModel, layerTypeModel } from './layerModel';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [totalTokens, setTotalTokens] = useState();
  const [totalRoyalties, setTotalRoyalties] = useState();
  const [layerVariables, setLayerVariables] = useState(() =>
    Object.keys(layerModel).reduce(
      (a, b) => ({
        ...a,
        [b]: {
          [layerTypeModel.NO_TOKENS]: '',
          [layerTypeModel.PERCENTAGE]: '',
          [layerTypeModel.PRICE]: '',
        },
      }),
      {}
    )
  );

  const updateTotalTokens = (payload) => {
    setTotalTokens(payload);
  };

  const updateTotalRoyalties = (payload) => {
    setTotalRoyalties(payload);
  };

  const updateLayerVariables = (layer, type, value) => {
    setLayerVariables((prev) => {
      const _temp = { ...prev };
      _temp[layer][type] = value;
      return _temp;
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        totalTokens,
        updateTotalTokens,
        totalRoyalties,
        updateTotalRoyalties,
        layerVariables,
        updateLayerVariables,
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
