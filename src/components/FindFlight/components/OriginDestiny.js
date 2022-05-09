import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'antd';
import SelectOriginDestinity from './SelectOriginDestinity';

const { Item } = Form;

const OriginDestinity = ({ airports, fieldName, placeholder, fieldValue }) => (
  <Item
    name={fieldName}
    validateFirst
    rules={[
      {
        required: true,
        message: 'This field is required.'
      }
    ]}
  >
    <SelectOriginDestinity
      allowClear
      loading={airports.length === 0}
      size="large"
      placeholder={placeholder}
      airports={airports}
      fieldValue={fieldValue}
    />
  </Item>
);

OriginDestinity.propTypes = {
  airports: propTypes.arrayOf(propTypes.any).isRequired,
  fieldName: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  fieldValue: propTypes.any
};

OriginDestinity.defaultProps = {
  fieldValue: undefined
};

export default OriginDestinity;
