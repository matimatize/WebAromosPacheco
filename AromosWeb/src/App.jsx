import React, { useState } from "react";
import Nav from "./Components/Nav/Nav";
import Carta from "./Components/Carta/Carta";
import ABMMenues from "./Components/ABM/ABM";
import AsignarPlatos from "./Components/AsignPlato/AsignPlato";
import "./Validation.json";

function App() {
  const [activeTab, setActiveTab] = useState("Carta"); // Controla el tab activo

  const renderContent = () => {
    switch (activeTab) {
      case "Carta":
        return <Carta />;
      case "ABM Menues":
        return <ABMMenues />;
      case "Asignar Platos":
        return <AsignarPlatos />;
      default:
        return <div>Tab no encontrado</div>;
    }
  };

  return (
    <>
      {/* Titulo de header */}
      <div className="p-3 mb-2 bg-primary text-white position-relative">
        <img
          src="https://matimatize.github.io/WebAromosPacheco/images/tupacAmaru2.jpg"
          className="rounded psoition-absolute top-0 float-start p-2"
          alt="ISFDYP114"
          width="10%"
        />
        <img
          src="https://matimatize.github.io/WebAromosPacheco/Favicon/android-chrome-192x192.png"
          className="rounded-circle mx-auto d-block e-4"
          alt="Aromos"
          width="10%"
        />

        <h1 className=" position-relative text-center">Web Aromos</h1>
      </div>

      <div className="text-bg-secondary p-3">
        <Nav activeTab={activeTab} setActiveTab={setActiveTab} />{" "}
        {/* Pasamos props */}
        <div className="container mt-4">{renderContent()}</div>{" "}
        {/* Renderiza el contenido */}
      </div>
    </>
  );
}

export default App;
