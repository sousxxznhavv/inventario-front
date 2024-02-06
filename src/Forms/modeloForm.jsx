import Container from "@mui/material/Container";
import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../Context";
function ModeloForm() {
  const [marca, setMarca] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [modelo, setModelo] = useState("");
  const [numModelo, setNumModelo] = useState("");
  const navigate = useNavigate();
  const Auth = useAuth();
  useEffect(() => {
    //Llamada a la API para obtener las marcas
    const fetchMarcas = async () => {
      const url = "http://localhost:3000/api/marcas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMarca(data);
      } catch (error) {
        console.error("Error al cargar los datos de las marcas", error);
      }
    };

    fetchMarcas();
  }, []);

  const guardarModelo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/modelos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdMarca: valorSeleccionado.IdMarca,
          descrp: modelo,
          num_modelo: numModelo,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      navigate("/modelos");
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
          <h2>MODELOS</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarModelo}>
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
            <label>MARCA</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={marca}
              getOptionLabel={(option) => option.descrp}
              value={valorSeleccionado}
              onChange={(event, newValue) => setValorSeleccionado(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>MODELO</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>NÚMERO DE MODELO</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={numModelo}
              onChange={(e) => setNumModelo(e.target.value)}
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
              to="/modelos"
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

export default ModeloForm;
