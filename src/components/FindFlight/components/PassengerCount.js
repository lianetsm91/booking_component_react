import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select } from 'antd';
import { mockedNomenclator } from '../redux/FindFlightAction';
import PassengerCard from './PassengerCard';

const { Item } = Form;

const PassengerCount = ({ countAdults, countBoys, countBabies }) => {
  const dispatch = useDispatch();

  const passengerTypes = useSelector(
    (state) => state.FindFlightReducer.passengerTypes
  );

  useEffect(() => {
    if (passengerTypes.length < 1) {
      dispatch(mockedNomenclator('passenger_types'));
    }
  }, [dispatch, passengerTypes.length]);

  return (
    <Item
      name="passengers"
      rules={[
        () => ({
          validator() {
            if (countAdults !== 0 || countBabies !== 0 || countBoys !== 0) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('This field is required.'));
          }
        })
      ]}
      style={{ marginBottom: '0px' }}
    >
      <Select
        size="small"
        dropdownMatchSelectWidth={false}
        bordered={false}
        // eslint-disable-next-line react/no-unstable-nested-components
        dropdownRender={() => (
          <PassengerCard
            passengerTypes={passengerTypes}
            countAdults={countAdults}
            countBoys={countBoys}
            countBabies={countBabies}
          />
        )}
      />
    </Item>
  );
};

PassengerCount.propTypes = {
  countAdults: propTypes.number.isRequired,
  countBoys: propTypes.number.isRequired,
  countBabies: propTypes.number.isRequired
};

export default PassengerCount;
