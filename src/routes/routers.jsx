/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Rolepage from "../pages/RolePage.jsx";
import Register from "../pages/Register.jsx";
import RegisterUser from "../pages/RegisterUser.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import LaporanBulanan from "../pages/LaporanBulanan.jsx";
import DatabaseUser from "../pages/DatabaseUSer.jsx";
import DataRuang from "../pages/DataRuang.jsx";
import Peminjaman from "../pages/PeminjamanPage.jsx";
import Penjadwalan from "../pages/Penjadwalan.jsx";




const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rolepage" element={<Rolepage />} />
      <Route path="/register/admin" element={<Register />} />
      <Route path="/register/user" element={<RegisterUser />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/laporan-bulanan" element={<LaporanBulanan />} />
      <Route path="/database/user" element={<DatabaseUser />} />
      <Route path="/database/ruangan" element={<DataRuang />} />
      <Route path="/penjadwalan" element={<Penjadwalan />} />
      <Route path="/peminjaman" element={<Peminjaman />} />

    </Routes>
  );
};

export default Routers;
