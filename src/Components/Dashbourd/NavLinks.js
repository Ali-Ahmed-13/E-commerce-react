import {
  faBox,
  faPen,
  faPlus,
  faTruckFast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "user/add",
    icon: faPlus,
    role: ["1995"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: faBox,
    role: ["1995", "1999"],
  },
  {
    name: "Add Categories",
    path: "category/add",
    icon: faPlus,
    role: ["1995", "1999"],
  },

  {
    name: "Products",
    path: "products",
    icon: faTruckFast,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "product/add",
    icon: faPlus,
    role: ["1995", "1999"],
  },
  {
    name: "Writer",
    path: "writer",
    icon: faPen,
    role: ["1995", "1996"],
  },
];
