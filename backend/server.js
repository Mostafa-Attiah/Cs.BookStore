const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "csstore"
});

db.connect((err) => {
  if (err) console.log("DB Error:", err);
  else console.log("MySQL Connected");
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// USERS AUTH
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.status(500).json({ message: "Email already exists" });
    res.json({ message: "User registered successfully" });
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0)
        return res.status(401).json({ message: "Invalid login" });

      const user = result[0];
      res.json({
        id: user.id,
        name: user.name,
        role: user.role // 👈 VERY IMPORTANT
      });
    }
  );
});


// BOOKS CRUD
app.get("/api/books", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/books", upload.single("image"), (req, res) => {
  const { title, author, price, category } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !author || !price)
    return res.status(400).json({ message: "Required fields missing" });

  const sql = "INSERT INTO books (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, author, price, category, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book added successfully" });
  });
});

app.delete("/api/books/:id", (req, res) => {
  const sql = "DELETE FROM books WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted" });
  });
});

// ORDERS
app.post("/api/orders", (req, res) => {
  const { userId, cart, total } = req.body;
  if (!userId || cart.length === 0)
    return res.status(400).json({ message: "Invalid order data" });

  const orderSql = "INSERT INTO orders (user_id, total) VALUES (?, ?)";
  db.query(orderSql, [userId, total], (err, result) => {
    if (err) return res.status(500).json(err);

    const orderId = result.insertId;
    const itemsSql = "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ?";
    const itemsValues = cart.map((item) => [orderId, item.id, item.quantity, item.price]);

    db.query(itemsSql, [itemsValues], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order placed successfully" });
    });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
