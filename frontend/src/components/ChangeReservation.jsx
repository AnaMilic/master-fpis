import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function ChangeReservation() {
  const navigate = useNavigate();

  const url = "http://localhost:5050/api/reservations";
  const [reservation, setReservation] = useState(null);
  const [numberTickets, setNumberTickets] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  //
  const [amount, setAmount] = useState("");

  const fetchInfo = () => {
    if (!email || !token) {
      alert("Email and token are mandatory.");
      return;
    }

    return axios
      .get(`http://localhost:5050/api/reservations/getByEmailAndToken`, {
        params: {
          email,
          token,
        },
      })
      .then((response) => {
        if (response.data[0] == null) {
          alert("Reservation does not exist");
        } else {
          setReservation(response.data[0]);
          setNumberTickets(response.data[0].numberTickets);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Reservation does not exist");
      });
  };

  const calculatePrice = () => {
    if (reservation == null) {
      return 0;
    }
    let amountNew = 0;
    for (let i = 1; i <= numberTickets; i++) {
      if (i % 5 === 0) {
        amountNew += reservation.seatingZoneId.price * 0.5;
      } else {
        amountNew += reservation.seatingZoneId.price;
      }
    }
    if (new Date() < new Date("2023.09.30.")) {
      amountNew = amountNew * 0.9;
    }

    if (reservation.promoCodeId) {
      amountNew = amountNew * 0.95;
    }

    return amountNew;
  };

  const updateOne = () => {
    return axios
      .patch(url, {
        reservation: {
          ...reservation,
          numberTickets,
          amount: calculatePrice(),
        },
      })
      .then((response) => {
        setReservation(response.data);
        alert("Successful change of reservation!");
      })
      .catch((error) => alert(`Change of reservation failed.`));
  };
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form
            action=""
            method=""
            id=""
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <p
              style={{
                marginLeft: 50 + "px",
                marginRight: 50 + "px",
                fontSize: 27 + "px",
              }}
            >
              {" "}
              Enter informations to find your reservation.{" "}
            </p>

            <div className="field">
              <label htmlFor="email"> Email: </label> <br />
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="token"> Token: </label> <br />
              <input
                type="text"
                id="token"
                name="token"
                placeholder="Enter your token"
                required
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn"
              onClick={() => {
                fetchInfo();
              }}
            >
              FIND RESERVATION
            </button>
          </form>
          {reservation != null && (
            <div id="infos" style={{ marginLeft: "10px" }}>
              <label>Seating zone: </label>
              <p
                style={{
                  color: "white",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                {reservation.seatingZoneId.name}
              </p>
              <br />
              <label>Date:</label>
              <p
                style={{
                  color: "white",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                {dayjs(reservation.date).format("DD.MM.YYYY.")}
              </p>
              <br />
              <label htmlFor="numberOfTickets">Number of tickets:</label>
              <br />
              <input
                value={numberTickets}
                id="numberOfTickets"
                type="number"
                min="1"
                max="50"
                default="1"
                onChange={(e) => setNumberTickets(e.target.value)}
                style={{
                  marginBottom: "25px",
                  marginTop: "10px",
                  width: "160px",
                  height: "20px",
                }}
              ></input>
              <br />
              <label>Amount:</label>
              <br />
              <input
                value={calculatePrice()}
                id="amount"
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  marginBottom: "25px",
                  marginTop: "10px",
                  width: "160px",
                  height: "20px",
                }}
                disabled={true}
              ></input>
              <br />
              <button
                type="submit"
                className="btn"
                style={{ height: "35px", width: "200px", marginLeft: "0px" }}
                onClick={() => {
                  updateOne();
                }}
              >
                UPDATE RESERVATION
              </button>
            </div>
          )}
          <button
            className="btn"
            style={{ backgroundColor: "#79c2d0" }}
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            BACK TO HOME PAGE{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeReservation;
