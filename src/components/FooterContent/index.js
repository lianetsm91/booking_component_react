import React from 'react';
import { Col, Row, Typography } from 'antd';
import './index.css';

const { Text, Title } = Typography;

const FooterContent = () => {
  return (
    <>
      <Row justify="center">
        <Col className="footer-address-container">
          <Title level={4}>Silver swan</Title>
          <Text>134 N (North) ORANGE AVE, ORLANDO, FL 6854-2364, USA</Text>
        </Col>
      </Row>
      <Row justify="center" className="footer-logo">
        <Col>
          <svg
            style={{ marginTop: '24px' }}
            width="100"
            viewBox="0 0 65 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.7504 15.1559L47.5978 13.7397L46.3153 14.1325L54.6025 16.9215L49.4004 19.109L46.3601 17.7203L44.0438 17.6166L47.7473 20.2788C42.8736 21.5286 37.8514 22.0983 32.8225 21.9719C16.2287 21.6574 2.90416 14.6819 3.06022 6.39599C3.16062 4.22413 4.04175 2.16225 5.54059 0.591797C2.50606 2.86332 0.717846 5.60089 0.660768 8.57765C0.505429 16.8643 13.8306 23.8383 30.4223 24.1536C40.7975 24.35 49.9799 21.8908 55.4536 17.9971L64.6483 14.1267C64.6483 14.1267 63.532 12.9417 58.7511 15.1559"
              fill="#001529"
            />
          </svg>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>Copyright Silver swan ©2022 All Rights Reserved</Text>
        </Col>
      </Row>
    </>
  );
};

export default FooterContent;
