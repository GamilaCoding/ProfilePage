import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // يمكنك تحديث الحالة لتعرض واجهة المستخدم البديلة
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // يمكنك إرسال الخطأ إلى خدمة تتبع الأخطاء مثل Sentry أو غيرها
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // يمكنك تخصيص الرسالة هنا أو عرض شيء آخر
      return (
        <div>
          <h1>حدث خطأ في التطبيق.</h1>
          <details>
            <summary>معلومات الخطأ</summary>
            <pre>{this.state.error && this.state.error.toString()}</pre>
            <pre>{this.state.errorInfo.componentStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
