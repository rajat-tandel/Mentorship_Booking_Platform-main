import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Loginpage from "./Loginpage";
import Home from "./Home";
import HomePageDashboard from "./HomePageDashboard";
import Dashboard from "./Dashboard";
import Finance from "./Finance";
import Career from "./Career";
import Business from "./Business";
import PersonalGrowth from "./PersonalGrowth";
import Technology from "./Technology";
import Academic from "./Academic"; 
import Aboutus from "./Aboutus"; 
import AboutUsBefore from "./AboutUsBefore";
import Contact from "./Contact"; 
import PrivacyPolicy from "./PrivacyPolicy"; 
import TermsofService from "./TermsofService";
import ContactBefore from "./ContactBefore" 
import PrivacyPolicyBefore from "./PrivacyPolicyBefore"; 
import TermsOfServiceBefore from "./TermsOfServiceBefore";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Loginpage />} />
        <Route path="/homepagedashboard" element={<HomePageDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/career" element={<Career />} />
        <Route path="/business" element={<Business />} />
        <Route path="/personalgrowth" element={<PersonalGrowth />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/aboutUsBefore" element={<AboutUsBefore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsofservice" element={<TermsofService />} />
        <Route path="/contactbefore" element={<ContactBefore />} />
        <Route path="/privacypolicybefore" element={<PrivacyPolicyBefore />} />
        <Route path="/termsofservicebefore" element={<TermsOfServiceBefore />} />
      </Routes>
    </Router>
  );
}

export default App;
