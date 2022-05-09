/* eslint-disable default-param-last */
const initialState = {
  classes: [],
  flightTypes: [],
  passengerTypes: [],
  flexibleDates: [],
  countAdults: 1,
  countBoys: 0,
  countBabies: 0,
  airports: [],
  flexDate: 'ex'
};

export default function FindFlightReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CLASSES':
      return {
        ...state,
        classes: action.value
      };
    case 'GET_FLIGHT_TYPES':
      return {
        ...state,
        flightTypes: action.value
      };
    case 'GET_PASSENGER_TYPES':
      return {
        ...state,
        passengerTypes: action.value
      };
    case 'GET_FLEXIBLE_DATES':
      return {
        ...state,
        flexibleDates: action.value
      };
    case 'GET_AIRPORTS':
      return {
        ...state,
        airports: action.value
      };
    case 'SET_ADULTS_QTY':
      return {
        ...state,
        countAdults: action.value
      };
    case 'SET_BOYS_QTY':
      return {
        ...state,
        countBoys: action.value
      };
    case 'SET_BABIES_QTY':
      return {
        ...state,
        countBabies: action.value
      };
    case 'SET_FLEX_DATE':
      return {
        ...state,
        flexDate: action.value
      };
    default:
      return state;
  }
}
