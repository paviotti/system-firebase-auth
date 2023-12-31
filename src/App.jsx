import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
  const { user } = useContext(UserContext);
  // causa um atraso no assincronomo do firebase, é um truque necessário
  if (user === false) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
