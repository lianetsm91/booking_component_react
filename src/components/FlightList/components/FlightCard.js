import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { Card, Col, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './flightCard.css';

const { Title, Text } = Typography;

const FlightCard = ({ flight }) => {
  const scales = useMemo(() => {
    let sc = flight.sections.length;
    switch (sc) {
      case 1:
        sc = 'Direct';
        break;
      case 2:
        sc = '1 scale';
        break;
      default:
        sc = `${sc - 1} scales`;
    }
    return sc;
  }, [flight]);

  return (
    <Card
      className="flight-card"
      bordered={false}
      bodyStyle={{
        paddingTop: '14px',
        paddingBottom: '14px',
        paddingLeft: '22px',
        paddingRight: '22px',
        boxShadow: '0 0 10px #f0f2f5'
      }}
    >
      <Row type="flex" align="middle" gutter={10}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 10 }}
          xl={{ span: 8 }}
          className="flight-card-origin"
        >
          <Col span={24}>
            <Title level={3}>{flight.departureTime}</Title>
          </Col>
          <Col span={24}>
            <Text>{`${flight.origin.name} (${flight.origin.code})`}</Text>
          </Col>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 4 }}
          xl={{ span: 2 }}
          className="flight-card-code"
        >
          <Col span={24}>
            <FontAwesomeIcon size="2x" icon="plane" color="#001529" />
          </Col>
          <Col span={24}>
            <Text code>{flight.code}</Text>
          </Col>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 10 }}
          xl={{ span: 8 }}
          className="flight-card-destiny"
        >
          <Col span={24}>
            <Title level={3}>{flight.arrivalTime}</Title>
          </Col>
          <Col span={24}>
            <Text>{`${flight.destiny.name} (${flight.destiny.code})`}</Text>
          </Col>
        </Col>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} xl={{ span: 3 }}>
          {scales !== 'Direct' && (
            <FontAwesomeIcon icon="info-circle" color="#001529" />
          )}
          <Text>{` ${scales}`}</Text>
        </Col>
        <Col xs={{ span: 12 }} sm={{ span: 12 }} xl={{ span: 3 }}>
          <Title level={4} className="flight-card-price">
            {flight.price}
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

FlightCard.propTypes = {
  flight: propTypes.objectOf(propTypes.any).isRequired
};

export default FlightCard;
