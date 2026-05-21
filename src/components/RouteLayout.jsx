import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function RouteLayout() {
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
};

export default RouteLayout;