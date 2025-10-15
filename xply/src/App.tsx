// src/App.tsx
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/feed";
import PostDetail from "./pages/PostDetail";

function App() {
  const path = window.location.pathname;

  // 🔄 Este useEffect se ejecuta una vez cada vez que se monta App
  // y fuerza al navegador a recalcular el layout (como si movieras el tamaño)
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [path]); //  se ejecuta cada vez que cambia la ruta

  // 📦 Manejo de rutas básicas por pathname
  if (path.startsWith("/post/")) return <PostDetail />;
  if (path === "/register") return <Register />;
  if (path === "/feed") return <Feed />;
  return <Login />; // Ruta por defecto "/"
}

export default App;




