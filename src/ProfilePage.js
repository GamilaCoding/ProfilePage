import React, { useState } from "react";
import "./ProfilePage.css"; // Custom CSS file

function ProfilePage() {
  const [imageSrc, setImageSrc] = useState('path/to/your/image.jpg'); // ضع هنا رابط الصورة الافتراضية الخاصة بك
  const [name, setName] = useState(" اسمك")
  const [email, setEmail] = useState("الميل المسجل به فى الموقع");
  const [phone, setPhone] = useState("0123456789");
  const [statusMessage, setStatusMessage] = useState(""); // State for status messages


  const handleImageError = () => {
    setImageSrc('./images/logo192.png'); // الصورة الافتراضية في حال حدوث خطأ
  };


  const PasswordInput = () => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = { email, phone, name, password };


      // أضف APIS من هنا 

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
          setStatusMessage("تم الحفظ بنجاح!"); // Success message
        })
        .catch((error) => {
          console.error("Error:", error);
          setStatusMessage("حدث خطأ أثناء الحفظ. حاول مرة أخرى."); // Error message
        });
    };

    return (
      <div className="profile-container">
        <header className="header">
          <h1>متكامل</h1>
        </header>


        <form className="profile-content" onSubmit={handleSubmit}>
          <ul>

            {/* profilepicture  */}
            <div className="profile-picture">
              <img
                src={imageSrc}
                alt="Profile"
                width="150"
                height="150"
                onError={handleImageError} // في حال حدوث خطأ، سيتم تحميل الصورة الافتراضية
              />
              {!imageSrc && <div className="placeholder">150 x 150</div>} {/* النص يظهر إذا كانت الصورة غير موجودة */}
            </div>

            <div className="profile-details">
              <p>
                <strong>الباقة المشترك فيها:</strong> الباقة الأساسية
              </p>
              <p>
                <strong>اسم المتجر:</strong> متجر متكامل
              </p>
              <label>
                <strong> الاسم مسجل به فى الموقع:</strong>
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
                  placeholder="اكتب بريد مسجل به فى المتجر"
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
              <ul className="position">
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </ul>
            </div>

            <div className="sidebar">
              <ul>
                <li>إعدادات الحساب</li>
                <li>الطلبات</li>
                <li>الدعم الفني</li>
                <li>الإشعارات</li>
              </ul>
            </div>
          </ul>
          <footer className="footer">

          </footer>
        </form>

        {/* Display status message */}
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </div>
    );
  }


  export default ProfilePage;