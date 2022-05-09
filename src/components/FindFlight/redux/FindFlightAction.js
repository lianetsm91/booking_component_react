import { message } from 'antd';
import axios from 'axios';

const setPassengerCount = (code, cAdults, cBoys, cBabies) => (dispatch) => {
  switch (code) {
    case 'adult':
      dispatch({
        type: 'SET_ADULTS_QTY',
        value: cAdults
      });
      break;
    case 'boy':
      dispatch({
        type: 'SET_BOYS_QTY',
        value: cBoys
      });
      break;
    default:
      dispatch({
        type: 'SET_BABIES_QTY',
        value: cBabies
      });
      break;
  }
};

const mockedNomenclator = (name) => {
  let value = [];
  switch (name) {
    case 'classes':
      value = [
        { id: 1, value: 'economic', name: 'Economic' },
        { id: 2, value: 'economicPremium', name: 'Economic Premium' },
        { id: 3, value: 'business', name: 'Business' },
        { id: 4, value: 'first', name: 'First' },
        { id: 5, value: 'mixed', name: 'Mixed' }
      ];
      break;
    case 'flight_types':
      value = [
        { id: 1, value: 'ow', name: 'One way' },
        { id: 2, value: 'rt', name: 'Round trip' }
      ];
      break;
    case 'passenger_types':
      value = [
        {
          id: 1,
          value: 'adult',
          name: 'Adults',
          description: 'Over 18 years'
        },
        {
          id: 2,
          value: 'boy',
          name: 'Boys',
          description: 'Between 2 and 18 years old'
        },
        {
          id: 3,
          value: 'baby',
          name: 'Babies',
          description: 'Under 2 years'
        }
      ];
      break;
    case 'flexible_dates':
      value = [
        {
          id: 1,
          value: 'ex',
          name: 'Exact'
        },
        {
          id: 2,
          value: '-1d',
          name: '1 day before'
        },
        {
          id: 3,
          value: '+1d',
          name: '1 day after'
        },
        {
          id: 4,
          value: '+-1d',
          name: '+- 1 day'
        },
        {
          id: 5,
          value: '+-2d',
          name: '+- 2 days'
        },
        {
          id: 6,
          value: '+-3d',
          name: '+- 3 days'
        }
      ];
      break;
    default:
      value = [];
  }

  return {
    type: `GET_${name.toUpperCase()}`,
    value
  };
};

const setFlexDate = (value) => {
  return {
    type: 'SET_FLEX_DATE',
    value
  };
};

const toggleSkeleton = (value) => ({
  type: 'TOGGLE_LOADING_LIST',
  value
});

const getAirports = () => (dispatch) => {
  const mock = [
    {
      id: 1,
      name: 'Aeropuerto Internacional Sierra Maestra',
      code: 'MZO',
      country: { id: '5', code: 'CU', name: 'Cuba' },
      city: { name: 'Manzanillo' }
    },
    {
      id: 2,
      name: 'Aeropuerto Carlos Manuel de Céspedes',
      code: 'BYM',
      country: { id: '5', code: 'CU', name: 'Cuba' },
      city: { name: 'Bayamo' }
    },
    {
      id: 3,
      name: 'Aeropuerto Gustavo Rizo',
      code: 'BCA',
      country: { id: '5', code: 'CU', name: 'Cuba' },
      city: { name: 'Baracoa' }
    },
    {
      id: 4,
      name: 'Aeropuerto Juan Gualberto Gómez',
      code: 'VRA',
      country: { id: '5', code: 'CU', name: 'Cuba' },
      city: { name: 'Varadero' }
    },
    {
      id: 5,
      name: 'Aeropuerto Cayo Coco Internacional',
      code: 'CCC',
      country: { id: '5', code: 'CU', name: 'Cuba' },
      city: { name: 'Cayo Coco' }
    },
    {
      id: 6,
      name: 'Aeropuerto Internacional José Martí',
      code: 'HAV',
      country: { id: '5', code: 'CU', name: 'Cuba' },
      city: { name: 'Habana' }
    }
  ];

  setTimeout(
    () =>
      dispatch({
        type: 'GET_AIRPORTS',
        value: mock
      }),
    3000
  );
};

const searchFlights =
  (
    originId,
    destinyId,
    passengerCount,
    date,
    classId,
    flexDate,
    airports,
    classes
  ) =>
  (dispatch) => {
    dispatch(toggleSkeleton(true));
    const url = `http://localhost:4000`;
    const airportOrigin = airports.find((airport) => airport.id === originId);
    const airportDestiny = airports.find((airport) => airport.id === destinyId);
    const classType = classes.find((cl) => cl.id === classId);

    axios
      .get(url, {
        params: {
          airportOrigin,
          airportDestiny,
          passengerCount,
          date,
          classType,
          flexDate
        }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'SET_FLIGHT_LIST_DEPARTURE',
            value: response.data.flightListDeparture || []
          });
          dispatch({
            type: 'SET_FLIGHT_LIST_RETURN',
            value: response.data.flightListReturn || []
          });
        } else {
          dispatch({
            type: 'SET_FLIGHT_LIST_DEPARTURE',
            value: []
          });
          dispatch({
            type: 'SET_FLIGHT_LIST_RETURN',
            value: []
          });
          message.error('An error occurred while trying to get the flights.');
        }
        dispatch(toggleSkeleton(false));
      })
      .catch(() => {
        message.error('An error occurred while trying to get the flights.');
        dispatch({
          type: 'SET_FLIGHT_LIST_DEPARTURE',
          value: []
        });
        dispatch({
          type: 'SET_FLIGHT_LIST_RETURN',
          value: []
        });
        dispatch(toggleSkeleton(false));
      });
  };

export {
  setPassengerCount,
  mockedNomenclator,
  setFlexDate,
  getAirports,
  searchFlights
};
