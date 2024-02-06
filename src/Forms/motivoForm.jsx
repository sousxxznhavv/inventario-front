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

function MotivoForm() {
  const [motivo, setMotivo] = useState("");
  const navigate = useNavigate();
  const Auth = useAuth();
  const guardarMotivo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/motivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descrp: motivo }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      navigate("/motivo");
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
          <h2>MOTIVOS</h2>
          <Box sx={{ textAlign: "right", padding: "0px" }}>
            <Button variant="contained" onClick={guardarMotivo}>
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
            <label>MOTIVOS</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
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
              to="/motivo"
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

export default MotivoForm;
