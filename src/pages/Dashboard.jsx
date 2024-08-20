import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Organism/HeaderContainer";
import Chart from "chart.js/auto";
import "../styles/dashboardpage.css";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://sistem-peminjaman-centrumlab.onrender.com/api/v1/admin/dashboard", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setDashboardData(data.data || {});
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (dashboardData) {
            const chartData = {
                labels: ["Total User", "Total Lab", "Total Peminjaman", "Total Jadwal"],
                datasets: [
                    {
                        label: "Counts",
                        backgroundColor: ["#007bff", "#28a745", "#dc3545", "#ffc107"],
                        data: [
                            dashboardData.count_user?.total_user || 0,
                            dashboardData.count_lab?.total_lab || 0,
                            dashboardData.count_peminjaman?.total_peminjaman || 0,
                            dashboardData.count_jadwal?.total_jadwal || 0
                        ]
                    }
                ]
            };

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d");
            chartInstance.current = new Chart(ctx, {
                type: "bar",
                data: chartData,
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
                    }
                }
            });
        }
    }, [dashboardData]);

    const handleDownload = () => {
        const canvas = chartRef.current;
        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.download = "dashboard-chart.png";
        downloadLink.click();
    };

    const handleDownloadPDF = () => {
        import("jspdf").then(({ jsPDF }) => {
            import("html2canvas").then(({ default: html2canvas }) => {
                html2canvas(chartRef.current).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "mm",
                        format: "a4"
                    });
                    const imgWidth = 190; // Lebar gambar PDF
                    const pageHeight = pdf.internal.pageSize.height;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 60; // Margin atas 50px + header 10px

                    // Menambahkan header judul
                    pdf.setFontSize(16);
                    pdf.text("Grafik Data Total", 10, 20); // Posisi judul di halaman

                    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight - position;

                    while (heightLeft >= 0) {
                        pdf.addPage();
                        position = 10; 
                        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    pdf.save("dashboard-chart.pdf");
                }).catch((error) => {
                    console.error("Error generating PDF:", error);
                });
            }).catch((error) => {
                console.error("Error importing html2canvas:", error);
            });
        }).catch((error) => {
            console.error("Error importing jsPDF:", error);
        });
    };

    const handleNavigate = (path) => {
        navigate(path);
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
        return <div>Anda tidak memiliki akses, sehingga telah terjadi eror: {error}</div>;
    }

    return (
        <div className="container-dashboard">
            <div className="row">
                <div className="col-lg-12">
                    <Header />
                </div>
                <div className="col-lg-12">
                    {dashboardData ? (
                        <div className="dashboard-card">
                            <div className="dashboard-stats">
                                <div className="dashboard-stat">
                                    <h3>Total User</h3>
                                    <p>{dashboardData.count_user?.total_user || 0}</p>
                                </div>
                                <div className="dashboard-stat">
                                    <h3>Total Lab</h3>
                                    <p>{dashboardData.count_lab?.total_lab || 0}</p>
                                </div>
                                <div className="dashboard-stat" onClick={() => handleNavigate("/peminjaman")}>
                                    <h3>Total Peminjaman</h3>
                                    <p>{dashboardData.count_peminjaman?.total_peminjaman || 0}</p>
                                </div>
                                <div className="dashboard-stat" onClick={() => handleNavigate("/penjadwalan")}>
                                    <h3>Total Jadwal</h3>
                                    <p>{dashboardData.count_jadwal?.total_jadwal || 0}</p>
                                </div>
                            </div>
                            <canvas ref={chartRef}></canvas>
                            <button onClick={handleDownload} className="btn btn-primary mt-3">Download Chart (PNG)</button>
                            <button onClick={handleDownloadPDF} className="btn btn-secondary mt-3">Download Chart (PDF)</button>
                            <button onClick={() => handleNavigate("/laporan-bulanan")} className="btn btn-secondary mt-3">Laporan Bulanan</button>
                            <div className="dashboard-stats">
                                <div className="dashboard-stat">
                                    <h3>Total User Today</h3>
                                    <p>{dashboardData.count_user?.total_user_today || 0}</p>
                                </div>
                                <div className="dashboard-stat">
                                    <h3>Total Peminjaman Today</h3>
                                    <p>{dashboardData.count_peminjaman?.total_peminjaman_today || 0}</p>
                                </div>
                                <div className="dashboard-stat">
                                    <h3>Total Jadwal Today</h3>
                                    <p>{dashboardData.count_jadwal?.total_jadwal_today || 0}</p>
                                </div>
                            </div>
                            <div className="dashboard-list">
                                <div className="dashboard-list-section">
                                    <h3>New Users</h3>
                                    <ul>
                                        {dashboardData.new_user?.length > 0 ? dashboardData.new_user.map(user => (
                                            <li key={user.id}>
                                                <img src={user.profile_picture} alt={user.full_name} className="user-image"/>
                                                <span>{user.full_name} ({user.nim_nip})</span>
                                            </li>
                                        )) : <li>No new users</li>}
                                    </ul>
                                </div>
                                <div className="dashboard-list-section">
                                    <h3>New Jadwal</h3>
                                    <ul>
                                        {dashboardData.new_jadwal?.length > 0 ? dashboardData.new_jadwal.map(jadwal => (
                                            <li key={jadwal.id}>
                                                <span>{jadwal.kegiatan} - {jadwal.name_laboratorium}</span>
                                            </li>
                                        )) : <li>No new jadwal</li>}
                                    </ul>
                                </div>
                                <div className="dashboard-list-section">
                                    <h3>New Peminjaman</h3>
                                    <ul>
                                        {dashboardData.new_peminjaman?.length > 0 ? dashboardData.new_peminjaman.map(peminjaman => (
                                            <li key={peminjaman.id}>
                                                <span>{peminjaman.kegiatan} - {peminjaman.peminjaman_name}</span>
                                            </li>
                                        )) : <li>No new peminjaman</li>}
                                    </ul>
                                </div>
                                <div className="dashboard-list-section">
                                    <h3>User Teraktif Meminjam</h3>
                                    <ul>
                                        {dashboardData.user_teraktif_meminjam?.length > 0 ? dashboardData.user_teraktif_meminjam.map((user, index) => (
                                            <li key={index}>
                                                <span>{user.full_name} - {user.jumlah_peminjaman} peminjaman</span>
                                            </li>
                                        )) : <li>No active users</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>No dashboard data available</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;



