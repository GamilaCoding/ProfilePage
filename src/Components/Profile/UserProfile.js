// import ContactForm from "../ContactForm/ContactForm";
import { toast, ToastContainer } from "react-toastify";
import User from "../images/user.png";
// import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import React, { useState } from "react";
import SlideBar from "./Sidebar";
import "./UserProfile.css";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const UserProfile = () => {
  // State hooks for managing form data
  const [password, setPassword] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(" ");

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageError = () => {
    setImageSrc("./Components/images/user.png");
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string()
      .email("بريد إلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .matches(/^\d+$/, "يجب أن يحتوي على أرقام فقط")
      .required("رقم الهاتف مطلوب"),
    password: Yup.string()
      .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior

    const formData = { email, phone, name, password, imageSrc, statusMessage }; // Collect form data

    // Validate form data using Yup
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // API request simulation
        fetch("wp-json/settings/v1/update-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Failed to update profile");
          })
          .then((data) => {
            toast.success("تم الحفظ بنجاح!", { position: "top-right" });
            setStatusMessage("تم الحفظ بنجاح!");
          })
          .catch((error) => {
            console.error("Error:", error);
            toast.error("حدث خطأ أثناء الحفظ. حاول مرة أخرى.", {
              position: "top-right",
            });
          });
      })
      .catch((validationErrors) => {
        validationErrors.inner.forEach((error) => {
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        });
      });
  };

  return (
    <div className="profile-container">
      <header className="header">
        <img src={Logo} className="logo" alt="logo" width="100" height="100" />
      </header>

      <form className="profile-content" onSubmit={handleSubmit}>
        <ul>
          <div className="profile-picture">
            <img
              src={User}
              alt="Profile"
              width="150"
              height="150"
              onError={handleImageError}
            />
            {!imageSrc && <div className="placeholder"></div>}
          </div>

          <div className="profile-details">
            <p>
              <strong>الباقة المشترك فيها:</strong> الباقة الأساسية
            </p>
            <p>
              <strong>اسم المتجر:</strong> متجر متكامل
            </p>
            <label>
              <strong> الاسم:</strong>
              <input
                type="name"
                value={name}
                placeholder="الاسم مسجل به فى الموقع"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <strong>البريد الإلكتروني:</strong>
              <input
                type="email"
                value={email}
                placeholder="اكتب البريد مسجل به فى المتجر"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <strong>رقم الهاتف:</strong>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123456789"
                required
              />
            </label>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="*********"
            />
            <div className="position">
              <button className="submit-button" type="submit">
                حفظ
              </button>
            </div>
          </div>
          <ToastContainer />
            <div className="sidebar">
             <SlideBar/>
            </div>
        </ul>
        <footer className="footer">
          <p>الحقوق محفوظة لمتكامل</p>
        </footer>
      </form>

      {/* Display status message */}
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  );
};

export default UserProfile;
