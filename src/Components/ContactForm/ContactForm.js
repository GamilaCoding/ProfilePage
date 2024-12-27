import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";

const ContactForm = () => {
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        message: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("الاسم مطلوب"),
        phone: Yup.string()
            .matches(/^\d+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
            .required("رقم الجوال مطلوب"),
        email: Yup.string()
            .email("البريد الإلكتروني غير صحيح")
            .required("البريد الإلكتروني مطلوب"),
        message: Yup.string().required("الرسالة مطلوبة"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);

        fetch("https://example.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("تم إرسال النموذج بنجاح!");
                    resetForm();
                } else {
                    throw new Error("حدث خطأ أثناء إرسال البيانات");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("فشل في إرسال النموذج. حاول مرة أخرى.");
            });
    };

    return (
        <div className="contact-container">
            <header>
                <div className="contact-banner">
                    <h2>تواصل مع الدعم</h2>
                </div>
            </header>

           

            <div className="contact-form-wrapper">
            <div className="contact-intro">
                <p>
                لأي أسئلة أو مشكلات تواجهك، يمكنك التواصل مع فريق الدعم الفني وسنقوم بمساعدتك على الفور
                </p>
            </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">الإسم *</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="أدخل الاسم بالكامل"
                                    className="form-input"
                                />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">رقم الهاتف *</label>
                                <Field
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="أدخل رقم الهاتف"
                                    className="form-input"
                                />
                                <ErrorMessage name="phone" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">البريد الإلكتروني *</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="أدخل البريد الإلكتروني"
                                    className="form-input"
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">الرسالة *</label>
                                <Field
                                    as="textarea"
                                    id="message"
                                    name="message"
                                    placeholder="أدخل رسالتك"
                                    rows="4"
                                    className="form-textarea"
                                />
                                <ErrorMessage name="message" component="div" className="error-message" />
                            </div>

                            <button type="submit" className="submit-button">
                                إرسال
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default ContactForm;