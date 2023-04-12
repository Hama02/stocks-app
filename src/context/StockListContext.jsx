import { createContext, useState, useContext, useEffect } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/WatchListContext";

export const StockListContext = createContext();

export const StockListContextProvider = (props) => {
  const { watchList } = useContext(WatchListContext);
  const [stock, setStock] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((ele) => {
            return finnHub.get("/quote", {
              params: {
                symbol: ele,
              },
            });
          })
        );
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        if (isMounted) {
          setStock(data);
        }
      } catch (err) {}
    };
    fetchData();

    return () => (isMounted = false);
  }, [watchList]);

  return (
    <StockListContext.Provider value={{ stock }}>
      {props.children}
    </StockListContext.Provider>
  );
};
