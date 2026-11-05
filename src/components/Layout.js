import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <div className="app-shell">
    <header className="site-header">
      <div className="brand">🏆 Rung chuông vàng</div>
      <NavBar />
    </header>
    <main className="container"><Outlet /></main>
    <footer className="footer">Lập trình Web · TH02</footer>
  </div>
);

export default Layout;
