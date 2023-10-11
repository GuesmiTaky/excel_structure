import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarMain from './navbar/NavBarMain'



const DashbordMain = () => {
    return (
        <div>
            <NavBarMain />
            <Outlet />
        </div>
    )
}

export default DashbordMain
