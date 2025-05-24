import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

//Layouts
import Auth from "./layout/Auth";
import Portal from "./layout/Portal";
import Site from "./layout/Site";

//Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Site />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="auth" element={<Auth />}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="portal" element={<Portal />}>
                    <Route index element={<Landing />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
