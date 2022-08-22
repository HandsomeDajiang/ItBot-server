import React from 'react';
import SystemErrorPage from './500';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: undefined };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: TypeError, errorInfo: any) {
    console.error(error, errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <SystemErrorPage text={this.state.error?.stack} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
