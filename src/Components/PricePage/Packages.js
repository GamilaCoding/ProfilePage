import React, { useState } from "react";
import "./Packages.css";
import Subscription from "./Subscription./Subscription";

const Packages = () => {
    const [isFreePlanSubscribed, setIsFreePlanSubscribed] = useState(true);


    return (
        <div className="packages-container">
            <header>
                <div className="packages-banner">
                    <h2>باقات متكامل الشاملة</h2>
                    <Subscription />
                </div>
            </header>

            <div className="packages-wrapper">
                <div className="package-card">
                    <h3>الباقة المجانية</h3>
                    <p className="price">0 KWD <span>/ شهري</span></p>
                    <ul className="features-list">
                        <li>متجر إلكتروني (موقع)</li>
                        <li>سيرفرات آمنة</li>
                        <li>دعم فني على مدار الساعة</li>
                        <li>دومين فرعي آمن مجانًا</li>
                    </ul>
                    {isFreePlanSubscribed ? (
                        <button className="action-btn disabled" disabled>
                            مشترك بالفعل
                        </button>
                    ) : (
                        <button className="action-btn">جرب مجانًا</button>
                    )}
                </div>

                <div className="package-card">
                    <h3>الباقة الأساسية</h3>
                    <p className="price">8 KWD <span>/ شهري</span></p>
                    <ul className="features-list">
                        <li>عدد غير محدود من المنتجات</li>
                        <li>عدد غير محدود من الطلبات</li>
                        <li>بدون عمولة على المبيعات</li>
                        <li>تفعيل الدفع الإلكتروني</li>
                        <li>تعدد طرق الشحن</li>
                        <li>متجر متحرك على محركات البحث</li>
                    </ul>
                    <button
                        className="action-btn-1"
                        onClick={() => alert("تم ترقية الباقة بنجاح!")}
                    >
                        ترقية الباقة
                    </button>
                </div>
                <div className="footer">
                        <p>الحقوق محفوظة لمتكامل</p>
                    </div>
            </div>
        </div>
    );
};

export default Packages;
