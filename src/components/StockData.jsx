import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        setStockData(response.data);
      } catch (err) {}
    };
    fetchData();
  }, [symbol]);

  console.log(stockData);
  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">Name: {stockData.name}</span>
            </div>
            <div>
              <span className="fw-bold">Country: {stockData.country}</span>
            </div>
            <div>
              <span className="fw-bold">Ticker: {stockData.ticker}</span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: {stockData.exchange}</span>
            </div>
            <div>
              <span className="fw-bold">
                Industry: {stockData.finnhubIndustry}
              </span>
            </div>
            <div>
              <span className="fw-bold">IPO: {stockData.ipo}</span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">
                Market: {stockData.marketCapitalization}
              </span>
            </div>
            <div>
              <span className="fw-bold">
                Shares Outstanding: {stockData.shareOutstanding}
              </span>
            </div>
            <div>
              <span className="fw-bold">
                Url: <a href={stockData.weburl}>{stockData.weburl}</a>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
