import React, { useState } from 'react';
import { Select, Tag } from 'antd';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Option } = Select;

const SelectOriginDestinity = ({ airports, fieldValue, ...rest }) => {
  const [cssClass, setCssClass] = useState('origin-destiny-plane-icon');

  const injectedProps = {
    dropdownMatchSelectWidth: false,
    showSearch: true,
    filterOption: (input, option) => {
      return (
        option.children[option.children.length - 1]
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0 ||
        option.children[0].props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onMouseEnter: () => {
      if (fieldValue) {
        setCssClass('origin-destiny-plane-icon-invisible');
      }
    },
    onMouseLeave: () => {
      setCssClass('origin-destiny-plane-icon');
    }
  };

  if (!rest.loading) {
    injectedProps.suffixIcon = (
      <FontAwesomeIcon
        icon="plane-arrival"
        color="#001529"
        className={cssClass}
      />
    );
  }

  return (
    <Select {...injectedProps} {...rest}>
      {airports.map((a) => (
        <Option key={a.id} value={a.id}>
          <Tag>{a.code}</Tag> {a.name}
        </Option>
      ))}
    </Select>
  );
};

SelectOriginDestinity.propTypes = {
  airports: propTypes.arrayOf(propTypes.any).isRequired,
  fieldValue: propTypes.any,
  rest: propTypes.objectOf(propTypes.any)
};

SelectOriginDestinity.defaultProps = {
  fieldValue: undefined,
  rest: {}
};

export default SelectOriginDestinity;
