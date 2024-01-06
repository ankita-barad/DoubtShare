import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import AuthLayout from "./layouts/auth-layout.jsx";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import CreateDoubt from "./pages/create-doubt.jsx";
import DoubtDetail from "./pages/doubt-detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/doubt/create" element={<CreateDoubt />} />
          <Route path="/doubt/:doubtId" element={<DoubtDetail />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
