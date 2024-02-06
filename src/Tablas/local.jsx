import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAuth } from "../Context";

const customTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        header: {
          backgroundColor: "red", // Cambia el color de fondo de la cabecera aquí
        },
      },
    },
  },
});

function Local() {
  const [datos, setDatos] = useState([]);
  const columns = [
    { field: "empresaLocal", headerName: "EMPRESA", width: 250 },
    { field: "localNombre", headerName: "LOCAL", width: 250 },
  ];
  const rows = datos.map((item) => ({
    id: item.IdLocal,
    empresaLocal: item.empresa.descrp,
    localNombre: item.descrp,
  }));
  const Auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/local");
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
    <ThemeProvider theme={customTheme}>
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
                to="/local-nuevo"
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
    </ThemeProvider>
  );
}

export default Local;
