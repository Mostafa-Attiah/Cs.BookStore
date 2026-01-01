import { useEffect, useState } from "react";

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    author: "",
    price: "",
    category: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch books from backend
  const fetchBooks = () => {
    fetch("http://localhost:5000/api/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // Add or update book
  const submitBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    if (isEditing) {
      // UPDATE
      await fetch(`http://localhost:5000/api/books/${form.id}`, {
        method: "PUT",
        body: formData,
      });
      setIsEditing(false);
    } else {
      // ADD
      await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: formData,
      });
    }

    // Reset form
    setForm({ id: null, title: "", author: "", price: "", category: "", image: null });
    fetchBooks();
  };

  // Delete book
  const deleteBook = async (id) => {
    await fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  // Edit book - populate form
  const editBook = (book) => {
    setForm({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      category: book.category,
      image: null, // keep null, user can upload new image
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>

      <form onSubmit={submitBook} className="mb-4">
        <input className="form-control mb-2" name="title" placeholder="Title" onChange={handleChange} value={form.title} />
        <input className="form-control mb-2" name="author" placeholder="Author" onChange={handleChange} value={form.author} />
        <input className="form-control mb-2" name="price" placeholder="Price" onChange={handleChange} value={form.price} />
        <input className="form-control mb-2" name="category" placeholder="Category" onChange={handleChange} value={form.category} />
        <input type="file" className="form-control mb-2" name="image" onChange={handleChange} />
        <button className="btn btn-primary">{isEditing ? "Update Book" : "Add Book"}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>${b.price}</td>
              <td>
                {b.image && <img src={`http://localhost:5000/uploads/${b.image}`} alt={b.title} width="50" />}
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => editBook(b)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteBook(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

