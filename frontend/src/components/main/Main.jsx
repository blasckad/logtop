import React, {useState, useContext} from 'react';
import AuthForm from '../auth/AuthForm';
import CreateOrder from '../createorder/CreateOrder';
import Info from '../info/Info';
import TopBar from '../topbar/TopBar';
import { AuthContext } from '../../App';
import Orders from '../orders/Orders';

const Main = () => {

  // const { isAuthenticated, setAuth } = useContext(AuthContext);

  return (
    <div>
      <TopBar/>
      <Info/>
      <CreateOrder/>
      <NoAuthComponent/>
    </div>
  )

};
export default Main;

const NoAuthComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === false) {
    return (
        <AuthForm />
    )
  } else {
    return (
      <Orders/>
    )
  }
  
}