import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import Header from "../components/Organism/HeaderContainer";
import { useNavigate } from "react-router-dom";
import "../styles/laporanpage.css";

const LaporanBulanan = () => {
    const [laporanData, setLaporanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [drilldownData, setDrilldownData] = useState(null);
    const [isDrilldown, setIsDrilldown] = useState(false);
    const [drilldownType, setDrilldownType] = useState(null);
    const [month, setMonth] = useState("7"); 
    const [year, setYear] = useState("2024"); 
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const navigate = useNavigate();

    const fetchLaporanData = async (month, year) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/dashboard/filter?month=${month}&year=${year}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setLaporanData(data.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLaporanData(month, year);
    }, [month, year]);

    useEffect(() => {
        if (laporanData) {
            const chartData = {
                labels: [
                    "Total User",
                    "Total Lab",
                    "Total Peminjaman",
                    "Total Jadwal"
                ],
                datasets: [
                    {
                        label: "Counts",
                        backgroundColor: [
                            "#007bff", "#28a745", "#dc3545", "#ffc107"
                        ],
                        data: [
                            laporanData.count_user.total_user,
                            laporanData.count_lab.total_lab,
                            laporanData.count_peminjaman.total_peminjaman,
                            laporanData.count_jadwal.total_jadwal
                        ]
                    }
                ]
            };
            const drilldownData = {
                peminjaman: {
                    labels: [
                        "Lab Elektronika", "Lab Jaringan", "Lab Transmisi"
                    ],
                    datasets: [
                        {
                            label: "Peminjaman",
                            backgroundColor: [
                                "#17a2b8", "#6c757d", "#6610f2"
                            ],
                            data: [
                                laporanData.count_peminjaman.total_peminjaman_lab_elektronika,
                                laporanData.count_peminjaman.total_peminjaman_lab_jaringan,
                                laporanData.count_peminjaman.total_peminjaman_lab_transmisi
                            ]
                        }
                    ]
                },
                jadwal: {
                    labels: [
                        "Lab Elektronika", "Lab Jaringan", "Lab Transmisi"
                    ],
                    datasets: [
                        {
                            label: "Jadwal",
                            backgroundColor: [
                                "#e83e8c", "#fd7e14", "#20c997"
                            ],
                            data: [
                                laporanData.count_jadwal.total_jadwal_lab_elektronika,
                                laporanData.count_jadwal.total_jadwal_lab_jaringan,
                                laporanData.count_jadwal.total_jadwal_lab_transmisi
                            ]
                        }
                    ]
                }
            };
            setChartData(chartData);
            setDrilldownData(drilldownData);
        }
    }, [laporanData]);

    const initializeChart = (data, drilldown) => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
            chartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false
                        }
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0 && !drilldown) {
                            const index = elements[0].index;
                            if (index === 2) {
                                setIsDrilldown(true);
                                setDrilldownType('peminjaman');
                                initializeChart(drilldownData.peminjaman, true);
                            } else if (index === 3) {
                                setIsDrilldown(true);
                                setDrilldownType('jadwal');
                                initializeChart(drilldownData.jadwal, true);
                            }
                        }
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (chartData) {
            initializeChart(chartData, false);
        }
    }, [chartData]);

    const handleNavigate = () => {
        navigate("/dashboard");
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleDownloadChart = () => {
        const link = document.createElement("a");
        link.href = chartRef.current.toDataURL("image/png");
        link.download = `Laporan_Bulanan_${month}_${year}.png`;
        link.click();
    };

    const handleResetChart = () => {
        setIsDrilldown(false);
        setDrilldownType(null);
        initializeChart(chartData, false);
    };

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="loading-popup">
                    <p>Mohon tunggu sebentar, proses loading sedang berjalan...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="error-message">
                <p>Anda tidak memiliki akses, sehingga telah terjadi Error: {error}</p>
                <button onClick={handleNavigate} className="btn btn-primary">Back to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="container-laporan">
            <Header />
            <div className="laporan-card">
                <div className="laporan-header">
                    <h2>Laporan Bulanan</h2>
                    <div className="filter-container">
                        <label>
                            Month:
                            <select value={month} onChange={handleMonthChange}>
                                {[...Array(12).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Year:
                            <select value={year} onChange={handleYearChange}>
                                {[...Array(80).keys()].map(i => (
                                    <option key={i + 2021} value={i + 2021}>{i + 2021}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="button-group">
                        <button onClick={handleNavigate} className="btn btn-primary">Back to Dashboard</button>
                        <button onClick={handleDownloadChart} className="btn btn-secondary">Download Chart</button>
                        {isDrilldown && (
                            <button onClick={handleResetChart} className="btn btn-warning">Back to Grafik Total</button>
                        )}
                    </div>
                </div>
                <div className="chart-container">
                    <canvas ref={chartRef}></canvas>
                </div>
                <div className="laporan-stats">
                    <div className="laporan-stat">
                        <h3>Total User</h3>
                        <p>{laporanData.count_user.total_user}</p>
                    </div>
                    <div className="laporan-stat">
                        <h3>Total Lab</h3>
                        <p>{laporanData.count_lab.total_lab}</p>
                    </div>
                    <div className="laporan-stat">
                        <h3>Total Peminjaman</h3>
                        <p>{laporanData.count_peminjaman.total_peminjaman}</p>
                        <p>Lab Elektronika: {laporanData.count_peminjaman.total_peminjaman_lab_elektronika}</p>
                        <p>Lab Jaringan: {laporanData.count_peminjaman.total_peminjaman_lab_jaringan}</p>
                        <p>Lab Transmisi: {laporanData.count_peminjaman.total_peminjaman_lab_transmisi}</p>
                    </div>
                    <div className="laporan-stat">
                        <h3>Total Jadwal</h3>
                        <p>{laporanData.count_jadwal.total_jadwal}</p>
                        <p>Lab Elektronika: {laporanData.count_jadwal.total_jadwal_lab_elektronika}</p>
                        <p>Lab Jaringan: {laporanData.count_jadwal.total_jadwal_lab_jaringan}</p>
                        <p>Lab Transmisi: {laporanData.count_jadwal.total_jadwal_lab_transmisi}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporanBulanan;




