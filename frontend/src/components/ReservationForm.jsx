import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReservationForm({ reservationData }) {
  const navigate = useNavigate();

  console.log(reservationData);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setComapny] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [token, setToken] = useState(null);
  const [promoCode, setPromoCode] = useState(null);

  const [seatingZone, setSeatingZone] = useState([]);
  const [selectedSeatingZone, setSelectedSeatingZone] = useState(null);

  const [numberTickets, setNumberTickets] = useState("");

  const url = "http://localhost:5050/api/seatingZones";
  const fetchInfo = () => {
    return axios.get(url).then((response) => setSeatingZone(response.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (seatingZone.length === 0) {
    return null;
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const requestBody = JSON.stringify({
        customer: {
          name,
          lastName,
          company,
          address1,
          address2,
          postNumber,
          city,
          country,
          email,
          emailConfirm,
        },
        reservation: {
          seatingZone: selectedSeatingZone ?? seatingZone[0]._id,
          numberTickets,
          date: reservationData.date,
        },
      });

      if (!requestBody) {
        return;
      }
      let res = await fetch("http://localhost:5050/api/reservations", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const formattedResponse = await res.json();

      console.log(formattedResponse);

      if (res.status === 200) {
        setName("");
        setLastName("");
        setComapny("");
        setAddress1("");
        setAddress2("");
        setPostNumber("");
        setCity("");
        setCountry("");
        setEmail("");
        setEmailConfirm("");

        setSelectedSeatingZone("");
        setNumberTickets("");
        setToken(formattedResponse.token.token);
        setPromoCode(formattedResponse.code.code);
        alert(
          `Reservation is successfull, your token: ${formattedResponse.token.token}, your promo code: ${formattedResponse.code.code}`
        );
      } else {
        alert("Reservation failed");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form action="" method="" id="" onSubmit={handleSubmit}>
            <p
              style={{
                marginLeft: 50 + "px",
                marginRight: 50 + "px",
                fontSize: 25 + "px",
              }}
            >
              {" "}
              Enter your informations to make a reservation. Field with * is
              required!
            </p>
            <div className="field">
              <label htmlFor="name"> Name*: </label> <br />
              <input
                type="text"
                id="name"
                value={name}
                name="name"
                placeholder="Enter your name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="surname"> Surname*: </label> <br />
              <input
                type="text"
                id="surname"
                value={lastName}
                name="surname"
                placeholder="Enter your surname"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="company"> Company: </label> <br />
              <input
                type="text"
                id="company"
                value={company}
                name="company"
                placeholder="Enter your company"
                onChange={(e) => setComapny(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="address1"> Address 1*: </label> <br />
              <input
                type="text"
                id="address1"
                value={address1}
                name="address1"
                placeholder="Enter your address"
                required
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="address2"> Address 2: </label> <br />
              <input
                type="text"
                id="address2"
                value={address2}
                name="address2"
                placeholder="Enter your second address"
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="postNumber"> Post number*: </label> <br />
              <input
                type="text"
                id="postNumber"
                value={postNumber}
                name="postNumber"
                placeholder="Enter post number"
                required
                onChange={(e) => setPostNumber(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="city"> City*: </label> <br />
              <input
                type="text"
                id="city"
                value={city}
                name="city"
                placeholder="Enter city"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="country"> Country*: </label> <br />
              <input
                type="country"
                id="country"
                value={country}
                name="country"
                placeholder="Enter country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email"> Email*: </label> <br />
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
              <label htmlFor="emailConf"> Email conformation*: </label> <br />
              <input
                type="email"
                id="email2"
                value={emailConfirm}
                name="email2"
                placeholder="Confirm your email"
                required
                onChange={(e) => setEmailConfirm(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor=""> Choose a zone: </label> <br />
              <br />
              <select
                id="select"
                name="zone"
                style={{ width: 340 + "px" }}
                onChange={(e) => setSelectedSeatingZone(e.target.value)}
              >
                <option value={seatingZone[0]._id}>
                  {seatingZone[0].name} - {seatingZone[0].price} din
                </option>
                <option value={seatingZone[1]._id}>
                  {seatingZone[1].name} - {seatingZone[1].price} din
                </option>
                <option value={seatingZone[2]._id}>
                  {seatingZone[2].name} - {seatingZone[2].price} din
                </option>
              </select>
            </div>

            <div className="field">
              <label> Number of tickets:</label>
              <input
                type="number"
                id="quantity"
                value={numberTickets}
                name="quantity"
                min="1"
                max="50"
                default="1"
                placeholder="Choose number of tickets"
                required
                onChange={(e) => setNumberTickets(e.target.value)}
              ></input>
            </div>

            <div className="field">
              <label htmlFor="codes"> Promo code: </label> <br />
              <input
                type="text"
                id="codes"
                name="codes"
                placeholder="Enter promo code"
              />
            </div>
            <button type="submit" className="btn">
              {" "}
              MAKE RESERVATION{" "}
            </button>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
