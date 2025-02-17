import { useEffect, useState } from "react";
import React from "react";

function AsignPlato() {
  const [menus, setMenus] = useState([]); // Lista de menús desde la API
  const [selectedMenu, setSelectedMenu] = useState(null); // Menú seleccionado
  const [assignedPlates, setAssignedPlates] = useState([]); // Platos asignados
  const [unassignedPlates, setUnassignedPlates] = useState([]); // Platos no asignados
  const [loading, setLoading] = useState(false); // Estado de carga
  //TRaemos los menu
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("https://aromospacheco.somee.com/menu");
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error("Error al cargar los menús:", error);
      }
    };

    fetchMenus();
  }, []);
  // seteamos la seleccion del menu
  const handleMenuChange = async (menu) => {
    setSelectedMenu(menu);
    setLoading(true);
    // traemos los menu asignados y no asignados desde la api y los guardamos en las costantes
    try {
      const [assignedResponse, unassignedResponse] = await Promise.all([
        fetch(`https://aromospacheco.somee.com/menuplato/${menu.menu_ID}`),
        fetch(`https://aromospacheco.somee.com/nomenuplato/${menu.menu_ID}`),
      ]);

      const assignedData = await assignedResponse.json();
      const unassignedData = await unassignedResponse.json();

      setAssignedPlates(assignedData);
      setUnassignedPlates(unassignedData);
    } catch (error) {
      console.error("Error al cargar los platos:", error);
    } finally {
      setLoading(false);
    }
  };
  //funcion para asignar un plato al menu seleccionado
  const assignPlate = async (plate) => {
    try {
      await fetch(
        `https://aromospacheco.somee.com/menuplato/${selectedMenu.menu_ID}/${plate.plato_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plato_ID: plate.plato_ID }),
        }
      );

      // Actualiza las listas localmente
      setAssignedPlates((prev) => [...prev, plate]);
      setUnassignedPlates((prev) =>
        prev.filter((p) => p.plato_ID !== plate.plato_ID)
      );
    } catch (error) {
      console.error("Error al asignar el plato:", error);
    }
  };

  //funcion para desasignar platos
  const unassignPlate = async (plate) => {
    try {
      await fetch(
        `https://aromospacheco.somee.com/menuplato/${plate.plato_ID}/${selectedMenu.menu_ID}`,
        {
          method: "DELETE",
        }
      );

      // Actualiza las listas localmente
      setUnassignedPlates((prev) => [...prev, plate]);
      setAssignedPlates((prev) =>
        prev.filter((p) => p.plato_ID !== plate.plato_ID)
      );
    } catch (error) {
      console.error("Error al desasignar el plato:", error);
    }
  };
  return (
    <div>
      <h3 className="position- text-center">Asignación de platos a un menú</h3>
      <select //Selector de menu
        className="form-select"
        value={selectedMenu?.menu_ID || ""}
        onChange={(e) => {
          const menu = menus.find(
            (m) => m.menu_ID === parseInt(e.target.value)
          );
          handleMenuChange(menu);
        }}
      >
        <option value="">Selecciona un menú</option>
        {menus.map((menu) => (
          <option key={menu.menu_ID} value={menu.menu_ID}>
            {menu.menu_Nombre}
          </option>
        ))}
      </select>
      <div className="card">
        <div className="card-body">
          <div className="row">
            {/* Lista de platos no asignados */}
            <div className="col">
              <h5>Platos no asignados</h5>
              <ul className="list-group">
                {unassignedPlates.map((plate) => (
                  <li key={plate.plato_ID} className="list-group-item">
                    {plate.plato_Nombre}
                    <button
                      className="btn btn-success btn-sm ms-2"
                      onClick={() => assignPlate(plate)}
                    >
                      Asignar
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lista de platos asignados */}
            <div className="col">
              <h5>Platos asignados</h5>
              <ul className="list-group">
                {assignedPlates.map((plate) => (
                  <li key={plate.plato_ID} className="list-group-item">
                    {plate.plato_Nombre}
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => unassignPlate(plate)}
                    >
                      Desasignar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsignPlato;
