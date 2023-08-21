import React from 'react'
import { useNavigate  } from "react-router-dom";

function ChangeReservation() {
    const navigate = useNavigate();
  return (
    <div>

        ChangeReservation

        <br /><button onClick={() => {
          navigate("/")
        }}> nazad </button>

    </div>
  )
}

export default ChangeReservation