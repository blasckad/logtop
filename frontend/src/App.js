import React, {useContext, createContext, useState} from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import CreateOrder from './components/createorder/CreateOrder.jsx';
import Admin from './components/admin/Admin.jsx';
import { checkAdmin } from './api/admin.js';
import Orders from './components/orders/Orders.jsx';
import './styles/App.css'

const AuthContextType = {
  isAuthenticated: false,
  setAuth: () => {}
};

const ReloadContextType = {
  Reolad: false,
  setReolad: () => {}
};

// const AdminContextType = {
//   isAdmin: false,
//   setAdmin: () => {}
// };

export const ReloadContext = createContext(ReloadContextType);
export const AuthContext = createContext(AuthContextType);
// export const AdminContext = createContext(AdminContextType);

function App() {

  let isUser = false

  if (localStorage.getItem("token")) {
    isUser = true
  }

  const [isAuthenticated, setAuth] = useState(isUser)
  // const { isAuthenticated, setAuth } = useContext(AuthContext)
  
  

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<PrivateRoute />}>
            {/* <Route path='/orders' element={<Orders />} /> */}
            <Route path='/admin' element={<Admin />} />
          </Route>
          {/* <Route element={<AdminRoute />}> */}
              
          {/* </Route> */}
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>

  );
}

// const AdminRoute = () => {
//   const location = useLocation();
//   const { isAdmin, setAdmin } = useContext(AdminContext);
//   const CheckAdmin = checkAdmin(localStorage.getItem("token"));

//   CheckAdmin.then((result) => {
//         setAdmin(result)
//   })

//   return (
//     isAdmin === true ?
//       <Outlet />
//       :
//       <Navigate to="/" state={{ from: location }} replace />
//   );  
// }


const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return (
    isAuthenticated === true ?
      <Outlet />
      :
      <Navigate to="/" state={{ from: location }} replace />
  );
}

export default App;
