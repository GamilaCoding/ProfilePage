import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaPen } from "react-icons/fa";
import User from "../images/png-5.jpg";
import Logo from "../images/logo.png";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./UserProfile.css";


const UserProfile = () => {
  const [password, setPassword] = useState(
  );
  const [imageSrc, setProfileImage] = useState(User);
  const [statusMessage, setStatusMessage] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setDisplayName] = useState();
  const [showFileInput, setShowFileInput] = useState(false);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGVzdGVyMTAwLm1vdGthbWwuY29tIiwiaWF0IjoxNzM1MDcxMjM3LCJleHAiOjE3NjY2Mjg4MzcsImRhdGEiOnsidXNlcl9pZCI6MjEsInNpdGVfaWQiOjI0LCJwYXRoIjoiaHR0cHM6XC9cL3Rlc3RlcjEwMC5tb3RrYW1sLmNvbSIsInVzZXJuYW1lIjoibWlkb3NvazEwMEBnbWFpbC5jb20ifX0.b8p9xKtWGHGTv6qT4NP5HdX7DWgqPC8ITYn1oMYmiu";

  // Get API
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://tester100.motkaml.com/wp-json/user/get_data",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      const user = data.user;
      const userMeta = data.user_meta;
      setDisplayName(user.display_name || "");
      setEmail(user.user_email || "");
      setPhone(userMeta.phone?.[0] || "");
      setProfileImage(userMeta.profile_image?.[0] || User);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageError = () => {
    setProfileImage("./Components/images/user.png");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setShowFileInput(false); 
      };
      reader.readAsDataURL(file);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: "midosok100@gmail.com",
      phone: "5555555555",
      name: "mido100",
      password: "$P$B1sC0euTpCsfWuFslnVrkduUJp5A0n/",
      imageSrc: "User",
      statusMessage,
    };

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        fetch("https://tester100.motkaml.com/wp-json/user/get_data", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
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
              src={imageSrc}
              alt="Profile"
              width="130"
              height="130"
              onError={handleImageError}
            />
            <label
              htmlFor="image-upload"
              className="image-edit-icon"
              onClick={() => setShowFileInput(!showFileInput)} 
            >
              <FaPen />
            </label>
            {showFileInput && (
              <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
              />
            )}
          </div>

          <div className="profile-details">
            <p>
              <strong>الباقة المشترك فيها:</strong> الباقة الأساسية
            </p>{" "}
            <br />
            <p>
              <strong>اسم المتجر:</strong> متجر متكامل
            </p>
            <br />
            <label>
              <strong> الاسم:</strong>
              <input
                type="name"
                value={name}
                placeholder="الاسم مسجل به فى الموقع"
                onChange={(e) => setDisplayName(e.target.value)}
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
            <ul>
              <li>الباقات المشترك بها</li>
              <li>تواصل مع الدعم</li>
            </ul>
          </div>
        </ul>
        <footer className="footer">
          <p>الحقوق محفوظة لمتكامل</p>
        </footer>
      </form>

      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  );
};

export default UserProfile;