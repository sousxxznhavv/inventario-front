import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import "./asignacion.css";
import { useEffect, useState } from "react";
import Header from "../Header";
import { useAuth } from "../Context";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Asignacion() {
  const navigate = useNavigate();
  const [numSerial, setNumSerial] = useState([]);
  const [tipoActivo, setTipoActivo] = useState("");
  const [dataModelo, setDataModelo] = useState("");
  const [empleado, setEmpleado] = useState([]);
  const [areaTrabajo, setAreaTrabajo] = useState([]);
  const [empresa, setEmpresa] = useState("");
  const [local, setLocal] = useState("");
  const [GMDCPU, setGMDCPU] = useState("");
  const [hostname, setHostname] = useState("");
  const [sistemaOperativo, setSistemaOperativo] = useState("");

  const [numSerialSeleccionado, setNumSerialSeleccionado] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [areaTrabajoSeleccionado, setAreaTrabajoSeleccionado] = useState(null);

  const [idTipoActivo, setIdTipoActivo] = useState("");
  const [errores, setErrores] = useState({
    GMDCPU: false,
    hostname: false,
  });
  const Auth = useAuth();

  const limpiarCampos = () => {
    setNumSerialSeleccionado(null);
    setTipoActivo("");
    setDataModelo("");
    setGMDCPU("");
    setHostname("");
    setSistemaOperativo("");
    setEmpleadoSeleccionado(null);
    setLocal("");
    setAreaTrabajoSeleccionado(null);
    setEmpresa("");
  };
  const fetchTipoActivo = async (NumSerial) => {
    console.log(numSerial);
    const url = "http://localhost:3000/api/activos/" + NumSerial;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data[0]);
      setTipoActivo(data[0].modeloHomologado?.tipo.descrp);
      setDataModelo(
        data[0].modeloHomologado?.marca.descrp +
          " - " +
          data[0].modeloHomologado?.modelo.descrp
      );
      setIdTipoActivo(data[0].IdActivo);
    } catch (error) {
      console.error("Error al cargar los datos de activos", error);
    }
  };

  //Fetch para obtener los datos de la asignación
  const fetchAsignacion = async (numSerial) => {
    const url = "http://localhost:3000/api/asignacion/" + numSerial;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data[data.length - 1]);
    } catch (error) {
      console.error("Error al cargar la información", error);
    }
  };

  const fetchEmpresaLocal = async (nombreUsuario) => {
    const url = "http://localhost:3000/api/empleado/" + nombreUsuario;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setEmpresa(data[0].empresa.descrp);
      setLocal(data[0].local.descrp);
    } catch (error) {
      console.error("Error al cargar los datos de activos", error);
    }
  };

  const handleNumSerialChange = (event, newValue) => {
    setNumSerialSeleccionado(newValue);
    console.log(newValue);
    if (newValue) {
      fetchTipoActivo(newValue.num_serial);
      fetchAsignacion(newValue.num_serial);
    } else {
      // Puedes manejar el caso cuando se deselecciona un valor si es necesario
      setTipoActivo(null);
      setDataModelo(null);
    }
  };

  const handleEmpleado = (event, newValue) => {
    setEmpleadoSeleccionado(newValue);
    if (newValue) {
      fetchEmpresaLocal(newValue.nombreUsuario);
    } else {
      // Puedes manejar el caso cuando se deselecciona un valor si es necesario
      setLocal(null);
      setEmpresa(null);
    }
  };

  const fetchEmpleados = async () => {
    const url = "http://localhost:3000/api/empleado";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setEmpleado(data);
    } catch (error) {
      console.error("Error al cargar los datos de empleado", error);
    }
  };

  useEffect(() => {
    const fetchNumSerial = async () => {
      const url = "http://localhost:3000/api/activos";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNumSerial(data);
      } catch (error) {
        console.error("Error al cargar los datos de tipos de activos", error);
      }
    };

    const fetchAreas = async () => {
      const url = "http://localhost:3000/api/areas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAreaTrabajo(data);
      } catch (error) {
        console.error("Error al cargar los datos de areas", error);
      }
    };
    fetchEmpleados();
    fetchNumSerial();
    fetchAreas();
  }, []);

  if (Auth.isAuthenticated == false) {
    window.location.href = "/";
  }

  const guardarAsignacion = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/asignacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          IdArea: +areaTrabajoSeleccionado.IdArea,
          gmd_cpu: GMDCPU,
          hostname: hostname,
          sistema_operativo: sistemaOperativo,
          IdActivo: +idTipoActivo,
          IdEmpleado: +empleadoSeleccionado.IdEmpleado,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }

      Swal.fire({
        title: "Activo asignado",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      Swal.fire({
        title: "Error al guardar",
        text: "Se deben de llenar los campos vacíos",
        icon: "error",
      });
    } finally {
      navigate("/consulta");
      // setNumSerialSeleccionado(null);
      // setTipoActivo("");
      // setDataModelo("");
      // setGMDCPU("");
      // setHostname("");
      // setSistemaOperativo("");
      // setEmpleadoSeleccionado(null);
      // setLocal("");
      // setAreaTrabajoSeleccionado(null);
      // setEmpresa("");
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px",
            }}
          >
            <p></p>
            <h2>ASIGNAR ACTIVO</h2>
            <Button variant="contained" onClick={guardarAsignacion}>
              ASIGNAR ACTIVO
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
            <label>Número de Serial*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={numSerial}
              value={numSerialSeleccionado}
              onChange={handleNumSerialChange}
              getOptionLabel={(option) => option.num_serial}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Tipo de Activo*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                readOnly: true,
              }}
              value={tipoActivo ? tipoActivo : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Marca - Modelo*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                readOnly: true,
              }}
              value={dataModelo ? dataModelo : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Código de Inventario*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={GMDCPU}
              onChange={(e) => setGMDCPU(e.target.value)}
              error={errores.GMDCPU}
              helperText={
                errores.GMDCPU ? "Número de Serial es obligatorio" : ""
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Hostname*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Sistema Operativo</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={sistemaOperativo}
              onChange={(e) => setSistemaOperativo(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Usuario*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={empleado}
              getOptionLabel={(option) => option.nombreUsuario}
              value={empleadoSeleccionado}
              onChange={handleEmpleado}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Local*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                readOnly: true,
              }}
              value={local ? local : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Área de Trabajo*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={areaTrabajo}
              getOptionLabel={(option) => option.descrp}
              value={areaTrabajoSeleccionado}
              onChange={(event, newValue) =>
                setAreaTrabajoSeleccionado(newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Empresa*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                readOnly: true,
              }}
              value={empresa ? empresa : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Último usuario</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "right",
            padding: "10px 0px",
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "red" }}
            onClick={limpiarCampos}
          >
            LIMPIAR DATOS
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Asignacion;
