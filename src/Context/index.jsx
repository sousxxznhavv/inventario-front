// import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";

// import { URL_BASE } from "../config/config";

// const prisma = new PrismaClient();
const AuthContext = createContext({
  isAuthenticated: false,
  //   setAuthenticated: () => {},
  setInfoUser: ({ jwtToken }) => {},
  getUser: () => {},
  //   authorize: true,
  logoutUser: () => {},
  //   getToken: null,
  //   getErrorLogin: () => {},
  //   isLoading: false,
});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  // const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [authorize, setAuthorize] = useState(true);
  // const [error, setError] = useState(null);

  const setInfoUser = async ({ jwtToken }) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${jwtToken}`
      );

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        // Guarda la información del usuario en el estado
        setUserInfo({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          // Puedes agregar más campos según sea necesario
        });

        try {
          const res = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userData.name,
              email: userData.email,
            }),
          });

          const resultado = await res.json();
          // GUARDAMOS EL TOKEN
          localStorage.setItem("tokAcc", JSON.stringify(resultado.token));

          if (!res.ok) {
            // Manejar el caso en que la respuesta no es exitosa (por ejemplo, error 404, 500, etc.)
            console.error(
              `Error en la solicitud: ${res.status} - ${res.statusText}`
            );
            // Puedes agregar más lógica aquí según tus necesidades
          } else {
            // La solicitud fue exitosa, puedes acceder al contenido de la respuesta
            const data = await res.json();
            console.log(data);
          }
        } catch (error) {
          // Manejar errores de red, CORS, etc.
          // console.error("Error de red:", error);
        }

        // const result = await response.json();
        // console.log("TOKEN: " + result);

        // const existingUser = await prisma.usuario.findUnique({
        //   where: { correo: userData.email },
        // });

        // if (!existingUser) {
        //   // Si el usuario no existe, créalo en la base de datos
        //   await prisma.usuario.create({
        //     data: {
        //       nombre: userData.name,
        //       correo: userData.email,
        //       // Otros campos según sea necesario
        //     },
        //   });
        // }

        setIsAuthenticated(true);

        // Redirige al usuario a la página "/activo"
        // navigate("/activo");

        // Realiza otras acciones después del inicio de sesión, si es necesario
      } else {
        console.error("Error al obtener la información del usuario.");
        // Puedes manejar el error de manera más amigable para el usuario
      }
    } catch (error) {
      console.error("Error al procesar la respuesta:", error);
      setIsAuthenticated(false);
    } finally {
      //   setLoading(false);
    }
  };

  const getUser = () => {
    return userInfo;
  };

  // // const saveUser = async (userInfo) => {
  // //     setUserInfo(userInfo);
  // //     setIsAuthenticated(true);
  // //     setError(null);
  // // };
  // const setAuthenticated = (isAuthenticated) => {
  //     setIsAuthenticated(isAuthenticated);
  //     if (!isAuthenticated) {
  //         setUserInfo(null);
  //         setAccessToken("");
  //         setAuthorize(true);
  //         setError(null);
  //     }
  // };
  // const getUser = () => {
  //     return userInfo;
  // };

  const logoutUser = async () => {
    googleLogout();
    setIsAuthenticated(false);
    setUserInfo(null);
    //   setAuthorize(true);
    //   setAccessToken("");
    //   setError(null);
    //   localStorage.removeItem("tokenAccess");
    //   localStorage.removeItem("tokenCredential");
  };

  // const saveToken = async (token, credential) => {
  //     setAccessToken(token);

  //     localStorage.setItem("tokenAccess", token);
  //     localStorage.setItem("tokenCredential", credential);
  // };

  // const getAccessToken = async () => {
  //     const token = localStorage.getItem("tokenAccess");
  //     return token;
  // };

  // const getCredentialGoogle = async () => {
  //     const credential = localStorage.getItem("tokenCredential");
  //     return credential;
  // };

  // const getToken = () => {
  //     return accessToken;
  // };

  // const getErrorLogin = () => {
  //     return error;
  // };

  // useEffect(() => {
  //     checkAuth();
  // }, []);

  // const checkAuth = async () => {
  //     try {
  //         setIsLoading(true);
  //         const token = await getAccessToken();
  //         const credential = await getCredentialGoogle();
  //         //console.log(credential);

  //         if (!!token) {
  //             const response = await axios.post(
  //                 ${URL_BASE}/verify,
  //                 { id_token: credential },
  //                 {
  //                     headers: {
  //                         Authorization: Bearer ${token},
  //                     },
  //                 }
  //             );
  //             console.log(response.data);
  //             if (response.data.ok) {
  //                 await saveUser(response.data.user);
  //                 setIsAuthenticated(true);
  //             } else {
  //                 setIsAuthenticated(false);
  //                 setUserInfo(null);
  //                 setAccessToken("");
  //                 setAuthorize(true);
  //                 setError(null);
  //             }
  //         } else {
  //             // Si no hay token, realiza las acciones necesarias
  //             setAccessToken("");
  //             setUserInfo(null);
  //             setIsAuthenticated(false);
  //             setAuthorize(true);
  //             setError(null);
  //         }
  //         setIsLoading(false);
  //     } catch (error) {
  //         setIsAuthenticated(false);
  //         setUserInfo(null);
  //         setAccessToken("");
  //         setAuthorize(true);
  //         setError(null);
  //         setIsLoading(false);
  //         console.log(error);
  //     } finally {
  //         setIsLoading(false);
  //     }
  // };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setInfoUser,
        getUser,
        // authorize,
        logoutUser,
        // getToken,
        // getErrorLogin,
        // setAuthenticated,
        // isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
