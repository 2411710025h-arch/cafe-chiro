export interface MenuItem {
  name: string;
  price: number;
}

export interface MenuCategory {
  key: "coffee" | "nonCoffee" | "dessert" | "lightFood";
  items: MenuItem[];
}

/** Item names are kept in English across locales by design (café convention). */
export const menu: MenuCategory[] = [
  {
    key: "coffee",
    items: [
      { name: "Espresso", price: 500 },
      { name: "Americano", price: 550 },
      { name: "Café Latte", price: 650 },
      { name: "Café Mocha", price: 700 }
    ]
  },
  {
    key: "nonCoffee",
    items: [
      { name: "Matcha Latte", price: 680 },
      { name: "Earl Grey Tea", price: 600 },
      { name: "Yuzu Sparkling", price: 650 }
    ]
  },
  {
    key: "dessert",
    items: [
      { name: "Basque Cheesecake", price: 720 },
      { name: "Tiramisu", price: 720 },
      { name: "Croffle", price: 780 }
    ]
  },
  {
    key: "lightFood",
    items: [
      { name: "Avocado Egg Toast", price: 900 },
      { name: "Ham & Cheese Croissant", price: 850 }
    ]
  }
];

export interface ChargePlan {
  minutes: number;
  price: number;
}

export const catCharge: ChargePlan[] = [
  { minutes: 60, price: 1100 },
  { minutes: 90, price: 1500 },
  { minutes: 120, price: 1900 }
];

export const extension = { minutes: 15, price: 250 };

export function formatYen(value: number): string {
  return "¥" + value.toLocaleString("ja-JP");
}
