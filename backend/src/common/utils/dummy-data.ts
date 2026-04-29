export const parentMap = new Map([
    ["p1", { id: "p1", name: "John", walletBalance: 50 }]
  ]);
  
  export const studentMap = new Map([
    ["s1", { id: "s1", name: "Kid", allergens: ["nuts"], parentId: "p1" }],
    ["s2", { id: "s2", name: "Sara", allergens: [], parentId: "p1" }]
  ]);
  
  export const menuItemMap = new Map([
    ["m1", { id: "m1", name: "Peanut Bar", price: 10, allergens: ["nuts"], available: true }],
    ["m2", { id: "m2", name: "Sandwich", price: 8, allergens: [], available: true }]
  ]);
  
  export const orders: any[] = [];