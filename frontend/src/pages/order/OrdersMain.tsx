import { useState } from "react";
import OrderPage from "./OrderPage";
import OrdersList from "./OrdersList";

export default function OrdersMain() {

  const [tab, setTab] = useState<string>("order");

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h3>Order System</h3>

        <div className="btn-group my-3">

          <button
            className={`btn btn-${tab === "order" ? "primary" : "outline-primary"}`}
            onClick={() => setTab("order")}
          >
            Place Order
          </button>

          <button
            className={`btn btn-${tab === "history" ? "primary" : "outline-primary"}`}
            onClick={() => setTab("history")}
          >
            Order History
          </button>

        </div>

        {tab === "order" && <OrderPage />}
        {tab === "history" && <OrdersList />}

      </div>

    </div>
  );
}