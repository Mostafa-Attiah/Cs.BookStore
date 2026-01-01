import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundImage: "url('/background.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white",
      }}
    >
    
      <h1 className=" fw-bold">Welcome to CSSTORE</h1>
      <Link
        to="/books"
        className="btn btn-lg btn-primary shadow"
        style={{ borderRadius: "30px", padding: "10px 30px" }}
      >
        Shop Now
      </Link>
    </div>
  );
}