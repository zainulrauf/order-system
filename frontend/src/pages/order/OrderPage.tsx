import { useState, useEffect } from "react";
import { fetchAllData, createOrder } from "../../api/orderApi";

type Student = {
  id: string;
  name: string;
  parentId: string;
};

type Parent = {
  id: string;
  name: string;
  walletBalance: number;
};

type MenuItem = {
  id: string;
  name: string;
};

type CartItem = {
  menuItemId: string;
  quantity: number;
};

type ApiData = {
  students: Student[];
  parents: Parent[];
  menuItems: MenuItem[];
};


export default function OrderPage() {
  const [data, setData] = useState<ApiData | null>(null);

  const [studentId, setStudentId] = useState<string>("");
  const [menuItemId, setMenuItemId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const res: ApiData = await fetchAllData();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedStudent = data?.students?.find(
    (s) => s.id === studentId
  );

  const parent = data?.parents?.find(
    (p) => p.id === selectedStudent?.parentId
  );

  const addToCart = () => {
    if (!menuItemId) return;

    setCart([{ menuItemId, quantity: Number(quantity) }]);
    setMenuItemId("");
    setQuantity(1);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.menuItemId !== id));
  };

  const placeOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await createOrder({
        studentId,
        items: cart,
      });

      if ((res as any).code && (res as any).message) {
        throw new Error((res as any).message);
      }

      setMessage("Order placed successfully");
      setCart([]);
      setStudentId("");
      loadData();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4">Order System</h3>

        <div className="mb-3">
          <select
            className="form-control"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select Student</option>
            {data?.students?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {parent && (
          <div className="alert alert-info">
            <div><b>Parent:</b> {parent.name}</div>
            <div><b>Wallet:</b> ${parent.walletBalance}</div>
          </div>
        )}

        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <select
              className="form-control"
              value={menuItemId}
              onChange={(e) => setMenuItemId(e.target.value)}
            >
              <option value="">Select Menu Item</option>

              {data?.menuItems?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-success w-100" onClick={addToCart}>
              Add
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <tbody>
            {cart.map((i) => (
              <tr key={i.menuItemId}>
                <td>{i.menuItemId}</td>
                <td>{i.quantity}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem(i.menuItemId)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn btn-primary w-100"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing..." : "Place Order"}
        </button>

        {message && (
          <div className="alert alert-info mt-3">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}