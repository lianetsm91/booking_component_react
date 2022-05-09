import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Skeleton, Typography } from 'antd';
import FlightCard from './components/FlightCard';
import './index.css';

const { Title } = Typography;

const FlightList = () => {
  const flightListDeparture = useSelector(
    (state) => state.FlightListReducer.flightListDeparture
  );
  const flightListReturn = useSelector(
    (state) => state.FlightListReducer.flightListReturn
  );
  const loading = useSelector((state) => state.FlightListReducer.loading);

  return (
    <Row>
      <Skeleton active loading={loading}>
        {flightListDeparture.length > 0 && (
          <Col span={24} className="flight-list-outbound">
            <Title level={3}>Outbound flights</Title>
            {flightListDeparture.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </Col>
        )}
        {flightListReturn.length > 0 && (
          <Col span={24} className="flight-list-return">
            <Title level={3}>Return flights</Title>
            {flightListReturn.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </Col>
        )}
      </Skeleton>
    </Row>
  );
};

export default FlightList;
