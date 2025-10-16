
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/feed";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";

function App() {
  const path = window.location.pathname;


  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [path]); 

  //  Manejo de rutas 
  if (path === "/create") return <CreatePost />
  if (path.startsWith("/post/")) return <PostDetail />;
  if (path === "/register") return <Register />;
  if (path === "/feed") return <Feed />;
  return <Login />; // Ruta por defecto "/"
}

export default App;




