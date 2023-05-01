import { Routes, Route } from "react-router-dom";
import { Auth, Home, Login, Signup } from './pages/pages';
import Authentication from './privateRoute/Authentication'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './input.css';

function App() {
  return (
    // Main div
    <div className="main container mx-auto  min-h-[100vh] min-w-[100vw]">

      {/* for toast notification */}
      <ToastContainer autoClose={1500} hideProgressBar pauseOnHover={false} />

      <Routes>
        <Route path="/" element={<Authentication> <Home /> </Authentication>} />
        <Route path="/auth" element={<Auth />} >
          <Route index element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
