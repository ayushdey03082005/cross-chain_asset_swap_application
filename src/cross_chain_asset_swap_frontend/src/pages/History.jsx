import React from "react";
import styles from "./History.module.css";

export default function History({ isWalletConnected, historyData }) {
  const {
    swaps = 0,
    successRate = 0,
    totalVolume = 0,
    avgSwapTime = 0
  } = historyData || {};

  return (
    <div className={styles.page}>
      <h2 className={styles.sectionTitle}><span className={styles.blueAccent}>⏱️</span> Transaction History</h2>
      <div className={styles.sectionDesc}>Track all your cross-chain swaps and their status</div>
      <div className={styles.statsCards}>
        <StatCard label="Total Swaps" value={swaps} sub={isWalletConnected ? "+3 this week" : ""} />
        <StatCard label="Success Rate" value={successRate ? `${successRate}%` : "0%"} sub={isWalletConnected ? "+0.2% this month" : ""} />
        <StatCard label="Total Volume" value={`$${totalVolume}`} sub={isWalletConnected ? "+15% this month" : ""} />
        <StatCard label="Avg. Swap Time" value={avgSwapTime ? `${avgSwapTime}s` : "0s"} sub={isWalletConnected ? "Consistent" : ""} />
      </div>
      <div className={styles.filterBox}>
        <input className={styles.searchInput} placeholder="Search by transaction ID, token, or amount..." disabled={!isWalletConnected} />
        <button className={styles.whiteBtn} disabled={!isWalletConnected}>All</button>
        <button className={styles.filterBtn} disabled={!isWalletConnected}>More Filters</button>
        <button className={styles.exportBtn} disabled={!isWalletConnected}>Export</button>
      </div>
      <div className={styles.historyPlaceholder}>
        {isWalletConnected
          ? "(Swap history would appear here after backend integration)"
          : "Connect your wallet to see your swap history."}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statMain}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statSub}>{sub}</div>
    </div>
  );
}