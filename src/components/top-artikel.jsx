/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/top-artikel.css"
import imagedashboard from "../assets/icon/shadow.png"
import { FaRegEye } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";


const Topartikel = () => {

    const handleViewMoreClick = () => {
        console.log('View More clicked!')
    }
    return (
        <div className="all-top-artikel">
            <div className="head-dashboard">
                <h6 className="txt-dashboard">Top Artikel</h6>
                <p className="txt-dashboard2" onClick={handleViewMoreClick}>View More</p>
            </div>

            <div className="showall-topartikel">
                <div className="show-artikel" >
                    <div className="img-top-artikel">
                        <img src={imagedashboard} alt="img-top-artikel" />
                    </div>
                    <div className="content-top-artikel">
                        <h4 className="title-top-artikel">The Role of Women Centers <br /> in Building Confidence</h4>
                        <p className="subtitle-top-artikel">Teknologi telah mengubah cara kita hidup, belajar, dan bekerja. Ini ...</p>
                            <div className="insight-topartikel">
                                <p className="icon-dashboard-top"> <FaRegEye/> 207</p>
                                <p className="icon-dashboard-top"> <FaRegComment/> 30 </p>
                                <p className="icon-dashboard-top"> <FaRegBookmark/> 10 </p>
                            </div>
                    </div>
                </div>
                <div className="show-artikel" >
                    <div className="img-top-artikel">
                        <img src={imagedashboard} alt="img-top-artikel" />
                    </div>
                    <div className="content-top-artikel">
                        <h4 className="title-top-artikel">How Women Centers <br />Support Well-being</h4>
                        <p className="subtitle-top-artikel">Salah satu aspek utama dari peran wanita dalam teknologi adalah...</p>
                            <div className="insight-topartikel">
                                <p className="icon-dashboard-top"> <FaRegEye/> 207</p>
                                <p className="icon-dashboard-top"> <FaRegComment/> 30 </p>
                                <p className="icon-dashboard-top"> <FaRegBookmark/> 10 </p>
                            </div>
                    </div>
                </div>
                <div className="show-artikel" >
                    <div className="img-top-artikel">
                        <img src={imagedashboard} alt="img-top-artikel" />
                    </div>
                    <div className="content-top-artikel">
                        <h4 className="title-top-artikel">Stories of Success from <br />Women Center Initiatives</h4>
                        <p className="subtitle-top-artikel">Wanita dan teknologi adalah kombinasi yang kuat. Mereka berinovasi,...</p>
                            <div className="insight-topartikel">
                                <p className="icon-dashboard-top"> <FaRegEye/> 207</p>
                                <p className="icon-dashboard-top"> <FaRegComment/> 30 </p>
                                <p className="icon-dashboard-top"> <FaRegBookmark/> 10 </p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topartikel