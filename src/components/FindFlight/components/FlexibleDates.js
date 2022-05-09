import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button, Select } from 'antd';
import { setFlexDate, mockedNomenclator } from '../redux/FindFlightAction';
import '../styles/flexibleDates.css';

const { Option } = Select;

const FlexibleDates = ({ onAccept }) => {
  const dispatch = useDispatch();
  const [openDrop, setOpenDrop] = useState(false);

  const flexDate = useSelector((state) => state.FindFlightReducer.flexDate);

  const flexibleDates = useSelector(
    (state) => state.FindFlightReducer.flexibleDates
  );

  const onAcceptClick = (event) => {
    event.preventDefault();
    if (openDrop) {
      setOpenDrop(false);
    }
    onAccept();
  };

  useEffect(() => {
    if (flexibleDates.length === 0) {
      dispatch(mockedNomenclator('flexible_dates'));
    }
  }, [dispatch, flexibleDates.length]);

  return (
    <Row justify="space-between">
      <Col span={12}>
        <Select
          value={flexDate}
          dropdownMatchSelectWidth={false}
          size="small"
          bordered={false}
          onSelect={(value) => dispatch(setFlexDate(value))}
          open={openDrop}
          onClick={() => setOpenDrop(!openDrop)}
        >
          {flexibleDates.map((op) => (
            <Option value={op.value} key={op.value}>
              {op.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Button
          className="flexible-dates-button"
          type="primary"
          size="small"
          onClick={onAcceptClick}
        >
          Accept
        </Button>
      </Col>
    </Row>
  );
};

FlexibleDates.propTypes = {
  onAccept: propTypes.func.isRequired
};

export default FlexibleDates;
