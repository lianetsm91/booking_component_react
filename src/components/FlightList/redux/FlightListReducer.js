/* eslint-disable default-param-last */
const initialState = {
  flightListDeparture: [],
  flightListReturn: [],
  loading: false
};

export default function FlightListReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FLIGHT_LIST_DEPARTURE':
      return {
        ...state,
        flightListDeparture: action.value
      };
    case 'SET_FLIGHT_LIST_RETURN':
      return {
        ...state,
        flightListReturn: action.value
      };
    case 'TOGGLE_LOADING_LIST':
      return {
        ...state,
        loading: action.value
      };
    default:
      return state;
  }
}
