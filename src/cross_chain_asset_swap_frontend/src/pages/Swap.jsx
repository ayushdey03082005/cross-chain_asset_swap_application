import React from "react";
import styles from "./Swap.module.css";

export default function Swap({ isWalletConnected, swapData }) {
  // fallback zeros for not connected
  const {
    btc = 0, icp = 0, ckbtc = 0,
    usdBtc = 0, usdIcp = 0, usdCkbtc = 0,
    prices = {}, priceChanges = {},
    stats = {}
  } = swapData || {};

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Left: Swap Form & Balances */}
        <div className={styles.left}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.blueAccent}>⇄</span> Asset Swap
          </h2>
          <div className={styles.sectionDesc}>Exchange your cryptocurrencies securely with Chain-Key technology</div>
          {/* Balances */}
          <div className={styles.assetCards}>
            <BalanceCard label="Bitcoin (BTC)" value={btc} usd={usdBtc} color="#FF9900" delay={0.15} />
            <BalanceCard label="Internet Computer (ICP)" value={icp} usd={usdIcp} color="#4bb1ff" delay={0.25} />
            <BalanceCard label="Chain-Key Bitcoin (ckBTC)" value={ckbtc} usd={usdCkbtc} color="#ffe100" delay={0.35} />
          </div>
          {/* Swap Form */}
          <div className={styles.swapBox}>
            <h3 className={styles.swapTitle}><span className={styles.blueAccent}>⇄</span> Swap Assets</h3>
            <div className={styles.swapForm}>
              <div className={styles.swapRow}>
                <input className={styles.swapInput} placeholder="0.0" disabled={!isWalletConnected} />
                <span className={styles.tokenSelect}>BTC</span>
                <span className={styles.balanceText}>Balance: {btc}</span>
              </div>
              <button className={styles.switchBtn} disabled>↓</button>
              <div className={styles.swapRow}>
                <input className={styles.swapInput} placeholder="0.0" disabled={!isWalletConnected} />
                <span className={styles.tokenSelect}>ICP</span>
                <span className={styles.balanceText}>Balance: {icp}</span>
              </div>
              <button
                className={styles.swapActionBtn}
                disabled={!isWalletConnected}
              >
                Swap BTC for ICP
              </button>
              <div className={styles.secureSwapInfo}>
                ℹ️ <b>Secure Swap:</b> This transaction uses Chain-Key cryptography and threshold ECDSA for trustless cross-chain swaps.
              </div>
            </div>
          </div>
        </div>
        {/* Right: Prices & Stats */}
        <div className={styles.right}>
          <div className={styles.pricesBox}>
            <h4>Live Prices</h4>
            <PriceRow label="BTC/ICP" value={prices.btc_icp} change={priceChanges.btc_icp} />
            <PriceRow label="ICP/ckBTC" value={prices.icp_ckbtc} change={priceChanges.icp_ckbtc} />
            <PriceRow label="BTC/ckBTC" value={prices.btc_ckbtc} change={priceChanges.btc_ckbtc} />
          </div>
          <div className={styles.statsBox}>
            <h4>Market Stats</h4>
            <StatRow label="24h Volume" value={stats.volume ? `$${stats.volume}M` : "$0"} />
            <StatRow label="Total Liquidity" value={stats.liquidity ? `$${stats.liquidity}M` : "$0"} />
            <StatRow label="Active Pairs" value={stats.pairs || 0} />
            <StatRow label="Avg. Swap Time" value={stats.swapTime ? `${stats.swapTime}s` : "0s"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BalanceCard({ label, value, usd, color, delay }) {
  return (
    <div className={styles.assetCard} style={{ borderTop: `4px solid ${color}`, animationDelay: `${delay}s` }}>
      <div style={{ color, fontWeight: 700, marginBottom: 3 }}>{label}</div>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: "2rem" }}>{value}</div>
      <div style={{ color: "#b6b6b6", fontSize: "1rem" }}>≈ ${usd}</div>
    </div>
  );
}

function PriceRow({ label, value, change }) {
  return (
    <div className={styles.priceRow}>
      <span className={styles.priceLabel}>{label}</span>
      <span className={styles.priceValue}>{value}</span>
      <span className={change >= 0 ? styles.priceUp : styles.priceDown}>
        {change >= 0 ? "+" : ""}{change}%
      </span>
    </div>
  );
}
function StatRow({ label, value }) {
  return (
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}