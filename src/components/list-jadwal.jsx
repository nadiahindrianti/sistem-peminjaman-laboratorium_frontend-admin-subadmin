/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/list-jadwal.css";
import Search from './Atom/inputan/searchPaket';

const Listpenjadwalan = () => {
    const [jadwals, setJadwals] = useState([]);

    useEffect(() => {
        const fetchJadwals = async () => {
            try {
                const token = localStorage.getItem('token'); // Mengambil token dari localStorage
                if (token) {
                    const response = await axios.get('http://localhost:8000/api/v1/admin/peminjaman', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    console.log("Response data:", response.data); // Log respons data untuk memeriksa apakah data diterima

                    // Memeriksa apakah data berupa array dan mengambil data dari respons
                    const data = Array.isArray(response.data) ? response.data : [];

                    // Memformat data yang diperlukan dari respons API
                    const formattedData = data.map(item => ({
                        peminjaman_id: item.peminjaman_id,
                        tanggal_peminjaman: item.tanggal_peminjaman,
                        jam_peminjaman: item.jam_peminjaman,
                        description: item.description,
                        lab_name: item.lab.name,
                        user_full_name: item.user.full_name
                    }));

                    console.log("Formatted Data:", formattedData); // Log data yang diformat untuk verifikasi

                    setJadwals(formattedData);
                } else {
                    console.error("Token tidak ditemukan");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchJadwals();
    }, []);

    return (
        <div className="all-list-dashboard" style={{ width: '100%' }}>
            <div className="head-list-dashboard">
                <Search />
            </div>
            <div className="list-jadwal-dashboard">
                <div className="content-jadwal-dashboard">
                    <h6 className="text-content-jadwal-dashboard">Nama Lab</h6>
                    <h6 className="text-content-jadwal-dashboard">Tanggal Peminjaman</h6>
                    <h6 className="text-content-jadwal-dashboard">Jam Peminjaman</h6>
                    <h6 className="text-content-jadwal-dashboard">Deskripsi</h6>
                    <h6 className="text-content-jadwal-dashboard">Nama Lengkap</h6>
                </div>
                {jadwals.length > 0 ? (
                    jadwals.map((jadwal, index) => (
                        <div key={index} className="all-jadwal-dashboard">
                            <div className="jadwal-dashboard">
                                <div className="image-jadwal">
                                    <img src={jadwal.user_profile_picture_url} alt="img-jadwal" />
                                </div>
                                <p className="name-jadwal">{jadwal.tanggal_peminjaman}</p>
                                <p className="date-jadwal">{jadwal.tanggal_peminjaman}</p>
                                <p className="time-jadwal">{jadwal.jam_peminjaman}</p>
                                <p className="desc-jadwal">{jadwal.description}</p>
                                <p className="full-name-jadwal">{jadwal.user_full_name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-content-jadwal-dashboard">Tidak ada peminjaman yang terbaca</p>
                )}
            </div>
        </div>
    );
};

export default Listpenjadwalan;
