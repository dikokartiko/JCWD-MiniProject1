import "./App.css";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import "flowbite";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
