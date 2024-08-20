import React from "react"
import NavbarEditUser from "../../Molekul/navbarEditUser"

const Header = ({title}) => {
    return(
        <header>
          <div className="container-xxl max-width-xxl">
            <div className="row m-2">
              <NavbarEditUser title={title} />
            </div>
          </div>
        </header>
    )
}
export default Header