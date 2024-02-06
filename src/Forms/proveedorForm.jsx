import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../Context";

function ProveedorForm() {
  const [RUC, setRUC] = useState([]);
  const [empresa, setEmpresa] = useState("");
  const navigate = useNavigate();
  const Auth = useAuth();

  const guardarRUC = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/proveedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ruc: RUC,
          nombre: empresa,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      navigate("/proveedores");
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
          <h2>PROVEEDORES</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarRUC}>
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
            <label>RUC</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={RUC}
              onChange={(e) => setRUC(e.target.value)}
            />
          </Box>
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
              to="/proveedores"
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

export default ProveedorForm;
