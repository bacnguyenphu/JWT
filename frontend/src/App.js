import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./components";
import { ToastContainer } from 'react-toastify';
import { LOGIN,REGISTER } from "./utils/paths";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import { User } from "./components/ManageUser";

function App() {
  return (
    <>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path="/user" element={<PrivateRoute><User/></PrivateRoute>} />
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
