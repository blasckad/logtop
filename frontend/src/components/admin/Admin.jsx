import React, {useState, useEffect, useContext} from 'react';
import { Outlet, Navigate, useLocation, Redirect } from 'react-router-dom';
import CreateServices from './services/CreateServices';
import UpdateServices from './services/ServicesInfo';
import AdminOrders from './orders/AdminOrders';
import { checkAdmin } from '../../api/admin';
// import { AdminContext } from '../../App';

const Admin = () => {

    const [isAdmin, setAdmin] = useState()

    const CheckAdmin = checkAdmin(localStorage.getItem("token"));

    CheckAdmin.then((result) => {
        setAdmin(result)
    })

      if (isAdmin) {
        if (isAdmin === true) {
            return (
                <div>
                    <UpdateServices/>
                    <CreateServices/>
                    <AdminOrders/>
                </div>
            )
        }
      }
      if (isAdmin === false) {
        return <Navigate to="/"/>;
      }

};
export default Admin;