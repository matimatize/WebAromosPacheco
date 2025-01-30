import React, { useState, useEffect } from "react";

function ABM() {
  const ApiUrl = "https://aromospacheco.somee.com/menu";

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de cargando
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    fetchData(ApiUrl, setMenuItems, setLoading, setError);
  }, []);
  // Función genérica para realizar peticiones a la API
  const fetchData = async (url, setData, setLoadingState, setErrorState) => {
    setLoadingState(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al cargar los datos");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setErrorState(err.message);
    } finally {
      setLoadingState(false);
    }
  };
  const modificarMenu = async (menu) => {
    try {
      const response = await fetch(`${ApiUrl}/${menu.menu_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      });
      if (!response.ok) throw new Error("Error al modificar el menú");
      alert("Menú modificado con éxito");
    } catch (error) {
      console.error(error.message);
      alert("No se pudo modificar el menú.");
    }
  };
  const eliminarMenu = async (menu_ID) => {
    try {
      const response = await fetch(`${ApiUrl}/${menu_ID}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el menú");
      alert("Menú eliminado con éxito");
      setMenuItems((prev) => prev.filter((menu) => menu.menu_ID !== menu_ID));
    } catch (error) {
      console.error(error.message);
      alert("No se pudo eliminar el menú.");
    }
  };
  const [nuevoMenu, setNuevoMenu] = useState({
    menu_Nombre: "",
    menu_Descripcion: "",
  });
  const agregarMenu = async () => {
    try {
      const response = await fetch(ApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoMenu),
      });
      if (!response.ok) throw new Error("Error al agregar el menú");
      const nuevo = await response.json();
      setMenuItems((prev) => [...prev, nuevo]); // Agregar el nuevo menú a la lista
      alert("Menú agregado con éxito");
      setNuevoMenu({ menu_Nombre: "", menu_Descripcion: "" }); // Limpiar el formulario
      // Volver a cargar los menús desde la API
      fetchData(ApiUrl, setMenuItems, setLoading, setError); // Recargar la lista de menús
    } catch (error) {
      console.error(error.message);
      alert("No se pudo agregar el menú.");
    }
  };
  return (
    <>
      <h3 className="position- text-center">Menús</h3>
      <div className="container text-center">
        {menuItems.map((menu) => (
          <div className="row mb-3" key={menu.menu_ID}>
            <div className="col">
              <label htmlFor={`Nombre-${menu.menu_ID}`} className="form-label">
                Nombre
              </label>
              <input
                id={`Nombre-${menu.menu_ID}`}
                className="form-control"
                type="text"
                value={menu.menu_Nombre || ""}
                onChange={(e) =>
                  setMenuItems((prev) =>
                    prev.map((item) =>
                      item.menu_ID === menu.menu_ID
                        ? { ...item, menu_Nombre: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
            <div className="col">
              <label
                htmlFor={`Descripcion-${menu.menu_ID}`}
                className="form-label"
              >
                Descripción
              </label>
              <textarea
                id={`Descripcion-${menu.menu_ID}`}
                className="form-control"
                rows="3"
                value={menu.menu_Descripcion || ""}
                onChange={(e) =>
                  setMenuItems((prev) =>
                    prev.map((item) =>
                      item.menu_ID === menu.menu_ID
                        ? { ...item, menu_Descripcion: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary  position-relative top-50 start 50"
                onClick={() => modificarMenu(menu)}
              >
                Modificar
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-danger position-relative top-50 start 50"
                onClick={() => eliminarMenu(menu.menu_ID)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container text-center">
        <h3>Agregar Menú</h3>
        <div className="col">
          <label htmlFor={`Nombre`} className="form-label">
            Nombre
          </label>
          <input
            key={menuItems.menu_ID}
            id="Nombre"
            className="form-control"
            type="text"
            value={nuevoMenu.menu_Nombre}
            onChange={(e) =>
              setNuevoMenu({ ...nuevoMenu, menu_Nombre: e.target.value })
            }
          />
        </div>
        <div className="col">
          <label htmlFor={`Descripcion`} className="form-label">
            Descripción
          </label>
          <textarea
            key={menuItems.menu_ID}
            className="form-control"
            id="Descripcion"
            rows="3"
            value={nuevoMenu.menu_Descripcion}
            onChange={(e) =>
              setNuevoMenu({ ...nuevoMenu, menu_Descripcion: e.target.value })
            }
          />
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-success m-3"
            onClick={agregarMenu}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
}

export default ABM;
