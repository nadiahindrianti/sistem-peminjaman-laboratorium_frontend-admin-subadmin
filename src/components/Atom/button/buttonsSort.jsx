import React from 'react'
import { TbArrowsSort } from "react-icons/tb";

function ButtonsSort({onClick}) {
  return (
    <button
      style={{background: 'none', border: 'none',paddingLeft: '5px'}}
      onClick={onClick}>
      <TbArrowsSort />
    </button>
  )
}

export default ButtonsSort