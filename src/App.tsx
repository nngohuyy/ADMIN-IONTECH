import { Navigate, Route, Routes } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import SignInPage from "@/pages/sign-in/sign-in";
import DashboardPage from "@/pages/dashboard/dashboard";
import ProductsPage from "@/pages/products/products";
import AddProductPage from "@/pages/products/add-product";
import CategoriesPage from "./pages/categories/categories";

function App() {
  return (
    <Routes>
      <Route
        element={
          <DefaultLayout>
            <DashboardPage />
          </DefaultLayout>
        }
        path="/dashboard"
      />
      <Route
        element={
          <DefaultLayout>
            <ProductsPage />
          </DefaultLayout>
        }
        path="/products"
      />
      <Route
        element={
          <DefaultLayout>
            <AddProductPage />
          </DefaultLayout>
        }
        path="/products/add-product"
      />
      <Route
        element={
          <DefaultLayout>
            <CategoriesPage />
          </DefaultLayout>
        }
        path="/categories"
      />
      <Route element={<SignInPage />} path="/sign-in" />
      <Route element={<Navigate to="/dashboard" />} path="*" />
    </Routes>
  );
}

export default App;
