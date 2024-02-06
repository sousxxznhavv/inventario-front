import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <>
      <div className="options" style={{ marginTop: "25px" }}>
        <ul className="options-list">
          <li>
            <Link to="/consulta">CONSULTAS</Link>
          </li>
          <li>
            <Link to="/activo">CREAR ACTIVO</Link>
          </li>
          <li>
            <Link to="/asignacion">ASIGNAR ACTIVO</Link>
          </li>
          <li>
            <Link to="/recepcion">RECEPCIÓN DE ACTIVO</Link>
          </li>

          <li className="dropdown">
            <a href="#">MANTENIMIENTO DE TABLAS</a>
            <div className="dropdown-content">
              <Link to="/areas">Áreas de Trabajo</Link>
              <Link to="/empleados">Empleado</Link>
              <Link to="/empresas">Empresas</Link>
              <Link to="/estados">Estado de Activo</Link>
              <Link to="/locales">Locales</Link>
              <Link to="/marcas">Marcas</Link>
              <Link to="/modelos">Modelos</Link>
              <Link to="/modelo-homologado">Modelos Homologados</Link>
              <Link to="/monedas">Monedas</Link>
              <Link to="/motivo">Motivos</Link>
              <Link to="/proveedores">Proveedores</Link>
              <Link to="/tipo-activo">Tipo de Activo</Link>
              <Link to="/tipo-documento">Tipo de Documento</Link>
            </div>
          </li>
          <li>
            <Link to="/usuarios">USUARIOS</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
