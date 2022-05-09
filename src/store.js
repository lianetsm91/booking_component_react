import { configureStore } from '@reduxjs/toolkit';
import FindFlightReducer from './components/FindFlight/redux/FindFlightReducer';
import FlightListReducer from './components/FlightList/redux/FlightListReducer';

const store = configureStore({
  reducer: {
    FindFlightReducer,
    FlightListReducer
  }
});

export default store;
