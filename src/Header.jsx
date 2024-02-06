import logo from "./img/logo1.png";
import "./header.css";
import { useAuth } from "./Context";

function Header() {
  const Auth = useAuth();
  const user = Auth.getUser();

  const handleLogout = () => {
    Auth.logoutUser();
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "16px 0px",
            justifyContent: "space-between",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: "0px",
            }}
          >
            <li style={{}}>
              <img
                src={logo}
                alt="logo"
                className="logo"
                style={{ width: "224px", cursor: "pointer" }}
              />
            </li>
          </ul>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "8px",
              alignItems: "center",
              padding: "0px",
              margin: "0px",
            }}
          >
            <li>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <article>
                  <img
                    src={user ? user.picture : ""}
                    alt="profile_photo"
                    className="profile_photo"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "25px",
                    }}
                  />
                </article>
                <article>
                  <div>
                    <h3 style={{ fontSize: "16px", color: "#000000" }}>
                      {user ? user.name : ""}
                    </h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        fontWeight: "normal",
                      }}
                    >
                      {user ? user.email : ""}
                    </h3>
                  </div>
                </article>
              </div>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  gap: "2px",
                  backgroundColor: "transparent",
                  padding: "8px",
                  alignItems: "center",
                  borderColor: "white",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                }}
              >
                <img src="../src/img/Sign_Out_Icon.png" alt="" />
                Salir
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
