import { Fragment } from 'react';
import './App.css';
import ConcertCard from './components/ConcertCard';
import ReservationForm from './components/ReservationForm';

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import CancelForm from './components/CancelForm';
import ChangeReservation from './components/ChangeReservation';

function App() {
  return (
    <Fragment>
    <Routes>
      <Route path="/" element={<ConcertCard/>}/> 
      <Route path="/reservation" element={<ReservationForm/>}/>
      <Route path="/changeReservation" element={<ChangeReservation/>}/>
      <Route path="/cancelReservation" element={<CancelForm/>}/>
    </Routes>
    </Fragment>

  );
}

export default App;
