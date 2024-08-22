import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, removeUser } from "../../store/authSlice";
import { Navigate, useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  //const { logout } = useAuth0();

  //const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  //useEffect(() => { if (!isAuthenticated) { navigate('/accessibility-dev/log-in'); } },[])

  if (!isAuthenticated) return <Navigate to="/accessibility-dev/log-in" />;
  return <Outlet />;
};

export default PrivateRoute;

/* questo componente permette di creare root privati e protetti da login e route non privati
Per applicarlo va inserito in App.js nelle route private.

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes /}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
 */
