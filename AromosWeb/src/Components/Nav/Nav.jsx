import React, { useState, useEffect } from "react";

function Nav({ activeTab, setActiveTab }) {
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Cambia el tab activo
  };

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "Carta" ? "active" : ""}`}
          href="#"
          onClick={() => handleTabClick("Carta")}
        >
          Carta de menús
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "ABM Menues" ? "active" : ""}`}
          href="#"
          onClick={() => handleTabClick("ABM Menues")}
        >
          ABM Menús
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${
            activeTab === "Asignar Platos" ? "active" : ""
          }`}
          href="#"
          onClick={() => handleTabClick("Asignar Platos")}
        >
          Asignar Platos a un Menú
        </a>
      </li>
    </ul>
  );
}

export default Nav;
