import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export class ErrorBoundary extends React.Component<{},{ 
    hasError: boolean 
}> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    // tslint:disable-next-line
    console.log(error, info);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ width: '100%', minWidth: '280px' }}>
          <Row>
            <Col sm={12} className="text-center">
              <h2 style={{ fontFamily: 'Courier New', color: '#f9ee80', margin: 30, marginTop: 60 }}>
                {'Uh Oh... Something went wrong!' : 'Waiting to run your code...'}
              </h2>
            </Col>
          </Row>
        </div>
      );
    }
    return this.props.children;
  }
}
