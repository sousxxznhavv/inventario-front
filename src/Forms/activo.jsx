import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import "./activo.css";
import format from "date-fns/format";
import Header from "../Header";
import { useAuth } from "../Context";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import "dayjs/locale/es";
import { useNavigate } from "react-router-dom";

function Activo() {
  const Auth = useAuth();
  const navigate = useNavigate();
  const [tipoActivos, setTipoActivos] = useState([]);
  const [dataModelos, setDataModelos] = useState([]);
  const [numModelo, setNumModelo] = useState("");
  const [numSerial, setNumSerial] = useState("");
  const [fechaFacturacion, setFechaFacturacion] = useState(null);
  const [proveedor, setProveedor] = useState([]);
  const [factura, setFactura] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const [valorVenta, setValorVenta] = useState("");
  const [ordenCompra, setOrdenCompra] = useState("");
  const [anotacion, setAnotacion] = useState("");
  const [errores, setErrores] = useState({
    numSerial: false,
    factura: false,
    valorVenta: false,
    ordenCompra: false,
  });

  const [tipoActivoSeleccionado, setTipoActivoSeleccionado] = useState(null);
  const [marcaModelo, setMarcaModelo] = useState(null);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [facturadoSeleccionado, setFacturadoSeleccionado] = useState(null);
  const [monedaSeleccionada, setMonedaSeleccionada] = useState(null);

  const fetchDataModelos = async (IdTipo) => {
    const url = "http://localhost:3000/api/modelosHomologados/" + IdTipo;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataModelos(data);
    } catch (error) {
      console.error("Error al cargar los datos de los modelos", error);
    }
  };

  const fetchNumModelo = async (IdMarca, IdModelo) => {
    const url = "http://localhost:3000/api/modelos/" + IdMarca + "/" + IdModelo;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNumModelo(data[0].num_modelo);
    } catch (error) {
      console.error("Error al obtener el número de Modelo");
    }
  };

  const limpiarCampos = () => {
    setTipoActivoSeleccionado(null);
    setMarcaModelo(null);
    setNumSerial("");
    setProveedorSeleccionado(null);
    setFactura("");
    setFacturadoSeleccionado(null);
    setMonedaSeleccionada(null);
    setValorVenta("");
    setOrdenCompra("");
    setAnotacion("");
    setDataModelos([]);
    setNumModelo("");
  };

  const handleMarcaModelo = async (event, newValue) => {
    setMarcaModelo(newValue);
    if (newValue) {
      await fetchNumModelo(newValue.marca.IdMarca, newValue.modelo.IdModelo);
    } else {
      // Puedes manejar el caso cuando se deselecciona un valor si es necesario
      setNumModelo("");
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

    // Llamada a la API para obtener tipos de moneda
    const fetchEmpresa = async () => {
      const url = "http://localhost:3000/api/empresas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error al cargar los datos de las empresas", error);
      }
    };

    // Llamada a la API para obtener tipos de moneda
    const fetchTiposMoneda = async () => {
      const url = "http://localhost:3000/api/monedas";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMonedas(data);
      } catch (error) {
        console.error("Error al cargar los datos de tipos de moneda", error);
      }
    };
    // Llamada a la API para obtener proveedores

    const fetchProveedores = async () => {
      const url = "http://localhost:3000/api/proveedor";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProveedor(data);
      } catch (error) {
        console.error("Error al cargar los datos de los modelos", error);
      }
    };
    // Realizar las llamadas a las APIs
    fetchTiposActivos();
    fetchTiposMoneda();
    fetchEmpresa();
    fetchProveedores();
  }, []);

  const guardarActivo = async () => {
    try {
      if (!numSerial || !factura || !valorVenta || !ordenCompra) {
        setErrores({
          numSerial: !numSerial,
          factura: !factura,
          valorVenta: !valorVenta,
          ordenCompra: !ordenCompra,
        });
        throw new Error("Campos obligatorios no completados");
      }

      const response = await fetch("http://localhost:3000/api/activos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo_activo: tipoActivoSeleccionado,
          marca_modelo: marcaModelo,
          num_serial: numSerial,
          fec_facturacion: fechaFacturacion,
          IdProveedor: proveedorSeleccionado.IdProveedor,
          factura: factura,
          IdEmpresa: facturadoSeleccionado.IdEmpresa,
          IdMoneda: monedaSeleccionada.IdMoneda,
          valor_venta: valorVenta,
          orden_compra: ordenCompra,
          anotacion: anotacion,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
      setErrores({
        numSerial: false,
        factura: false,
        valorVenta: false,
        ordenCompra: false,
      });
      Swal.fire({
        title: "Activo creado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error al guardar",
        text: error.message || "Se deben llenar los campos obligatorios",
        icon: "error",
      });
    } finally {
      navigate("/consulta");
      // setTipoActivoSeleccionado(null);
      // setMarcaModelo(null);
      // setNumSerial("");
      // setProveedorSeleccionado(null);
      // setFactura("");
      // setFacturadoSeleccionado(null);
      // setMonedaSeleccionada(null);
      // setValorVenta("");
      // setOrdenCompra("");
      // setAnotacion("");
      // setNumModelo("");
    }
  };

  const handleDateChange = (date) => {
    let fecha = format(new Date(date.$d), "yyyy-MM-dd");
    console.log(fecha);
    setFechaFacturacion(fecha);
  };

  if (Auth.isAuthenticated == false) {
    window.location.href = "/";
  }

  const handleTipoActivoChange = (event, newValue) => {
    setTipoActivoSeleccionado(newValue);
    // Si el nuevo valor es null o undefined, también limpiar los datos de marca y modelo
    if (!newValue) {
      setMarcaModelo(null);
      setDataModelos([]);
      setNumModelo("");
    } else {
      setMarcaModelo(null);
      setDataModelos([]);
      setNumModelo("");
      fetchDataModelos(newValue.IdTipo);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px",
            }}
          >
            <p></p>
            <h2>CREAR ACTIVO</h2>
            <Button variant="contained" onClick={guardarActivo}>
              CREAR ACTIVO
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
              options={tipoActivos}
              getOptionLabel={(option) => option.descrp}
              value={tipoActivoSeleccionado}
              onChange={handleTipoActivoChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Marca - Modelo*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={dataModelos}
              value={marcaModelo}
              onChange={handleMarcaModelo}
              getOptionLabel={(option) =>
                option.marca.descrp + " - " + option.modelo.descrp
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Número de Modelo*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              sx={{ width: "320px" }}
              InputProps={{
                readOnly: true,
              }}
              value={numModelo ? numModelo : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Número de Serial*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              value={numSerial}
              onChange={(e) => setNumSerial(e.target.value)}
              sx={{ width: "320px" }}
              error={errores.numSerial}
              helperText={
                errores.numSerial ? "Número de Serial es obligatorio" : ""
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Fecha de facturación*</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  format="DD-MM-YYYY"
                  dateFormat="yyyy-MM-dd"
                  sx={{ width: "320px" }}
                  onChange={handleDateChange}
                  //value={fechaFacturacion}
                  selected={fechaFacturacion}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Proveedor*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={proveedor}
              value={proveedorSeleccionado}
              onChange={(event, newValue) => setProveedorSeleccionado(newValue)}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Factura*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              value={factura}
              onChange={(e) => setFactura(e.target.value)}
              sx={{ width: "320px" }}
              error={errores.factura}
              helperText={errores.factura ? "Factura es obligatorio" : ""}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Empresa Responsable*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={empresas}
              value={facturadoSeleccionado}
              onChange={(event, newValue) => setFacturadoSeleccionado(newValue)}
              getOptionLabel={(option) => option.descrp}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Moneda*</label>
            <Autocomplete
              id="size-small-outlined"
              size="small"
              sx={{ width: "320px" }}
              options={monedas}
              value={monedaSeleccionada}
              onChange={(event, newValue) => setMonedaSeleccionada(newValue)}
              getOptionLabel={(option) => option.descrp}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Valor de Venta*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              value={valorVenta}
              onChange={(e) => {
                // Validar que solo se ingresen números
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                setValorVenta(newValue);
              }}
              sx={{ width: "320px" }}
              error={errores.valorVenta}
              helperText={
                errores.valorVenta ? "Valor de Venta es obligatorio" : ""
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Orden de Compra*</label>
            <TextField
              id="outlined-size-small"
              size="small"
              value={ordenCompra}
              onChange={(e) => setOrdenCompra(e.target.value)}
              sx={{ width: "320px" }}
              error={errores.ordenCompra}
              helperText={
                errores.ordenCompra ? "Orden de Compra es obligatorio" : ""
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label>Anotaciones</label>
            <TextField
              id="outlined-size-small"
              size="small"
              value={anotacion}
              onChange={(e) => setAnotacion(e.target.value)}
              sx={{ width: "320px" }}
            />
          </Box>
        </Box>
        <Box sx={{ textAlign: "right", padding: "10px 0px" }}>
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

export default Activo;
