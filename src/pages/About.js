 import React from "react";

function About() {
  return (
    <div className="container my-5">
      
      <div className="bg-light p-5 rounded-4 shadow-sm text-center">
        <h1 className="fw-bold mb-3 text-primary">About Our CS-Bookstore</h1>
        <p className="lead text-muted mb-4">
          Welcome to <strong>CS-Store</strong>, your friendly online bookstore.
          We believe reading should be easy, enjoyable, and accessible for
          everyone. Our goal is to provide a wide range of books from all
          computer science genres.
        </p>
      </div>

     
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="p-4 border rounded-3 shadow-sm h-100">
            <h4 className="fw-semibold text-secondary">Our Mission</h4>
            <p className="text-muted">
              This website was created as a learning project to practice web
              design, frontend development, and UI/UX. It is fully built using{" "}
              <strong>ReactJS</strong> with a simple and clean design.
            </p>
          </div>
        </div>

        <div className="col-md-6 mt-4 mt-md-0">
          <div className="p-4 border rounded-3 shadow-sm h-100">
            <h4 className="fw-semibold text-secondary">Thank You</h4>
            <p className="text-muted">
              Thank you for visiting <strong>CS-Store</strong>! We hope you enjoy
              exploring our collection and find books that inspire your journey
              in computer science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
