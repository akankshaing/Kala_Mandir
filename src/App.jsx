import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { ColorProvider } from "./context/ColorContext.jsx";
import { FilterOptionsProvider } from "./context/FilterOptionsContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";

import Layout from "./components/Layout.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Home from "./pages/Home.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Account from "./pages/Account.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";

export default function App() {
  return (
    <ProductProvider>
      <ColorProvider>
      <FilterOptionsProvider>
      <ReviewProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <OrderProvider>
              <AdminAuthProvider>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success/:id" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/about-us" element={<AboutUs />} />
                  </Route>

                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="orders" element={<AdminOrders />} />
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AdminAuthProvider>
            </OrderProvider>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
      </ReviewProvider>
      </FilterOptionsProvider>
      </ColorProvider>
    </ProductProvider>
  );
}
