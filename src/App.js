import { Route, Routes } from "react-router-dom";
import "./App.css";
// Website Pages
import HomePage from "./Pages/Website/HomePage/HomePage";
import WebsiteCategories from "./Pages/Website/Categories/Categories";
//. Auth Pages
import Login from "./Pages/Auth/AuthOperation/Login";
import Register from "./Pages/Auth/AuthOperation/Register";
import GoogleCallBack from "./Pages/Auth/AuthOperation/GoogleCallBack";
import Err404 from "./Pages/Auth/Errors/404";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
// Dashboard Pages
import Dashboard from "./Pages/Dashbourd/Dashboard";
// Users
import Users from "./Pages/Dashbourd/User/Users";
import User from "./Pages/Dashbourd/User/User";
import AddUser from "./Pages/Dashbourd/User/AddUser";
import Writer from "./Pages/Dashbourd/Writer";
/// Categories
import Categories from "./Pages/Dashbourd/Category/Categories";
import AddCategory from "./Pages/Dashbourd/Category/AddCategory";
import Category from "./Pages/Dashbourd/Category/Category";
//. Products
import Products from "./Pages/Dashbourd/Product/Products";
import AddProduct from "./Pages/Dashbourd/Product/AddProduct";
import Product from "./Pages/Dashbourd/Product/Product";
import Website from "./Pages/Website/Website/Website";
import SingleProduct from "./Components/Website/Products/SingleProduct/SingleProduct";
export default function App() {
  return (
    <div>
      <Routes>
        {/* Puplic Routes */}
        <Route path="" element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<WebsiteCategories />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>

        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />

        {/* Private Routes */}
        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={"1995"} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="categories/:id" element={<Category />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="products/:id" element={<Product />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
