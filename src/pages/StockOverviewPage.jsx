import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";
import trading from "../img/trading.png";

const StockOverviewPage = () => {
  return (
    <div>
      <img src={trading} alt="trading" className="logo" />
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
