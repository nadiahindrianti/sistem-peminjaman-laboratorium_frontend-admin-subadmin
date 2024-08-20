import React from "react"
const ButtonHapus = ({onClick, icon}) => {
    return <button 
            onClick={onClick}
            style={{border: 'none', background: 'none'}}>
            {icon}
        </button>
}
export default ButtonHapus