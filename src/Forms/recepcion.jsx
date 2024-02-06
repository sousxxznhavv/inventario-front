import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import Header from "../Header";
import { useAuth } from "../Context";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Recepcion() {
  const navigate = useNavigate();
  const [numSerial, setNumSerial] = useState(null);
  const [tipoActivo, setTipoActivo] = useState(null);
  const [numSerialSeleccionado, setNumSerialSeleccionado] = useState(null);
  const [motivoSeleccionado, setMotivoSeleccionado] = useState(null);
  const [dataModelo, setDataModelo] = useState("");
  const [numModelo, setNumModelo] = useState("");
  const [tipoCPU, setTipoCPU] = useState("");
  const [modeloCPU, setModeloCPU] = useState("");
  const [ghz, SetGhz] = useState("");
  const [hdd, setHdd] = useState("");
  const [tipoHdd, setTipoHdd] = useState("");
  const [ram, setRam] = useState("");
  const [motivo, setMotivo] = useState("");
  const [activoElegido, setActivoElegido] = useState("");
  const [motivoElegido, setMotivoElegido] = useState("");
  const [mostrarCasilla1, setMostrarCasilla1] = useState("");
  const [mostrarCasilla2, setMostrarCasilla2] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [estado, setEstado] = useState("");
  const [estadoElegido, setEstadoElegido] = useState("");
  const [status, setStatus] = useState(null);

  const Auth = useAuth();

  const fetchTipoActivo = async (NumSerial) => {
    const url = "http://localhost:3000/api/activos/asignados/" + NumSerial;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTipoActivo(data[0].modeloHomologado.tipo.descrp);
      setDataModelo(
        data[0].modeloHomologado.marca.descrp +
          " - " +
          data[0].modeloHomologado.modelo.descrp
      );
      setNumModelo(data[0].modeloHomologado.modelo.num_modelo);
      setTipoCPU(data[0].modeloHomologado.tipo_cpu);
      setModeloCPU(data[0].modeloHomologado.modelo_cpu);
      SetGhz(data[0].modeloHomologado.ghz);
      setHdd(data[0].modeloHomologado.hdd);
      setTipoHdd(data[0].modeloHomologado.tipo_hdd);
      setRam(data[0].modeloHomologado.ram);
      setStatus(data[0].estado.descrp);
      console.log(status);
    } catch (error) {
      console.error("Error al cargar los datos de activos", error);
    }
  };

  const handleNumSerialChange = (event, newValue) => {
    setNumSerialSeleccionado(newValue);
    if (newValue) {
      fetchTipoActivo(newValue.num_serial);
      setActivoElegido(newValue.IdActivo);
    } else {
      // Puedes manejar el caso cuando se deselecciona un valor si es necesario
      setTipoActivo(null);
      setDataModelo(null);
      setNumModelo(null);
      setTipoCPU(null);
      setModeloCPU(null);
      SetGhz(null);
      setHdd(null);
      setTipoHdd(null);
      setRam(null);
    }
  };

  const handleMotivoChange = (event, newValue) => {
    setMotivoSeleccionado(newValue);
    if (newValue) {
      setMotivoElegido(newValue.IdMotivo);
      setMostrarCasilla1(newValue.IdMotivo == 1);
      setMostrarCasilla2(newValue.IdMotivo == 2);
    } else {
      // Puedes manejar el caso cuando se deselecciona un valor si es necesario
      setMostrarCasilla1(false);
      setMostrarCasilla2(false);
      setEstadoSeleccionado(null);
    }
  };

  const handleEstadoChange = (event, newValue) => {
    setEstadoSeleccionado(newValue);
    if (newValue) {
      setEstadoElegido(newValue.IdEstado);
    } else {
      // Puedes manejar el caso cuando se deselecciona un valor si es necesario
    }
  };

  useEffect(() => {
    const fetchNumSerial = async () => {
      const url = "http://localhost:3000/api/activos/asignados";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNumSerial(data);
      } catch (error) {
        console.error("Error al cargar los numeros seriales", error);
      }
    };

    const fetchMotivo = async () => {
      const url = "http://localhost:3000/api/motivos";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMotivo(data);
      } catch (error) {
        console.error("Error al cargar los datos de motivos", error);
      }
    };

    const fetchEstado = async () => {
      const url = "http://localhost:3000/api/estados";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEstado(data);
      } catch (error) {
        console.log("Error al cargar los datos de estados", error);
      }
    };

    fetchEstado();
    fetchMotivo();
    fetchNumSerial();
  }, []);

  const guardarRecepcion = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/recepcion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdActivo: +activoElegido,
          IdMotivo: +motivoElegido,
          IdEstado: +estadoElegido,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }

      Swal.fire({
        title: "Activo Recepcionado",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });

      // Puedes agregar aquí la redirección si lo prefieres
      // window.location.href = "/nueva-pagina";
    } catch (error) {
      Swal.fire({
        title: "Error al guardar",
        text: "Se deben llenar los campos vacíos",
        icon: "error",
      });
    } finally {
      navigate("/consulta");
    }
  };

  if (Auth.isAuthenticated == false) {
    window.location.href = "/";
  }

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
            <h2>RECEPCIÓN DE ACTIVO</h2>
            <Button variant="contained" onClick={guardarRecepcion}>
              RECEPCIONAR ACTIVO
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
              value={dataModelo ? dataModelo : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Número de Modelo*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={numModelo ? numModelo : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Tipo de CPU</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={tipoCPU ? tipoCPU : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Modelo del CPU</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={modeloCPU ? modeloCPU : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>GHZ</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={ghz ? ghz : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>HDD</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={hdd ? hdd : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Tipo de HDD</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={tipoHdd ? tipoHdd : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>RAM</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              value={ram ? ram : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Motivo*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={motivo}
              value={motivoSeleccionado}
              onChange={handleMotivoChange}
              getOptionLabel={(option) => option.descrp}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          {mostrarCasilla1 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>DOCUMENTO</label>
              <TextField
                id="outlined-size-small"
                size="small"
                sx={{ width: "320px" }}
                // Aquí puedes manejar el estado de la primera casilla adicional
              />
            </Box>
          )}

          {mostrarCasilla2 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Estado*</label>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                sx={{ width: "320px" }}
                options={estado}
                value={estadoSeleccionado}
                onChange={handleEstadoChange}
                getOptionLabel={(option) => option.descrp}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ textAlign: "right", padding: "10px 0px" }}>
          <Button variant="contained" sx={{ bgcolor: "red" }}>
            LIMPIAR DATOS
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Recepcion;
