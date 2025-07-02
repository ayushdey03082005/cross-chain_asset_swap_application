import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({ isConnected, onConnectWallet, onDisconnectWallet }) {
  const { pathname } = useLocation();

  return (
    <nav className={styles.headerBar}>
      <div className={styles.logoArea}>
        <div className={styles.logo}>⇄</div>
        <span className={styles.title}>ChainSwap</span>
        <span className={styles.badge}>ICP Powered</span>
      </div>
      <div className={styles.navLinks}>
        <NavTab to="/dashboard" active={pathname === "/dashboard"}>Dashboard</NavTab>
        <NavTab to="/swap" active={pathname === "/swap"}>Swap</NavTab>
        <NavTab to="/history" active={pathname === "/history"}>History</NavTab>
      </div>
      <div className={styles.walletArea}>
        {!isConnected ? (
          <button className={styles.connectBtn} onClick={onConnectWallet}>
            Connect Wallet
          </button>
        ) : (
          <span className={styles.userProfile}>
            Wallet Connected
            <button className={styles.disconnectBtn} onClick={onDisconnectWallet}>Disconnect</button>
          </span>
        )}
      </div>
    </nav>
  );
}

function NavTab({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`${styles.navBtn} ${active ? styles.navBtnActive : ""}`}
    >
      {children}
    </Link>
  );
}