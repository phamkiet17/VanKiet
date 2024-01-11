import React from "react";
import PageLoading from "../../components/PageLoading";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthModal from "../../components/AuthModal";
import Overlay from "../../components/Overlay";
import { Outlet } from "react-router-dom";
import { MainContextProvider } from "../../context/MainContext";
import { AuthContextProvider } from "../../context/AuthContext";

export default function MainLayout() {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <PageLoading />
        <Header />
        <Navbar />
        <Overlay />

        {/* page */}
        <Outlet />

        <Footer />
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
}
