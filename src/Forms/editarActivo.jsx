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
import "dayjs/locale/es";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditarActivo() {
  const Auth = useAuth();
  const navigate = useNavigate();

  //Editar Activo
  const [tipoActivos, setTipoActivos] = useState([]);
  const [dataModelos, setDataModelos] = useState([]);
  const [numModelo, setNumModelo] = useState("");
  const [numSerial, setNumSerial] = useState("");
  const [numSerialAsignacion, setNumSerialAsignacion] = useState("");
  const [fechaFacturacion, setFechaFacturacion] = useState(null);
  const [proveedor, setProveedor] = useState([]);
  const [factura, setFactura] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const [valorVenta, setValorVenta] = useState("");
  const [ordenCompra, setOrdenCompra] = useState("");
  const [anotacion, setAnotacion] = useState("");

  //Editar asignacion
  const [numSerialAsignSeleccionado, setNumSerialAsignSeleccionado] =
    useState(null);
  const [GMDCPU, setGMDCPU] = useState("");
  const [hostname, setHostname] = useState("");
  const [sistemaOperativo, setSistemaOperativo] = useState("");
  const [empleado, setEmpleado] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [areaTrabajo, setAreaTrabajo] = useState([]);
  const [areaTrabajoSeleccionado, setAreaTrabajoSeleccionado] = useState(null);

  //Errores
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
  //Botones
  const [creacionSeleccionada, setCreacionSeleccionada] = useState(true);
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState(false);
  const [recepcionSeleccionada, setRecepcionSeleccionada] = useState(false);

  let [estado, setEstado] = useState("");
  // let [tipo, setTipo] = useState("");

  const { id } = useParams();

  //Obtener datos de Activo con IdActivo
  const fetchDataEdit = async (IdActivo) => {
    const url = "http://localhost:3000/api/activos/editar/" + IdActivo;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const estadoActivo = data[0].estado.descrp;
      setEstado(estadoActivo);
      setTipoActivoSeleccionado(data[0].modeloHomologado.tipo);
      setMarcaModelo(data[0].modeloHomologado);
      setNumModelo(data[0].modeloHomologado.modelo.num_modelo);
      setNumSerial(data[0].num_serial);
      setNumSerialAsignSeleccionado(data[0]);
      setFechaFacturacion(data[0].fec_facturacion);
      setProveedorSeleccionado(data[0].proveedor);
      setFactura(data[0].factura);
      setFacturadoSeleccionado(data[0].empresa);
      setMonedaSeleccionada(data[0].moneda);
      setValorVenta(data[0].valor_venta);
      setOrdenCompra(data[0].orden_compra);
      setAnotacion(data[0].anotacion);
    } catch (error) {
      console.error("Error al obtener la información");
    }
  };
  //Obtener datos de asignación del Activo con IdActivo
  const fetchAsignacionEdit = async (IdActivo) => {
    const url = "http://localhost:3000/api/asignacion/editar/" + IdActivo;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setGMDCPU(data.gmd_cpu);
      setHostname(data.hostname);
      setSistemaOperativo(data.sistema_operativo);
      setEmpleadoSeleccionado(data.empleado);
      setAreaTrabajoSeleccionado(data.area);
    } catch (error) {
      console.error("Error al obtener la información");
    }
  };

  useEffect(() => {
    fetchDataEdit(id);
    fetchAsignacionEdit(id);
  }, [id]);

  const fetchDataModelos = async (IdTipo) => {
    const url = "http://localhost:3000/api/modelosHomologados/" + IdTipo;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
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

  const handleDateChange = (date) => {
    let fecha = format(new Date(date.$d), "yyyy-MM-dd");
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

  //ACTUALIZACION

  const handleActualizarCreacion = async () => {
    // Validaciones antes de la actualización
    if (!numSerial || !factura || !valorVenta || !ordenCompra) {
      setErrores({
        numSerial: !numSerial,
        factura: !factura,
        valorVenta: !valorVenta,
        ordenCompra: !ordenCompra,
      });
      throw new Error("Campos obligatorios no completados");
    }

    // Realiza la actualización
    const url = `http://localhost:3000/api/activos/${id}`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
    };

    try {
      console.log("JSON a enviar:", JSON.stringify(requestOptions.body));
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        // Manejar el éxito de la actualización, por ejemplo, redirigiendo a otra página
        navigate("/consulta");
      } else {
        console.error("Error al actualizar el activo");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de actualización", error);
    }
  };

  //ASIGNACION

  const handleNumSerialChange = (event, newValue) => {
    setNumSerialAsignSeleccionado(newValue);
  };

  const handleEmpleado = (event, newValue) => {
    setEmpleadoSeleccionado(newValue);
  };

  const fetchEmpleados = async () => {
    const url = "http://localhost:3000/api/empleado";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setEmpleado(data);
    } catch (error) {
      console.error("Error al cargar los datos de empleado", error);
    }
  };

  const fetchAreas = async () => {
    const url = "http://localhost:3000/api/areas";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAreaTrabajo(data);
    } catch (error) {
      console.error("Error al cargar los datos de areas", error);
    }
  };
  const fetchNumSerialAsignacion = async () => {
    const url = "http://localhost:3000/api/activos";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNumSerialAsignacion(data);
    } catch (error) {
      console.error("Error al cargar los datos de tipos de activos", error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
    fetchAreas();
    fetchNumSerialAsignacion();
  }, []);

  return (
    <>
      <Header />
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
              justifyContent: "flex-end",
              padding: "0px",
            }}
          >
            {estado === "STOCK" && (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    setCreacionSeleccionada(true);
                    setAsignacionSeleccionada(false);
                    setRecepcionSeleccionada(false);
                  }}
                  sx={{ marginRight: "10px" }}
                >
                  Creacion
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setCreacionSeleccionada(false);
                    setAsignacionSeleccionada(false);
                    setRecepcionSeleccionada(true);
                  }}
                >
                  Recepcion
                </Button>
              </>
            )}
            {estado === "ASIGNADO" && (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    setCreacionSeleccionada(true);
                    setAsignacionSeleccionada(false);
                    setRecepcionSeleccionada(false);
                  }}
                  sx={{ marginRight: "10px" }}
                >
                  Creacion
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setCreacionSeleccionada(false);
                    setAsignacionSeleccionada(true);
                    setRecepcionSeleccionada(false);
                  }}
                  sx={{ marginRight: "10px" }}
                >
                  Asignacion
                </Button>
              </>
            )}
          </Box>
          {creacionSeleccionada && (
            <Box
              id="botonCreacionBox"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px",
                padding: " 0px 30px",
                marginBottom: "50px",
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
              <Box>
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
              </Box>
              <Box>
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
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Proveedor*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={proveedor}
                    value={proveedorSeleccionado}
                    onChange={(event, newValue) =>
                      setProveedorSeleccionado(newValue)
                    }
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
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
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Empresa Responsable*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={empresas}
                    value={facturadoSeleccionado}
                    onChange={(event, newValue) =>
                      setFacturadoSeleccionado(newValue)
                    }
                    getOptionLabel={(option) => option.descrp}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Moneda*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={monedas}
                    value={monedaSeleccionada}
                    onChange={(event, newValue) =>
                      setMonedaSeleccionada(newValue)
                    }
                    getOptionLabel={(option) => option.descrp}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
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
              </Box>
              <Box>
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
                      errores.ordenCompra
                        ? "Orden de Compra es obligatorio"
                        : ""
                    }
                  />
                </Box>
              </Box>
              <Box>
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
              <Link to={"/consulta"}>
                <button onClick={() => navigate("/consulta")}>VOLVER</button>
              </Link>
              <Box></Box>
              <Box>
                <button onClick={handleActualizarCreacion}>ACTUALIZAR</button>
              </Box>
            </Box>
          )}
          {asignacionSeleccionada && (
            <Box
              id="botonAsignacionBox"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px",
                padding: " 0px 30px",
                marginBottom: "50px",
              }}
            >
              <Box>
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
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label>Número de Serial*</label>
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  sx={{ width: "320px" }}
                  options={numSerialAsignacion}
                  value={numSerialAsignSeleccionado}
                  onChange={handleNumSerialChange}
                  getOptionLabel={(option) => option.num_serial}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>

              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Código de Inventario*</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    sx={{ width: "320px" }}
                    value={GMDCPU}
                    onChange={(e) => setGMDCPU(e.target.value)}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Hostname*</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    sx={{ width: "320px" }}
                    value={hostname}
                    onChange={(e) => setHostname(e.target.value)}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Sistema Operativo</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    sx={{ width: "320px" }}
                    value={sistemaOperativo}
                    onChange={(e) => setSistemaOperativo(e.target.value)}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Usuario*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={empleado}
                    getOptionLabel={(option) => option.nombreUsuario}
                    value={empleadoSeleccionado}
                    onChange={handleEmpleado}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Área de Trabajo*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={areaTrabajo}
                    getOptionLabel={(option) => option.descrp}
                    value={areaTrabajoSeleccionado}
                    onChange={(event, newValue) =>
                      setAreaTrabajoSeleccionado(newValue)
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Link to={"/consulta"}>
                <button onClick={() => navigate("/consulta")}>VOLVER</button>
              </Link>
              <Box></Box>
              <Box>
                <button>ACTUALIZAR</button>
              </Box>
            </Box>
          )}
          {recepcionSeleccionada && (
            <Box
              id="botonRecepcionBox"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px",
                padding: " 0px 30px",
                marginBottom: "50px",
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
                  getOptionLabel={(option) =>
                    option.marca.descrp + " - " + option.modelo.descrp
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Box>
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
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Número de Serial*</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    value={numSerial}
                    sx={{ width: "320px" }}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Fecha de Facturación*</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        format="DD-MM-YYYY"
                        dateFormat="yyyy-MM-dd"
                        sx={{ width: "320px" }}
                        selected={fechaFacturacion}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Proveedor*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={proveedor}
                    value={proveedorSeleccionado}
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Factura*</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    value={factura}
                    sx={{ width: "320px" }}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Empresa Responsable*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={empresas}
                    value={facturadoSeleccionado}
                    getOptionLabel={(option) => option.descrp}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Moneda*</label>
                  <Autocomplete
                    id="size-small-outlined"
                    size="small"
                    sx={{ width: "320px" }}
                    options={monedas}
                    value={monedaSeleccionada}
                    getOptionLabel={(option) => option.descrp}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Valor Venta*</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    value={valorVenta}
                    sx={{ width: "320px" }}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Orden de Compra*</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    value={ordenCompra}
                    sx={{ width: "320px" }}
                  />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label>Anotaciones</label>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    value={anotacion}
                    sx={{ width: "320px" }}
                  />
                </Box>
              </Box>
              <Link to={"/consulta"}>
                <button onClick={() => navigate("/consulta")}>VOLVER</button>
              </Link>
              <Box></Box>
              <Box>
                <button>ACTUALIZAR</button>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

export default EditarActivo;
