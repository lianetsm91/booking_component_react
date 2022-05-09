import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Col, Row, Typography, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPassengerCount } from '../redux/FindFlightAction';

const { Title, Text } = Typography;

const PassengerCard = ({
  passengerTypes,
  countAdults,
  countBoys,
  countBabies
}) => {
  const dispatch = useDispatch();

  const disable = useMemo(() => {
    return countAdults + countBoys + countBabies >= 9;
  }, [countAdults, countBoys, countBabies]);

  const onButtonClick = (action, code) => {
    let cAdults = countAdults;
    let cBoys = countBoys;
    let cBabies = countBabies;
    const add = action === '+' ? 1 : -1;

    switch (code) {
      case 'adult':
        cAdults = countAdults + add;
        break;
      case 'boy':
        cBoys = countBoys + add;
        break;
      default:
        cBabies = countBabies + add;
        break;
    }

    dispatch(setPassengerCount(code, cAdults, cBoys, cBabies));
  };

  return passengerTypes.map((p) => {
    let title;
    let icon;
    switch (p.value) {
      case 'adult':
        title = `${countAdults} ${p.name}`;
        icon = 'user';
        break;
      case 'boy':
        title = `${countBoys} ${p.name}`;
        icon = 'child';
        break;
      default:
        title = `${countBabies} ${p.name}`;
        icon = 'baby';
    }

    return (
      <Card
        bordered={false}
        bodyStyle={{ padding: 10 }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Row type="flex" align="middle" justify="space-between">
          <Col span={4}>
            <FontAwesomeIcon size="2x" icon={icon} color="#001529" />
          </Col>
          <Col span={14}>
            <Row>
              <Col span={24}>
                <Title type="secondary" level={5}>
                  {title}
                </Title>
              </Col>
              <Col span={24}>
                <Text type="secondary">{p.description}</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={8}>
              <Col span={12}>
                <Button
                  disabled={disable}
                  size="small"
                  shape="circle"
                  onClick={() => onButtonClick('+', p.value)}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  disabled={
                    (p.value === 'adult' && countAdults === 0) ||
                    (p.value === 'boy' && countBoys === 0) ||
                    (p.value === 'baby' && countBabies === 0)
                  }
                  size="small"
                  shape="circle"
                  onClick={() => onButtonClick('-', p.value)}
                >
                  <FontAwesomeIcon icon="minus" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  });
};

PassengerCard.propTypes = {
  passengerTypes: propTypes.arrayOf(propTypes.any).isRequired,
  countAdults: propTypes.number.isRequired,
  countBoys: propTypes.number.isRequired,
  countBabies: propTypes.number.isRequired
};

export default PassengerCard;
