const BASE_URL = "http://localhost:3001/orders";

export type ApiData = {
  students: any[];
  parents: any[];
  menuItems: any[];
  orders: any[];
};

export type CartItem = {
  menuItemId: string | number;
  quantity: number;
};

export type CreateOrderPayload = {
  studentId: string;
  items: CartItem[];
};

export type CreateOrderResponse = {
  code?: string;
  message?: string;
};
export const fetchAllData = async (): Promise<ApiData> => {
  const res = await fetch(`${BASE_URL}/getAllData`);
  return res.json();
};
export const createOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
export const loadAllData = async (
  setData: (data: ApiData) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  try {
    const res = await fetchAllData();
    setData(res);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};