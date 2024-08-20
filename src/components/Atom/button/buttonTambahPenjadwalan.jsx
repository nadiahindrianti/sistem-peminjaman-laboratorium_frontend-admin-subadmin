import React from "react";

const ButtonTambahPenjadwalan = ({ onClick, label }) => {
    return <button 
    
                className="btn bg-button text-white fw-medium  rounded-4"
                onClick={onClick}
                style={{background: '#146EFF', width: '200px', float: 'right', marginRight: '-520px'}}>
                {label}
            </button>
}
export default ButtonTambahPenjadwalan