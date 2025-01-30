import React, { useState, useEffect } from "react";

function Carta() {
  const [menuItems, setMenuItems] = useState([]); // Menús principales
  const [loading, setLoading] = useState(true); // Estado de cargando
  const [error, setError] = useState(null); // Estado para errores
  const [platos, setPlatos] = useState({}); // Platos por menú
  const [loadingPlatos, setLoadingPlatos] = useState({}); // Estados de carga por menú
  const [openMenu, setOpenMenu] = useState(null); // Estado para controlar el acordeón

  const API_MENUS = "https://aromospacheco.somee.com/pricemenuplato"; // URL para obtener menús
  const API_PLATOS = "https://aromospacheco.somee.com/menuplato"; // URL para obtener platos

  // Cargar menús al montar el componente
  useEffect(() => {
    fetchData(API_MENUS, setMenuItems, setLoading, setError);
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

  // Cargar platos de un menú específico
  const fetchPlatos = (menu_ID) => {
    if (platos[menu_ID]) return; // Evitar recargar platos ya cargados
    setLoadingPlatos((prev) => ({ ...prev, [menu_ID]: true }));
    fetchData(
      `${API_PLATOS}/${menu_ID}`,
      (data) => setPlatos((prev) => ({ ...prev, [menu_ID]: data })),
      () => setLoadingPlatos((prev) => ({ ...prev, [menu_ID]: false })),
      setError
    );
  };

  // Función para manejar la expansión y contracción del acordeón
  const toggleAccordion = (menu_ID) => {
    setOpenMenu(openMenu === menu_ID ? null : menu_ID); // Si el menú está abierto, lo cierra; si está cerrado, lo abre
  };

  if (loading)
    return (
      <div class="spinner-border text-primary" role="status">
        {" "}
        <span class="visually-hidden">Cargando los menús...</span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3 className="position- text-center">Carta de Menús</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Menú</th>
            <th>Descripcion</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menu) => (
            <MenuRow
              key={menu.menu_ID}
              menu={menu}
              platos={platos[menu.menu_ID] || []}
              loadingPlatos={loadingPlatos[menu.menu_ID]}
              fetchPlatos={() => fetchPlatos(menu.menu_ID)}
              openMenu={openMenu}
              toggleAccordion={toggleAccordion}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Componente para renderizar una fila de menú con su acordeón
function MenuRow({
  menu,
  platos,
  loadingPlatos,
  fetchPlatos,
  openMenu,
  toggleAccordion,
}) {
  const isOpen = openMenu === menu.menu_ID;

  return (
    <>
      <tr>
        <td>{menu.menu_Nombre}</td>
        <td>{menu.menu_Descripcion}</td>
        <td>${menu.menu_Precio}</td>
      </tr>
      <tr>
        <td colSpan="4">
          <button
            className="btn btn-primary"
            onClick={() => {
              toggleAccordion(menu.menu_ID); // Expande o retrae el acordeón
              fetchPlatos(); // Carga los platos al hacer clic
            }}
          >
            {isOpen ? "Ocultar platos" : "Ver platos"}
          </button>
          <div className={`collapse ${isOpen ? "show" : ""}`}>
            {loadingPlatos ? (
              <div>Cargando platos...</div>
            ) : (
              platos.length > 0 && (
                <ul className="list-group mt-2">
                  {platos.map((plato) => (
                    <li
                      key={plato.plato_Nombre}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {plato.plato_Nombre}
                      <span className="card-text">
                        {plato.plato_Descripcion}
                      </span>
                      <img
                        src={`https://matimatize.github.io/WebAromosPacheco/images/${plato.plato_Foto}`}
                        alt="Foto del plato"
                        style={{ width: "130px", height: "100px" }}
                      />
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export default Carta;
