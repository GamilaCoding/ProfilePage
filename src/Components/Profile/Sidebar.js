import React from 'react';
import { NavLink } from 'react-router-dom';  

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                {/* استخدام NavLink للتنقل مع تفعيل الحالة النشطة */}
                <li><NavLink to="/account-settings">إعدادات الحساب</NavLink></li>
                <li><NavLink to="/orders">الطلبات</NavLink></li>
                <li><NavLink to="/ContactForm">الدعم الفني</NavLink></li>
            </ul>
        </div>
    );
}

export default Sidebar;
