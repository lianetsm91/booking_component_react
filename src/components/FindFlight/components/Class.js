import React from 'react';
import propTypes from 'prop-types';
import { Form, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

const Class = ({ classes }) => (
  <Item
    name="classType"
    rules={[
      {
        required: true,
        message: 'This field is required.'
      }
    ]}
    style={{ marginBottom: '0px' }}
  >
    <Select dropdownMatchSelectWidth={false} size="small" bordered={false}>
      {classes.map((ct) => (
        <Option value={ct.id} key={ct.id}>
          {ct.name}
        </Option>
      ))}
    </Select>
  </Item>
);

Class.propTypes = {
  classes: propTypes.arrayOf(propTypes.any).isRequired
};

export default Class;
