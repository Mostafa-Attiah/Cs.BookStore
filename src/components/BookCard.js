import { useState } from "react";

export default function BookCard({ book, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(book);         
    setAdded(true);      

    setTimeout(() => {
      setAdded(false);    
    }, 1500);
  };

  return (
    <div className="card h-100">
      <img
        src={book.image ? `http://localhost:5000/uploads/${book.image}` : "/no-image.png"}
        className="card-img-top"
        alt={book.title}
        style={{ height: "350px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text text-muted">{book.author}</p>
        <p className="fw-bold">${book.price}</p>

        <button className="btn btn-primary mt-auto" onClick={handleAdd} disabled={added}>
          {added ? "Added ✓" : "Add to Cart"}
        </button>

        {added && (
          <small className="text-success mt-2 d-block">
            ✔ Added to cart
          </small>
        )}
      </div>
    </div>
  );
}
