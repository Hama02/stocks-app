import { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")
      ? localStorage.getItem("watchList").split(",")
      : ["GOOGL", "MSFT", "AMZN"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const addStockSymbol = (stockSym) => {
    if (watchList.indexOf(stockSym === -1)) {
      setWatchList([...watchList, stockSym]);
    }
  };

  const deleteStockSymbol = (stockSym) => {
    setWatchList(
      watchList.filter((sym) => {
        return sym !== stockSym;
      })
    );
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addStockSymbol, deleteStockSymbol }}
    >
      {props.children}
    </WatchListContext.Provider>
  );
};
