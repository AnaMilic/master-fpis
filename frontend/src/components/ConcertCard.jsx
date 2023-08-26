import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ConcertCard({ reservationData, setReservationData }) {
  const navigate = useNavigate();

  const url = "http://localhost:5050/api/concerts";
  const url2 = "http://localhost:5050/api/seatingZones";

  const [concert, setConcert] = useState([]);
  const [seatingZone, setSeatingZone] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((response) => setConcert(response.data));
  };
  const fetchInfo2 = () => {
    return axios.get(url2).then((response) => setSeatingZone(response.data));
  };

  useEffect(() => {
    fetchInfo();
    fetchInfo2();
  }, []);

  useEffect(() => {
    if (reservationData?.date == null && concert[0] != null) {
      setReservationData((oldValue) => {
        return { ...oldValue, date: concert[0].date[0] };
      });
    }
  }, [reservationData, concert]);

  if (concert.length === 0 || seatingZone.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <img
        className="card-img"
        src="https://cdn.sortiraparis.com/images/80/1665/764991-eros-ramazzotti-en-concert-a-l-accor-arena-de-paris-en-fevrier-2023.jpg"
        height="370"
        width="550"
        alt="eros concert"
      />
      <div className="card-body">
        <h3 className="card-title"> {concert[0].name} </h3>
        <label> City:</label>
        <p
          style={{
            color: "#fff",
            marginLeft: 50 + "px",
            marginTop: 10 + "px",
            marginBottom: 20 + "px",
          }}
        >
          {concert[0].city}
        </p>
        <label> Location:</label>
        <p
          style={{
            color: "#fff",
            marginLeft: 50 + "px",
            marginTop: 10 + "px",
            marginBottom: 20 + "px",
          }}
        >
          {concert[0].location}
        </p>
        <label htmlFor=""> Choose a date: </label>
        <select
          id="select"
          name="date"
          onChange={(e) => {
            const { value } = e.target;
            setReservationData((oldValue) => {
              return { ...oldValue, date: value };
            });
          }}
        >
          {concert[0].date.map((singleDate) => (
            <option value={singleDate} key={singleDate}>
              {singleDate}
            </option>
          ))}
        </select>{" "}
        <br />
        <br />
        <p style={{ marginBottom: 10 + "px" }}> Additional informations:</p>
        <p
          style={{
            color: "#fff",
            marginLeft: 50 + "px",
            marginTop: 10 + "px",
            marginBottom: 20 + "px",
          }}
        >
          {concert[0].info}
        </p>
      </div>
      <button
        className="btn"
        onClick={() => {
          navigate(`/reservation`);
        }}
      >
        {" "}
        RESERVATION{" "}
      </button>{" "}
      <br />
      <button
        className="btn"
        onClick={() => {
          navigate("/changeReservation");
        }}
      >
        {" "}
        CHANGE YOUR RESERVATION{" "}
      </button>{" "}
      <br />
      <button
        className="btn"
        onClick={() => {
          navigate("/cancelReservation");
        }}
      >
        {" "}
        CANCEL YOUR RESERVATION{" "}
      </button>
    </div>
  );
}

export default ConcertCard;
