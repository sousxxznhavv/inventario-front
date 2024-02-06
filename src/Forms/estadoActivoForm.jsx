import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import { useAuth } from "../Context";

function EstadoActivoForm() {
  const [estado, setEstado] = useState();
  const navigate = useNavigate();
  const Auth = useAuth();
  const guardarEstado = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/estados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descrp: estado }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }

      Swal.fire({
        title: "Moneda guardada",
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
      navigate("/estados");
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
          <h2>ESTADOS DEL ACTIVO</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarEstado}>
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
            <label>ESTADO DEL ACTIVO</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
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
              to="/estados"
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

export default EstadoActivoForm;
