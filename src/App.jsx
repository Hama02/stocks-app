import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";
import { WatchListContextProvider } from "./context/WatchListContext";
import { StockListContextProvider } from "./context/StockListContext";

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <StockListContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StockOverviewPage />} />
              <Route path="/detail/:symbol" element={<StockDetailPage />} />
            </Routes>
          </BrowserRouter>
        </StockListContextProvider>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
