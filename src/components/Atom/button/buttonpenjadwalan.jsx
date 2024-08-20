import React from "react";
import { MdEditSquare } from "react-icons/md";

const ButtonEditPenjadwalan = ({ onClick, label }) => {
    return <button className="button-peminjaman" onClick={onClick} style={{marginLeft: "10px", marginTop: "17px", display: "flex", border: 'none'}}><MdEditSquare color='rgba(51, 132, 178, 0.86)' /></button>
}
export default ButtonEditPenjadwalan