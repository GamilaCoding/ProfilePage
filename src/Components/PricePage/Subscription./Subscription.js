import React, { useState, useEffect } from "react";

const SubscriptionDetails = () => {
    const subscriptionDate = new Date("2024-12-01"); 
    const [renewalDate, setRenewalDate] = useState(null);

    useEffect(() => {
        const renewal = new Date(subscriptionDate);
        renewal.setMonth(renewal.getMonth() + 1); 
        setRenewalDate(renewal.toLocaleDateString("ar-EG"));
    }, []);

    return (
        <div className="subscription-details space-between">
            <p>تاريخ الاشتراك: {subscriptionDate.toLocaleDateString("ar-EG")}</p>
            <p>تاريخ التجديد: {renewalDate}</p>
        </div>
    );
};

export default SubscriptionDetails;
