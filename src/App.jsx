import React from 'react';
import Layout from "./components/Layout/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Rolepage from "./pages/RolePage.jsx"
import Register from "./pages/Register.jsx"
import RegisterUser from "./pages/RegisterUser.jsx"
import Dashboard from "./pages/Dashboard.jsx";
import LaporanBulanan from "./pages/LaporanBulanan.jsx";
import DatabaseUser from "./pages/DatabaseUSer.jsx";
import DataRuang from "./pages/DataRuang.jsx";
import Penjadwalan from "./pages/Penjadwalan.jsx";
import Peminjaman from "./pages/PeminjamanPage.jsx";
import { AuthProvider } from './components/Layout/AuthContext';


function App() {
  return (

    <AuthProvider>

    
    <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/rolepage" exact element={<Rolepage />} />
        <Route path="/register/admin" exact element={<Register />} />
        <Route path="/register/user" exact element={<RegisterUser />} />
        <Route element={<Layout />}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/laporan-bulanan" element={<LaporanBulanan />} />
           <Route path="/database/user" element={<DatabaseUser />} />
           <Route path="/database/ruangan" element={<DataRuang />} />
           <Route path="/peminjaman" element={<Peminjaman />} />
          <Route path="/penjadwalan" element={<Penjadwalan />} />
        </Route>     
    </Routes>

    </AuthProvider>
  );
}

export default App;
