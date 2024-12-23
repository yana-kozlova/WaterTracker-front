import React from "react";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      
      <div style={styles.background}></div>

      
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <p style={styles.message}>Це помилка. Сторінку не знайдено.</p>
        <a href="/" style={styles.link}>
          Повернутися на головну
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: <img src="../components/404background/BackgroundMainPage.png" alt="" />, 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    zIndex: -1, 
  },
  content: {
    textAlign: "center",
    color: "#fff",
    textShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
  },
  errorCode: {
    fontSize: "150px", 
    fontWeight: "bold",
    margin: 0,
  },
  message: {
    fontSize: "24px",
    margin: "10px 0 20px",
  },
  link: {
    fontSize: "18px",
    textDecoration: "none",
    color: "#007bff",
    backgroundColor: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    cursor: "pointer",
  },
};

export default NotFoundPage;
