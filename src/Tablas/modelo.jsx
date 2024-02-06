import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import { useAuth } from "../Context";

function Modelo() {
  const [datos, setDatos] = useState([]);

  const columns = [
    { field: "marcaModelo", headerName: "MARCA", width: 250 },
    { field: "nombreModelo", headerName: "MODELO", width: 250 },
    { field: "numModelo", headerName: "NÚMERO DE MODELO", width: 250 },
  ];
  const rows = datos.map((item) => ({
    id: item.IdModelo,
    marcaModelo: item.marca.descrp,
    nombreModelo: item.descrp,
    numModelo: item.num_modelo,
  }));
  const Auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/modelos");
        if (!response.ok) {
          throw new Error("Error al obtener datos de la base de datos");
        }
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "right", padding: "20px 0px" }}>
          <Button variant="contained">
            <Link
              to="/modelo-nuevo"
              style={{ color: "white", textDecoration: "none" }}
            >
              NUEVO
            </Link>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DataGrid
            style={{ marginBottom: "25px" }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 4 },
              },
            }}
            pageSizeOptions={[4, 8]}
          />
        </Box>
      </Container>
    </>
  );
}

export default Modelo;
