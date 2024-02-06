import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import imgLogin from "../img/imgLogin.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context";
import logo from "../img/logo1.png";

function Login() {
  // const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Auth = useAuth();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);

    // Extrae el token JWT del objeto credentialResponse
    const jwtToken = credentialResponse.credential;

    // Llama a la API de Google para obtener la información del usuario
    try {
      await Auth.setInfoUser({ jwtToken });
      // Redirige al usuario a la página "/activo"
      navigate("/consulta");
    } catch (error) {
      console.error("Error al procesar la respuesta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
    // Puedes manejar el error de manera más amigable para el usuario
  };

  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Coloca la imagen en este div */}
          <img
            src={imgLogin}
            alt="Imagen"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <img src={logo} alt="" />
          </div>
          {/* Coloca el botón en este div */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          >
            {loading && <p>Cargando...</p>}
          </GoogleLogin>
        </div>
      </div>
    </>
  );
}

export default Login;
