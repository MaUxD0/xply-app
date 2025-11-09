
import { useEffect } from "react";
import { useLocation, Routes, Route } from 'react-router-dom';
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

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
      {/* fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;




