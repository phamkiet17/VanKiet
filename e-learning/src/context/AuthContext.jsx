import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import tokenMethod from "../utils/token";
import PATH from "../constants/paths";
import { orderService } from "../services/orderService";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState("");
  const [profile, setProfile] = useState();
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const navigate = useNavigate();

  const handleShowModal = (modalType) => {
    setShowModal(modalType || "");
  };

  const hanldleCloseModal = (e) => {
    e?.stopPropagation();
    setShowModal("");
  };


  useEffect(() => {
    if (tokenMethod.get()) {
      handleGetProfile();
    }
  }, []);

  useEffect(() => {
    if (tokenMethod.get()) {
      // call api get profile
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  const handleLogin = async (loginData, callback) => {
    try {
      const res = await authService.login(loginData);
      const { token: accessToken, refreshToken } = res?.data?.data || {};
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);


      // Lưu vào local storage
      // tokenMethod.set({
      //   accessToken,
      //   refreshToken,
      // });
      tokenMethod.set({
        accessToken,
        refreshToken
      })

      if (!!tokenMethod) {
        // Lấy thông tin profile
        handleGetProfile();

        // Thông báo
        message.success("Đăng nhập thành công");

        // Đóng modal
        hanldleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại");
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    // call API
    try {
      const { name, email, password } = registerData;
      const payload = {
        firstName: name,
        lastName: "",
        email,
        password,
      };
      // console.log('payload', payload)
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        
        //LOGIN 
        handleLogin({
          email,
          password,
        });

        message.success("Đăng ký thành công");
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }setProfile
    } finally {
      callback?.();
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    navigate?.(PATH.HOME);
    message.success("Tai khoan dang xuat thanh cong!")
  };

  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("lich su lay khoa hoc error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("Lich su lay khoa hoc error", error);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const {
        firstName,
        email,
        password,
        facebookURL,
        introduce,
        phone,
        website,
      } = profileData;
      const payload = {
        firstName: firstName,
        lastName: "",
        email,
        password,
        facebookURL,
        website,
        introduce,
        phone,
      };
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{courseInfo, showModal, handleShowModal, hanldleCloseModal, handleLogin, handleRegister, handleLogout, handleGetProfile, profile,  handleGetProfileCourse,
        handleGetProfilePayment , paymentInfo , handleUpdateProfile}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
