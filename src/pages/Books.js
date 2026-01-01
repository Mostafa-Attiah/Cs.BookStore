import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function Books() {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);

  
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container py-1">
      <h1 className="text-center my-3 fst-italic">Our Books</h1>
      <div className="row g-5">
        {books.map((book) => (
          <div className="col-md-3" key={book.id}>
            <BookCard book={book} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
