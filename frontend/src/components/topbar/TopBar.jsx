import React, {useState, useContext} from 'react';
import classes from './TopBar.module.css'
import { AuthContext } from '../../App';
import { Link } from "react-router-dom";

const TopBar = () => {

  const ToInfo = () => {
    window.location.href = "#info";
  };

  const ToCreateOrder = () => {
    window.location.href = "#createorder";
  };

  return (
    <div className={classes.wrap}>
      <div onClick={ToInfo} className={classes.header}>О нас</div>
      <div onClick={ToCreateOrder} className={classes.header}>Сделать заказ</div>
      <AuthComponent/>
    </div>
  );
};
export default TopBar;

const AuthComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { setAuth } = useContext(AuthContext);

  const LogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
  }

  const ToAuth = () => {
    window.location.href = "#auth";
  };

  const ToOrders = () => {
    window.location.href = "#orders";
  };

  

  if (isAuthenticated === false) {
    return (
      <div onClick={ToAuth} className={classes.header}>Вход / Регистрация</div>
    )
  } else {
    return (
      <div className={classes.authheaders}>
        <div onClick={ToOrders} className={classes.header}>Мои заказы</div>
        {/* <Link to="/orders">Мои заказы</Link> */}
        <div className={classes.out} onClick={LogOut}>Выйти</div>
      </div>
    )
  }
  
}