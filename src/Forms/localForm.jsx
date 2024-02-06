import Container from "@mui/material/Container";
import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import { useAuth } from "../Context";

function LocalForm() {
  const [empresa, setEmpresa] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState(null);
  const [local, setLocal] = useState("");
  const Auth = useAuth();
  useEffect(() => {
    //Llamada a la API para obtener las empresas
    const fetchEmpresa = async () => {
      const url = "http://localhost:3000/api/empresas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEmpresa(data);
      } catch (error) {
        console.error("Error al cargar los datos de las marcas", error);
      }
    };

    fetchEmpresa();
  }, []);

  if (Auth.isAuthenticated == false) {
    window.location.href = "/";
  }

  const guardarLocal = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdEmpresa: valorSeleccionado.IdEmpresa,
          descrp: local,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setEmpresa("");
      setLocal("");
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
          <h2>LOCALES</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarLocal}>
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
            <label>EMPRESA</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={empresa}
              getOptionLabel={(option) => option.descrp}
              value={valorSeleccionado}
              onChange={(event, newValue) => setValorSeleccionado(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>LOCAL</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={local}
              onChange={(e) => setLocal(e.target.value)}
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
              to="/locales"
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

export default LocalForm;
