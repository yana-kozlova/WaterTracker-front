import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.bottle}></div>
      <button
        style={styles.button}
        onClick={() => (window.location.href = "/")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f9fc",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  bottle: {
    width: "200px",
    height: "400px",
    backgroundImage: <img src="../components/404background/Background Main Page.png" alt="" />, 
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default NotFoundPage;