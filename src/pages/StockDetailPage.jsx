import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  const formatData = (data) => {
    return data.t.map((ele, index) => {
      return {
        x: ele * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 0) {
        oneDay = currentTime - 2 * 60 * 60 * 24;
      } else if (date.getDay() === 1) {
        oneDay = currentTime - 3 * 60 * 60 * 24;
      } else {
        oneDay = currentTime - 60 * 60 * 24;
      }
      const oneWeek = currentTime - 7 * 60 * 60 * 24;
      const oneYear = currentTime - 365 * 60 * 60 * 24;

      const responses = await Promise.all([
        finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneDay,
            to: currentTime,
            resolution: 30,
          },
        }),
        finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneWeek,
            to: currentTime,
            resolution: 60,
          },
        }),
        finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneYear,
            to: currentTime,
            resolution: "W",
          },
        }),
      ]);
      setChartData({
        day: formatData(responses[0].data),
        week: formatData(responses[1].data),
        year: formatData(responses[2].data),
      });
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};

export default StockDetailPage;
