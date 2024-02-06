import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import { useAuth } from "../Context";

function EmpleadoForm() {
  const [empresa, setEmpresa] = useState();
  const [local, setLocal] = useState();
  const [tipoDocumento, setTipoDocumento] = useState();
  const [empleado, setEmpleado] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [localSeleccionado, setLocalSeleccionado] = useState(null);
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] =
    useState(null);
  const navigate = useNavigate();

  const fetchLocal = async (IdEmpresa) => {
    const url = "http://localhost:3000/api/local/" + IdEmpresa;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setLocal(data);
    } catch (error) {
      console.error("Error al cargar los locales", error);
    }
  };
  const Auth = useAuth();

  useEffect(() => {
    // Llamada a la API para obtener empresas
    const fetchEmpresa = async () => {
      const url = "http://localhost:3000/api/empresas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEmpresa(data);
      } catch (error) {
        console.error("Error al cargar los datos de tipos de activos", error);
      }
    };

    // Llamada a la API para obtener marcas

    // Llamada a la API para obtener tipoDocumentos
    const fetchTipoDoc = async () => {
      const url = "http://localhost:3000/api/tipoDocumentos";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTipoDocumento(data);
      } catch (error) {
        console.error("Error al cargar los tipos de documentos", error);
      }
    };

    // Realizar las llamadas a las APIs
    fetchEmpresa();
    fetchTipoDoc();
  }, []);
  if (Auth.isAuthenticated == false) {
    window.location.href = "/";
  }
  const guardarEmpleado = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/empleado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdEmpresa: empresaSeleccionada.IdEmpresa,
          IdLocal: localSeleccionado.IdLocal,
          IdTipoDocumento: tipoDocumentoSeleccionado.IdTipoDocumento,
          num_documento: numDocumento,
          nombre: empleado,
          nombreUsuario: nombreUsuario,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
      Swal.fire({
        title: "Empleado guardado",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      Swal.fire({
        title: "Error al guardar",
        text: error.message,
        icon: "error",
      });
    } finally {
      navigate("/empleados");
    }
  };
  return (
    <>
      <Header />
      <Navbar />
      <Container
        fixed
        sx={{
          border: "1px solid #D5D5D5",
          bgcolor: "#ffffff",
          borderRadius: "16px",
        }}
      >
        <Box sx={{ textAlign: "center", padding: "10px" }}>
          <h2>EMPLEADOS</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarEmpleado}>
              GUARDAR
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "10px",
            padding: " 0px 30px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>EMPRESA*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={empresa}
              getOptionLabel={(option) => option.descrp}
              value={empresaSeleccionada}
              onChange={async (event, newValue) => {
                await fetchLocal(newValue.IdEmpresa);
                setEmpresaSeleccionada(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>LOCAL*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={local}
              value={localSeleccionado}
              onChange={(event, newValue) => setLocalSeleccionado(newValue)}
              getOptionLabel={(option) => option.descrp}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>TIPO DE DOCUMENTO*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={tipoDocumento}
              getOptionLabel={(option) => option.descrp}
              value={tipoDocumentoSeleccionado}
              onChange={(event, newValue) =>
                setTipoDocumentoSeleccionado(newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>NÚMERO DE DOCUMENTO*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={numDocumento}
              onChange={(e) => setNumDocumento(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>NOMBRES Y APELLIDOS*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={empleado}
              onChange={(e) => setEmpleado(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>NOMBRE DE USUARIO*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0px",
          }}
        >
          <Button variant="contained" sx={{ bgcolor: "green" }}>
            <Link
              to="/empleados"
              style={{ color: "white", textDecoration: "none" }}
            >
              VOLVER
            </Link>
          </Button>
          <Button variant="contained" sx={{ bgcolor: "red" }}>
            LIMPIAR DATOS
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default EmpleadoForm;
