import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  // Detecta la ruta directamente desde la URL
  const path = window.location.pathname;

  if (path === "/register") return <Register />;
  return <Login />;
}

export default App;



