// import React, { useEffect, useState } from "react";
// import { getPricingPlans } from "./pricingApi"; 
// import "./PricingPage.css";

// const PricingPage = () => {
//   const [plans, setPlans] = useState([free , basics ]); 
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPricingPlans = async () => {
//       try {
//         const data = await getPricingPlans();
//         setPlans(data);
//       } catch (error) {
//         setError("فشل في تحميل الباقات. حاول مرة أخرى لاحقًا.");
//       }
//     };

//     fetchPricingPlans();
//   }, []);
//    const getPricingPlans = async () => {
//     try {
//       const response = await fetch("https://example.com/api/pricing"); // رابط API
//       if (!response.ok) {
//         throw new Error("فشل في جلب البيانات");
//       }
//       return await response.json(); // إرجاع البيانات كـ JSON
//     } catch (error) {
//       console.error("Error fetching pricing data:", error.message);
//       throw error;
//     }
//   };
  

//   return (
//     <div className="pricing-container">
//       <h1 className="title">الباقات والأسعار</h1>
//       {error && <p className="error">{error}</p>} 
//       <div className="pricing-grid">
//         {plans.map((plan, index) => (
//           <div key={index} className="pricing-card">
//             <h2>{plan.name}</h2>
//             <p className="price">{plan.price}</p>
//             <ul className="features">
//               {plan.features.map((feature, i) => (
//                 <li key={i}>{feature}</li>
//               ))}
//             </ul>
//             <button className="subscribe-button">اشترك الآن</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PricingPage;
