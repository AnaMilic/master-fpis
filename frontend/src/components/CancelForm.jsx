import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CancelForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

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
              Enter informations to cancel your reservation.{" "}
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
                value={token}
                name="token"
                placeholder="Enter your token"
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn"
              onClick={(e) => {
                //e.preventDefault();
                e.stopPropagation();
                axios
                  .delete("http://localhost:5050/api/reservations", {
                    params: { email, token },
                  })
                  .then((response) => {
                    setStatus("Delete successful");
                    setEmail("");
                    setToken("");
                    alert("Reservation canceled");
                  })
                  .catch((error) => {
                    alert(
                      "There was an error! Reservation does not exist. Check your email and token.",
                      error
                    );
                  });
              }}
            >
              {" "}
              CANCEL RESERVATION{" "}
            </button>
          </form>
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

export default CancelForm;
