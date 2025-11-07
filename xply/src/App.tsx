
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/feed";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";

function App() {
  // Usamos useLocation para que el componente se re-renderice cuando cambie la ruta
  const location = useLocation();
  const path = location.pathname;


  useEffect(() => {
    // Forzamos un resize event para que algunos componentes que dependen del tamaño
    // de la ventana se acomoden al cambiar de ruta.
    window.dispatchEvent(new Event("resize"));
  }, [path]); 

  //  Manejo de rutas 

  if (path === "/create") return <CreatePost />
  if (path.startsWith("/post/")) return <PostDetail />;
  if (path === "/register") return <Register />;
  if (path === "/feed") return <Feed />;
  if (path === "/profile") return <Profile />; 
  return <Login />; // Ruta por defecto "/"
}

export default App;




