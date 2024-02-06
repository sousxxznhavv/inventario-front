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

function EmpresaForm() {
  const [empresa, setEmpresa] = useState("");
  const navigate = useNavigate();
  const Auth = useAuth();
  const guardarEmpresa = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descrp: empresa }),
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
      navigate("/empresas");
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
          <h2>EMPRESA</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarEmpresa}>
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
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
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
              to="/empresas"
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

export default EmpresaForm;
