import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context"; // ✅ Import AuthProvider
import "./App.css";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import PregnancyTips from "./components/PregnancyTips";
import Navbar from "./components/Navbar"; 
import DoctorsPage from "./components/Doctors";
import Login from "./components/Login";
import OtpVerification from "./components/OtpVerify";
import Welcome from "./components/Welcome";
import MedicalHistoryForm from "./components/MedicalHistory";
import MakeAppointment from "./components/Appointment";
import Appointments from "./components/AllAppointments";
import CareGuidelines from "./components/CareGuidelines";
import ExerciseDiet from "./components/DietAndExercise";
import Exercise from "./components/Exercise";
import Community from "./components/Community";
import Diet from "./components/Diet";
import ChildShop from "./components/ChildShop";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import DietPlanner from "./components/DietPlanner";
import { CartProvider } from "./cartContext";
import AddToCart from "./components/AddToCart";
import BabyName from "./components/BabyName";
import DoctorCall from "./components/DoctorCall";
import PatientCall from "./components/PatientCall";
import YouTubeAudio from "./components/AudioBooks";
import DrugCheck from "./components/DrugCheck";
import PreNatalCare from "./components/preNatalCare";
import PostNatalCare from "./components/postNatalCare";
import Payment from "./components/Payment";
import Chatbot from "./components/ChatBot";
import Expert from "./components/Expert";
import CloudOcr from "./components/CloudOcr";
import PredictForm from "./components/frontend";

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pregnancyTips" element={<PregnancyTips />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/medicalHistory" element={<MedicalHistoryForm />} />
          <Route path="/book-appointment" element={<MakeAppointment />} />
          <Route path="/all-appointments" element={<Appointments />} />
          <Route path="/care-guidelines" element={<CareGuidelines />} />
          <Route path="/diet-and-exercise" element={<ExerciseDiet />} />
          <Route path="/exercise" element={<PredictForm/>} />
          <Route path="/community" element={<Community />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/childShop" element={<ChildShop />} />
          <Route path = "/dashboard" element = {<Dashboard/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path = "/dietPlanner" element = {<DietPlanner/>}/>
          <Route path = "/add-to-cart" element = {<AddToCart/>}/>
          <Route path = "/babyName" element = {<BabyName/>}/>
          <Route path="/doctor-call" element={<DoctorCall />} />
        <Route path="/patient-call" element={<PatientCall />} />
        <Route path="/audio-books" element={<YouTubeAudio />} />
        <Route path = "/drugCheck" element = {<DrugCheck/>}/>
        <Route path = "/preNatalCare" element = {<PreNatalCare/>}/>
        <Route path = "/postNatalCare" element = {<PostNatalCare/>}/>
        <Route path = "/payment" element = {<Payment/>}/>
        <Route path = "/chatBot" element = {<Chatbot/>}/>
        <Route path = "/expert" element = {<Expert/>}/>
        <Route path = "/cloudOcr" element = {<CloudOcr/>}/>
        <Route path = "/predictForm" element = {<PredictForm/>}/>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
