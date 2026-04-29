const BASE_URL = "http://localhost:3001/orders";

// 📡 Get all data (parents + students + menu + orders)
export const fetchAllData = async () => {
  const res = await fetch(`${BASE_URL}/getAllData`);
  return res.json();
};

// 📡 Create order
export const createOrder = async (payload) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return res.json();
};
export const loadAllData = async (
  setData,
  setLoading
) => {
  try {
    const res = await fetchAllData();
    setData(res);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};