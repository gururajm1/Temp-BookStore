import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dash from './Dash';
import Details from './details';
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Dummy from './Dummy';
import Heroroot from './Hero/Heroroot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Heroroot />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
