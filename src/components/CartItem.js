export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="d-flex justify-content-between align-items-center border p-3 mb-2">
      <div>
        <h6>{item.title}</h6>
        <small className="text-muted">{item.author}</small>
        <p>${item.price}</p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          className="form-control"
          style={{ width: "70px" }}
          onChange={(e) => onUpdate(item.id, Number(e.target.value))}
        />
        <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}