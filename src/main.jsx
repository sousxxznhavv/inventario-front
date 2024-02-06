import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Forms/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Activo from "./Forms/activo";
import Asignacion from "./Forms/asignacion";
import Recepcion from "./Forms/recepcion";
import "./index.css";
import AreaTrabajo from "./Tablas/areaTrabajo";
import Empresa from "./Tablas/empresa";
import Empleado from "./Tablas/empleado";
import EstadoActivo from "./Tablas/estadoActivo";
import Local from "./Tablas/local";
import Marca from "./Tablas/marca";
import Modelo from "./Tablas/modelo";
import ModeloHomologado from "./Tablas/modeloHomologado";
import Monedas from "./Tablas/moneda";
import Proveedores from "./Tablas/proveedores";
import TipoActivo from "./Tablas/tipoActivo";
import Consulta from "./Tablas/consulta";
import AreaTrabajoForm from "./Forms/areaTrabajoForm";
import EmpleadoForm from "./Forms/empleadoForm";
import EmpresaForm from "./Forms/empresaForm";
import EstadoActivoForm from "./Forms/estadoActivoForm";
import LocalForm from "./Forms/localForm";
import MarcaForm from "./Forms/marcaForm";
import ModeloForm from "./Forms/modeloForm";
import MonedaForm from "./Forms/monedaForm";
import ProveedorForm from "./Forms/proveedorForm";
import TipoActivoForm from "./Forms/tipoActivoForm";
import ModeloHomologadoForm from "./Forms/modeloHomologadoForm";
import TipoDocumentoForm from "./Forms/tipoDocumentoForm";
import TipoDocumento from "./Tablas/tipoDocumento";
import MotivoForm from "./Forms/motivoForm";
import Motivo from "./Tablas/motivo";
import Usuario from "./Tablas/usuario";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./Context";
import EditarActivo from "./Forms/editarActivo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="325112294506-ut4ehasnfdn7gpss68tfoah09m93fgfn.apps.googleusercontent.com">
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/activo" element={<Activo />} />
            <Route path="/asignacion" element={<Asignacion />} />
            <Route path="/recepcion" element={<Recepcion />} />
            <Route path="/areas" element={<AreaTrabajo />} />
            <Route path="/empleados" element={<Empleado />} />
            <Route path="/empresas" element={<Empresa />} />
            <Route path="/estados" element={<EstadoActivo />} />
            <Route path="/locales" element={<Local />} />
            <Route path="/marcas" element={<Marca />} />
            <Route path="/modelos" element={<Modelo />} />
            <Route path="/modelo-homologado" element={<ModeloHomologado />} />
            <Route path="/monedas" element={<Monedas />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/tipo-activo" element={<TipoActivo />} />
            <Route path="/area-trabajo" element={<AreaTrabajoForm />} />
            <Route path="/empleado-nuevo" element={<EmpleadoForm />} />
            <Route path="/empresa-nuevo" element={<EmpresaForm />} />
            <Route path="/estado-activo" element={<EstadoActivoForm />} />
            <Route path="/local-nuevo" element={<LocalForm />} />
            <Route path="/marca-nuevo" element={<MarcaForm />} />
            <Route path="/modelo-nuevo" element={<ModeloForm />} />
            <Route path="/moneda-nuevo" element={<MonedaForm />} />
            <Route path="/motivo-nuevo" element={<MotivoForm />} />
            <Route path="/motivo" element={<Motivo />} />
            <Route path="/proveedor-nuevo" element={<ProveedorForm />} />
            <Route path="/tipo-activo-nuevo" element={<TipoActivoForm />} />
            <Route
              path="/modelo-homologado-nuevo"
              element={<ModeloHomologadoForm />}
            />
            <Route path="/tipo-documento" element={<TipoDocumento />} />
            <Route
              path="/tipo-documento-nuevo"
              element={<TipoDocumentoForm />}
            />
            <Route path="/consulta" element={<Consulta />} />
            <Route path="/usuarios" element={<Usuario />} />
            <Route
              path="/editar-activo/:id" // :id es un parámetro dinámico que identifica el activo a editar
              element={<EditarActivo />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
