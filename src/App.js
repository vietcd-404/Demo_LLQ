import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Main from "./page/Main";
import Shop from "./page/Shop";
import Login from "./page/Login";
import { useAuth } from "./components/account/AuthProvider";
import { ProtectedRoute } from "./components/account/ProtectedRoute";
import { useEffect, React } from "react";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ProtectedRoute userRole={["ROLE_ADMIN", "ROLE_USER"]}>
                <Main>
                  <Home />
                </Main>
              </ProtectedRoute>
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
        <Route
          path="/shop"
          element={
            user ? (
              <Main>
                <Shop />
              </Main>
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
        <Route path="/signin" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
