import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const checkout = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        cart,
        total,
      }),
    });

    const data = await res.json();
    alert(data.message);
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div className="container py-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-muted">Cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div>
                <strong>{item.title}</strong>
                <p className="mb-0 text-muted">
                  Quantity: {item.quantity}
                </p>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>

          <button className="btn btn-success mt-2" onClick={checkout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
