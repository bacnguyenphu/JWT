import { Route, Routes } from "react-router-dom";
import { GroupRole, Home, Login, Register, Roles } from "./components";
import { ToastContainer } from 'react-toastify';
import { GROUPROLE, HOME, LOGIN, REGISTER, ROLES, USERS } from "./utils/paths";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import { User } from "./components/ManageUser";
import DefaultLayout from "./Layouts/DefaultLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={HOME} element={<DefaultLayout/>}>
          <Route index element={<Home/>}/>
          <Route path={USERS} element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path={ROLES} element={<PrivateRoute><Roles /></PrivateRoute>} />
          <Route path={GROUPROLE} element={<PrivateRoute><GroupRole /></PrivateRoute>} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
