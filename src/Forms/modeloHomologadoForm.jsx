import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import { useAuth } from "../Context";

function ModeloHomologadoForm() {
  const [tipoActivo, setTipoActivos] = useState();
  const [marca, setMarca] = useState();
  const [modelo, setModelo] = useState();
  const [tipoCPU, setTipoCPU] = useState("");
  const [modeloCPU, setModeloCPU] = useState("");
  const [GHZ, setGHZ] = useState("");
  const [HDD, setHDD] = useState("");
  const [tipoHDD, setTipoHDD] = useState("");
  const [RAM, setRAM] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const navigate = useNavigate();
  const Auth = useAuth();

  const limpiarCampos = () => {
    setTipoSeleccionado(null);
    setMarcaSeleccionada(null);
    setModeloSeleccionado(null);
    setTipoCPU("");
    setModeloCPU("");
    setGHZ("");
    setHDD("");
    setTipoHDD("");
    setRAM("");
  };

  const fetchModelos = async (IdMarca) => {
    const url = "http://localhost:3000/api/modelos/" + IdMarca;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setModelo(data);
    } catch (error) {
      console.error("Error al cargar los datos de los modelos", error);
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener tipos de activos
    const fetchTiposActivos = async () => {
      const url = "http://localhost:3000/api/tipos";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTipoActivos(data);
      } catch (error) {
        console.error("Error al cargar los datos de tipos de activos", error);
      }
    };

    // Llamada a la API para obtener marcas
    const fetchMarcas = async () => {
      const url = "http://localhost:3000/api/marcas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMarca(data);
      } catch (error) {
        console.error("Error al cargar las marcas", error);
      }
    };

    // Llamada a la API para obtener tipos de moneda

    // Realizar las llamadas a las APIs
    fetchTiposActivos();
    fetchMarcas();
  }, []);

  const guardarModeloHomologado = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/modelosHomologados",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdTipo: tipoSeleccionado.IdTipo,
            IdMarca: marcaSeleccionada.IdMarca,
            IdModelo: modeloSeleccionado.IdModelo,
            tipo_cpu: tipoCPU,
            modelo_cpu: modeloCPU,
            ghz: GHZ,
            hdd: HDD,
            tipo_hdd: tipoHDD,
            ram: RAM,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }

      Swal.fire({
        title: "Modelo Homologado guardado",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error al guardar",
        text: error.message,
        icon: "error",
      });
    } finally {
      navigate("/modelo-homologado");
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
          <h2>MODELO HOMOLOGADO</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarModeloHomologado}>
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
            <label>Tipo de Activo*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={tipoActivo}
              getOptionLabel={(option) => option.descrp}
              value={tipoSeleccionado}
              onChange={(event, newValue) => setTipoSeleccionado(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Marca*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={marca}
              getOptionLabel={(option) => option.descrp}
              value={marcaSeleccionada}
              onChange={async (event, newValue) => {
                setMarcaSeleccionada(newValue);
                await fetchModelos(newValue.IdMarca);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Modelo*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={modelo}
              getOptionLabel={(option) => option.descrp}
              value={modeloSeleccionado}
              onChange={(event, newValue) => setModeloSeleccionado(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Tipo de CPU</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={tipoCPU}
              onChange={(e) => setTipoCPU(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Modelo de CPU</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={modeloCPU}
              onChange={(e) => setModeloCPU(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>GHZ*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={GHZ}
              onChange={(e) => setGHZ(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>HDD</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={HDD}
              onChange={(e) => setHDD(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Tipo de HDD</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={tipoHDD}
              onChange={(e) => setTipoHDD(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>RAM</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={RAM}
              onChange={(e) => setRAM(e.target.value)}
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
              to="/modelo-homologado"
              style={{ color: "white", textDecoration: "none" }}
            >
              VOLVER
            </Link>
          </Button>
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

export default ModeloHomologadoForm;
