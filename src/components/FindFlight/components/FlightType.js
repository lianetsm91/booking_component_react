import React from 'react';
import propTypes from 'prop-types';
import { Form, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

const FlightType = ({ flightTypes, setCurrentBookingType }) => (
  <Item
    name="bookingType"
    rules={[
      {
        required: true,
        message: 'This field is required.'
      }
    ]}
    style={{ marginBottom: '0px' }}
  >
    <Select
      dropdownMatchSelectWidth={false}
      size="small"
      bordered={false}
      onSelect={(value) => setCurrentBookingType(value)}
    >
      {flightTypes.map((tv) => (
        <Option value={tv.value} key={tv.value}>
          {tv.name}
        </Option>
      ))}
    </Select>
  </Item>
);

FlightType.propTypes = {
  flightTypes: propTypes.arrayOf(propTypes.any).isRequired,
  setCurrentBookingType: propTypes.func.isRequired
};

export default FlightType;
