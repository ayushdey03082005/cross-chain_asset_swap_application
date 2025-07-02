import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Swap from "./pages/Swap";
import History from "./pages/History";
import styles from "./App.module.css";

// Simulate backend wallet connection and values fetch
export default function App() {
  // In real app, these states are set by backend/wallet logic
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [swapData, setSwapData] = useState({
    btc: 0,
    icp: 0,
    ckbtc: 0,
    usdBtc: 0,
    usdIcp: 0,
    usdCkbtc: 0,
    prices: { btc_icp: 0, icp_ckbtc: 0, btc_ckbtc: 0 },
    priceChanges: { btc_icp: 0, icp_ckbtc: 0, btc_ckbtc: 0 },
    stats: { volume: 0, liquidity: 0, pairs: 0, swapTime: 0 }
  });
  const [historyData, setHistoryData] = useState({
    swaps: 0,
    successRate: 0,
    totalVolume: 0,
    avgSwapTime: 0
  });

  // Simulate backend effect: update all values when wallet connects
  useEffect(() => {
    if (isWalletConnected) {
      setSwapData({
        btc: 0.00234567,
        icp: 125.45,
        ckbtc: 0.00198432,
        usdBtc: 1234.56,
        usdIcp: 987.65,
        usdCkbtc: 1045.32,
        prices: { btc_icp: 6250.45, icp_ckbtc: 0.00016, btc_ckbtc: 1.005 },
        priceChanges: { btc_icp: 2.34, icp_ckbtc: -0.12, btc_ckbtc: 0.05 },
        stats: { volume: 2.4, liquidity: 15.7, pairs: 12, swapTime: 2.3 }
      });
      setHistoryData({
        swaps: 47,
        successRate: 98.9,
        totalVolume: 12450,
        avgSwapTime: 2.3
      });
    } else {
      setSwapData({
        btc: 0,
        icp: 0,
        ckbtc: 0,
        usdBtc: 0,
        usdIcp: 0,
        usdCkbtc: 0,
        prices: { btc_icp: 0, icp_ckbtc: 0, btc_ckbtc: 0 },
        priceChanges: { btc_icp: 0, icp_ckbtc: 0, btc_ckbtc: 0 },
        stats: { volume: 0, liquidity: 0, pairs: 0, swapTime: 0 }
      });
      setHistoryData({
        swaps: 0,
        successRate: 0,
        totalVolume: 0,
        avgSwapTime: 0
      });
    }
  }, [isWalletConnected]);

  return (
    <Router>
      <div className={styles.background}>
        <Header
          isConnected={isWalletConnected}
          onConnectWallet={() => setIsWalletConnected(true)}
          onDisconnectWallet={() => setIsWalletConnected(false)}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/swap"
            element={<Swap isWalletConnected={isWalletConnected} swapData={swapData} />}
          />
          <Route
            path="/history"
            element={<History isWalletConnected={isWalletConnected} historyData={historyData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}