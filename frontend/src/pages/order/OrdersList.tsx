import { useEffect, useMemo, useState } from "react";
import { fetchAllData } from "../../api/orderApi";

type OrderItem = {
  menuItemId: number;
  quantity: number;
};

type Order = {
  id: number;
  studentId: number;
  items: OrderItem[];
  total: number;
  status: string;
};

type Student = {
  id: number;
  name: string;
  parentId: number;
};

type Parent = {
  id: number;
  name: string;
  walletBalance: number;
};

type ApiData = {
  orders: Order[];
  students: Student[];
  parents: Parent[];
};
export default function OrdersList() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res: ApiData = await fetchAllData();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const studentMap = useMemo(() => {
    if (!data?.students) return new Map<number, Student>();
    return new Map<number, Student>(
      data.students.map((s) => [s.id, s])
    );
  }, [data]);

  const parentMap = useMemo(() => {
    if (!data?.parents) return new Map<number, Parent>();
    return new Map<number, Parent>(
      data.parents.map((p) => [p.id, p])
    );
  }, [data]);

  const statusClass = (status: string): string => {
    if (status === "CONFIRMED") return "bg-success";
    if (status === "FAILED") return "bg-danger";
    return "bg-warning";
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Order History</h4>

      {loading && <p>Loading...</p>}

      {!loading && data?.orders?.length === 0 && (
        <p className="text-muted">No orders found</p>
      )}

      {!loading && data && data.orders.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Parent</th>
              <th>Wallet</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.orders.map((order) => {
              const student = studentMap.get(order.studentId);
              const parent = student
                ? parentMap.get(student.parentId)
                : undefined;

              return (
                <tr key={order.id}>
                  <td style={{ fontSize: "12px" }}>{order.id}</td>

                  <td>{student?.name ?? order.studentId}</td>

                  <td>{parent?.name ?? "-"}</td>

                  <td>${parent?.walletBalance ?? "-"}</td>

                  <td>
                    {order.items.map((i, idx) => (
                      <div key={idx}>
                        {i.menuItemId} × {i.quantity}
                      </div>
                    ))}
                  </td>

                  <td>${order.total}</td>

                  <td>
                    <span className={`badge ${statusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}