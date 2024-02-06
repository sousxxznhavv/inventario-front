import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { useAuth } from "../Context";
import Navbar from "../Navbar";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

function Consulta() {
  const [datos, setDatos] = useState([]);
  const columns = [
    { field: "tipoActivo", headerName: "TIPO", width: 100 },
    { field: "numSerie", headerName: "NÚMERO DE SERIE", width: 150 },
    { field: "marcaModelo", headerName: "MARCA - MODELO", width: 250 },
    { field: "estado", headerName: "ESTADO", width: 200 },
    { field: "usuario", headerName: "USUARIO", width: 248 },
    {
      field: "acciones",
      headerName: "ACCIONES",
      width: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/editar-activo/${params.row.id}`}>
            <IconButton aria-label="edit" color="primary">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  const rows = datos.map((item) => ({
    id: item.IdActivo,
    tipoActivo: item.modeloHomologado.tipo.descrp,
    numSerie: item.num_serial,
    marcaModelo:
      item.modeloHomologado.marca.descrp +
      " - " +
      item.modeloHomologado.modelo.descrp,
    usuario:
      item.estado.descrp === "ASIGNADO" && item.asignacion.length > 0
        ? item.asignacion[0].empleado.nombreUsuario
        : "", // Mostrar el nombre de usuario solo si el estado es "ASIGNADO"
    estado: item.estado.descrp,
  }));

  const Auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/activos/total");
        if (!response.ok) {
          throw new Error("Error al obtener datos de la base de datos");
        }
        const data = await response.json();
        // console.log(data[1].asignacion[0].empleado.nombreUsuario);
        setDatos(data.reverse());
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
        <Box sx={{ textAlign: "center", padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <h2>LISTA DE ACTIVOS</h2>
          </Box>
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

export default Consulta;
