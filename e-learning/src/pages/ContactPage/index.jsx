import React, { useState } from "react";
import ContactTitle from "../../components/ContactTitle";
import ContactSidebar from "../../components/ContactSidebar";
import ContactForm from "../../components/ContactForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMutation from "../../hooks/useMutation";

export default function ContactPage() {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const handleFormSubmit = async (form) => {
  //   console.log("form", form);
  //   setLoading(true);
  //   const payload = {
  //     name: form?.name || "",
  //     email: form?.email || "",
  //     phone: form?.phone || "",
  //     title: form?.topic || "",
  //     description: form?.content || "",
  //   };
  //   try {
  //     const res = await axios.post(
  //       "https://cfdcourses.cfdcircle.vn/api/v1/subscribes",
  //       payload
  //     );
  //     console.log("res data: ", res.data);
  //     if (res.data) {
  //       alert("Thanh cong!");
  //       navigate("/");
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const navigate = useNavigate();

  const { execute, data, error, loading } = useMutation((payload) =>
    axios.post("https://cfdcourses.cfdcircle.vn/api/v1/subscribes", payload)
  );
  const handleFormSubmit = (form) => {
    const payload = {
      name: form?.name || "",
      email: form?.email || "",
      phone: form?.phone || "",
      title: form?.topic || "",
      description: form?.content || "",
    };
    //truyen
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        alert("Thanh cong submit !");
      },
      onFail: (error) => {
        console.log("onFail: ", error);
        alert("That bai submit !");
      },
    });
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
}
