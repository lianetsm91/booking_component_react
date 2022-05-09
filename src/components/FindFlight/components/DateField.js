import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form } from 'antd';
import dayjs from 'dayjs';
import CustomDatePicker from '../common/CustomDatePicker';
import FlexibleDates from './FlexibleDates';

const { Item } = Form;

const DateField = ({ form, bookingType, rangePicker }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [fieldValue, setFieldValue] = useState(null);

  const onAccept = () => {
    const obj = {};
    obj[bookingType === 'rt' ? 'datert' : 'dateow'] = fieldValue;

    form.setFieldsValue(obj);
    setOpenPicker(false);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().subtract(1, 'day');
  };

  return (
    <Item
      name={`date${bookingType}`}
      rules={[
        {
          required: true,
          message: 'This field is required.'
        }
      ]}
    >
      <CustomDatePicker
        rangePicker={rangePicker}
        onOpenChange={() => setOpenPicker(true)}
        open={openPicker}
        showToday={false}
        size="large"
        format="ddd DD-MM"
        placeholder={
          bookingType === 'rt'
            ? ['Departure date', 'Return date']
            : `Departure date`
        }
        style={{ width: '100%' }}
        renderExtraFooter={() => <FlexibleDates onAccept={onAccept} />}
        onChange={(value) => setFieldValue(value)}
        disabledDate={(current) => disabledDate(current)}
      />
    </Item>
  );
};

DateField.propTypes = {
  form: propTypes.objectOf(propTypes.any).isRequired,
  bookingType: propTypes.string.isRequired,
  rangePicker: propTypes.bool
};

DateField.defaultProps = {
  rangePicker: false
};

export default DateField;
