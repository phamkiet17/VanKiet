import { useState } from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CoursePage from "./pages/CoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseOrderPage from "./pages/CourseOrderPage";
import Page404 from "./pages/Page404";
import PaymentPage from "./pages/PaymentPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCourse from "./pages/ProfilePage/MyCourse";
import MyPayment from "./pages/ProfilePage/MyPayment";
import MyInfo from "./pages/ProfilePage/MyInfo";
import PATH from "./constants/paths";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<MainLayout />}>
          <Route index element={<Homepage />} />

          <Route element={<PrivateRoute redirectPath="/" />}>
            <Route path={PATH.COURSE.ORDER} element={<CourseOrderPage />} />
            <Route path={PATH.PROFILE.INDEX} element={<ProfilePage />}>
              <Route index element={<MyInfo />} />
              <Route path={PATH.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATH.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>

          <Route path={PATH.COURSE.INDEX} element={<CoursePage />}></Route>
          <Route path={PATH.COURSE.DETAIL} element={<CourseDetailPage />} />
          <Route path={PATH.COURSE.ORDER} element={<CourseOrderPage />} />

          <Route path={PATH.BLOG.INDEX} element={<BlogPage />} />
          <Route path={PATH.BLOG.DETAIL} element={<BlogDetailPage />} />

          <Route path={PATH.CONTACT} element={<ContactPage />} />

          <Route path={PATH.PROFILE.INDEX} element={<ProfilePage />}>
            <Route index element={<MyInfo />} />
            <Route path={PATH.PROFILE.MY_COURSE} element={<MyCourse />} />
            <Route path={PATH.PROFILE.MY_PAYMENT} element={<MyPayment />} />
          </Route>

          <Route path={PATH.ABOUT} element={<AboutPage />} />
          <Route path={PATH.PAYMENT} element={<PaymentPage />} />
          <Route path={PATH.PRIVACY} element={<PrivacyPage />} />

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
