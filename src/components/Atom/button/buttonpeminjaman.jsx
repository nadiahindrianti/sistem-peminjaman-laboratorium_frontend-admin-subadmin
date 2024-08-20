import React from "react";
import { MdEditSquare } from "react-icons/md";

const ButtonTambahPeminjaman = ({ onClick, label }) => {
    return <button className="button-peminjaman" onClick={onClick} style={{marginLeft: "10px", display: "flex", marginTop: "5px", border: 'none'}}><MdEditSquare color='rgba(51, 132, 178, 0.86)' /></button>
}
export default ButtonTambahPeminjaman