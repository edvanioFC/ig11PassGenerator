import React from "react";
import Navbar from "./components/Navbar";
import PasswordGenerator from "./components/PasswordGenerator";
import Footer from "./components/Footer";
import "./assets/styles/byPages/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <PasswordGenerator />
      </div>
      <Footer />
    </div>
  );
};

export default App;
