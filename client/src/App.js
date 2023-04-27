import './input.css';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes, Route } from "react-router-dom";
import Authentication from './privateRoute/Authentication'

function App() {
  return (
    // Main screen
    <div className="container mx-auto  min-h-[100vh] min-w-[100vw]">
      <Routes>
        <Route path="/" element={
          <Authentication>
            <Home />
          </Authentication>
        } />
        <Route path="/auth" element={<Auth />} >
          <Route index element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
