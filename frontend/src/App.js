import { Fragment, useState } from "react";
import "./App.css";
import ConcertCard from "./components/ConcertCard";
import ReservationForm from "./components/ReservationForm";

import { Routes, Route } from "react-router-dom";
import CancelForm from "./components/CancelForm";
import ChangeReservation from "./components/ChangeReservation";

function App() {
  const [reservationData, setReservationData] = useState({});
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<ConcertCard reservationData={reservationData} setReservationData={setReservationData} />} />
        <Route path="/reservation" element={<ReservationForm reservationData={reservationData} />} />
        <Route path="/changeReservation" element={<ChangeReservation />} />
        <Route path="/cancelReservation" element={<CancelForm />} />
      </Routes>
    </Fragment>
  );
}

export default App;
