
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";


function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return null;
  return children;
}

function App() {
  return (
    <Router>
     <CartProvider>
        <Navbar />
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin"element={<AdminRoute><Admin /></AdminRoute>}/>
            <Route path="/admin"element={ <PrivateRoute role="admin"> <Admin /></PrivateRoute>}/>
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
