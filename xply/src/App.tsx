import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/feed";

function App() {
  const path = window.location.pathname;

  // Manejar todas las rutas
  if (path === "/register") return <Register />;
  if (path === "/feed") return <Feed />;
  return <Login />; // Ruta por defecto: "/"
}

export default App;



