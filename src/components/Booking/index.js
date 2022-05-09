import React from 'react';
import { Col, Row, Typography } from 'antd';
import FindFlight from '../FindFlight';
import FlightList from '../FlightList';
import './index.css';

const { Title } = Typography;

const Booking = () => {
  return (
    <Row className="booking-container" justify="center">
      <Col span={22}>
        <Title level={2}>Find the best flight deals</Title>
      </Col>
      <Col span={22}>
        <FindFlight />
      </Col>
      <Col span={22}>
        <FlightList />
      </Col>
    </Row>
  );
};

export default Booking;
