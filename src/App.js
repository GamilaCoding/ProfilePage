import './App.css';
import { Link, Routes, Router, Route, Switch } from "react-router-dom";
import UserProfile from "./Components/Profile/UserProfile";
import ContactForm from "./Components/ContactForm/ContactForm";
import Packages from './Components/PricePage/Packages';

function App() {
  return (
    <>
      <div className="App">
        <UserProfile/>
        <Routes>
        <Route path="/profile" element={<UserProfile />} />
          <Route path="/Packages" element={<Packages />} />
          <Route path="/ContactForm" element={<ContactForm />} />
        </Routes>

      </div>
    </>
);
}

export default App;
