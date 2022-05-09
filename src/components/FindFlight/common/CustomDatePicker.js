import React from 'react';
import propTypes from 'prop-types';
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomDatePicker = ({ ...rest }) => {
  const properties = { ...rest };
  const { rangePicker } = rest;
  delete properties.rangePicker;

  const injectedProps = {
    suffixIcon: <FontAwesomeIcon icon="calendar-day" color="#001529" />,
    style: { ...properties.style }
  };

  delete properties.style;

  return rangePicker ? (
    <DatePicker.RangePicker {...injectedProps} {...properties} />
  ) : (
    <DatePicker {...injectedProps} {...properties} />
  );
};

CustomDatePicker.propTypes = {
  rest: propTypes.objectOf(propTypes.any)
};

CustomDatePicker.defaultProps = {
  rest: {}
};

export default CustomDatePicker;
