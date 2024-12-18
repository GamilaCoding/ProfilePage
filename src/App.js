import './App.css';
import UserProfile from "./Components/Profile/UserProfile";
import ContactForm from "./Components/ContactForm/ContactForm";
// import PricePage from "./Components/PricePage/PricePage";
// import {  Route, Router, Routes } from 'react-router-dom';
// import ErrorBoundary from "./Components/ErrorBoundary";
// import AccountSetting from "./Components/AccountSettings/AccountSettings";
import Packages from './Components/PricePage/Packages';


function App() {
  return (
    <div className="App">
      {/* <UserProfile />
      <ContactForm /> */}
      <Packages />
      {/* <AccountSetting /> */}
      {/* <Router>
        <Routes>
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path='./Components/PricePage' element={<PricePage />} />
      </Routes>
      <ErrorBoundary />
      </Router>
       */}
    </div>
  );
}

export default App;
