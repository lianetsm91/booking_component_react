import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Form, message, Row } from 'antd';
import {
  searchFlights,
  getAirports,
  mockedNomenclator
} from './redux/FindFlightAction';
import PassengerCount from './components/PassengerCount';
import OriginDestiny from './components/OriginDestiny';
import ButtonSearch from './components/ButtonSearch';
import Class from './components/Class';
import FlightType from './components/FlightType';
import DateField from './components/DateField';
import './index.css';

const FindFlight = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue, validateFields } = form;
  const originWatch = Form.useWatch('origin', form);
  const destinationWatch = Form.useWatch('destination', form);

  const [currentBookingType, setCurrentBookingType] = useState('rt');

  const countAdults = useSelector(
    (state) => state.FindFlightReducer.countAdults
  );
  const countBoys = useSelector((state) => state.FindFlightReducer.countBoys);
  const countBabies = useSelector(
    (state) => state.FindFlightReducer.countBabies
  );
  const airports = useSelector((state) => state.FindFlightReducer.airports);
  const classes = useSelector((state) => state.FindFlightReducer.classes);
  const flexDate = useSelector((state) => state.FindFlightReducer.flexDate);
  const flightTypes = useSelector(
    (state) => state.FindFlightReducer.flightTypes
  );

  useEffect(() => {
    dispatch(getAirports(null));
    dispatch(mockedNomenclator('classes'));
    if (flightTypes.length < 1) {
      dispatch(mockedNomenclator('flight_types'));
    }
  }, [dispatch, flightTypes.length]);

  useEffect(() => {
    if (classes.length > 0 && getFieldValue('classType') === undefined) {
      setFieldsValue({ classType: classes[0].id });
    }
  }, [classes, getFieldValue, setFieldsValue]);

  useEffect(() => {
    const count = countAdults + countBoys + countBabies;

    setFieldsValue({
      passengers: `${count} ${
        count === 0 || count > 1 ? 'passengers' : 'passenger'
      }`
    });
  }, [countAdults, countBoys, countBabies, setFieldsValue]);

  const search = (values) => {
    const passengerCount = countAdults + countBoys;
    const { classType, origin, destination } = values;
    const date = values[currentBookingType === 'rt' ? 'datert' : 'dateow'];

    dispatch(
      searchFlights(
        origin,
        destination,
        passengerCount,
        date,
        classType,
        flexDate,
        airports,
        classes
      )
    );
  };

  const handleSubmit = () => {
    validateFields()
      .then((values) => {
        if (values.origin === values.destination) {
          message.error('Source and destination must be different');
        } else {
          search(values);
        }
      })
      .catch((e) => {
        if (e.errorFields && e.errorFields.length === 0) {
          search(e.values);
        }
      });
  };

  const selectOriginDestiny = (placeholder, fieldName, fieldValue) => (
    <OriginDestiny
      airports={airports}
      fieldName={fieldName}
      placeholder={placeholder}
      fieldValue={fieldValue}
    />
  );

  return (
    <Form
      className="find-flight-container"
      form={form}
      onFinish={() => handleSubmit()}
      initialValues={{
        bookingType: 'rt'
      }}
    >
      <Row gutter={8}>
        <Col xs={{ span: 24 }} sm={{ span: 8 }} xl={{ span: 3 }}>
          <FlightType
            flightTypes={flightTypes}
            setCurrentBookingType={setCurrentBookingType}
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }} xl={{ span: 3 }}>
          <PassengerCount
            countAdults={countAdults}
            countBoys={countBoys}
            countBabies={countBabies}
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 8 }} xl={{ span: 4 }}>
          <Class classes={classes} />
        </Col>
      </Row>
      <Row gutter={6}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 6 }}>
          {selectOriginDestiny('Origin', 'origin', originWatch)}
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 6 }}>
          {selectOriginDestiny('Destination', 'destination', destinationWatch)}
        </Col>
        {currentBookingType === 'rt' && (
          <Col xs={{ span: 24 }} sm={{ span: 24 }} xl={{ span: 8 }}>
            <DateField
              form={form}
              bookingType={currentBookingType}
              rangePicker
            />
          </Col>
        )}
        {currentBookingType === 'ow' && (
          <Col xs={{ span: 24 }} sm={{ span: 24 }} xl={{ span: 8 }}>
            <DateField form={form} bookingType={currentBookingType} />
          </Col>
        )}
        <Col xs={{ span: 24 }} sm={{ span: 24 }} xl={{ span: 4 }}>
          <ButtonSearch />
        </Col>
      </Row>
    </Form>
  );
};

export default FindFlight;
