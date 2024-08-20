import React from "react";
import {AiOutlineClose} from "react-icons/ai";

const ButtonClose = ({onClick}) => {
    return (
        <button
            className="bg-pink p-1 rounded-1 d-flex justify-items-center"
            onClick={onClick}>
            <AiOutlineClose />
        </button>
    )
}
export default ButtonClose