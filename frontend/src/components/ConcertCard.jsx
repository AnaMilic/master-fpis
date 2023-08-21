import React from 'react'
import ReservationForm from './ReservationForm'

import { useNavigate  } from "react-router-dom";

function ConcertCard() {
  const navigate = useNavigate();

  return (
    <div className="card">
        <img className="card-img" src="https://cdn.sortiraparis.com/images/80/1665/764991-eros-ramazzotti-en-concert-a-l-accor-arena-de-paris-en-fevrier-2023.jpg" height="370" width="550" alt="eros concert" />
        <div className="card-body">
            <h3 className="card-title"> Eros Ramazzotti - Battito Infinito World Tour </h3>
            <p> City: </p>
            <p> Location: </p>
            <label htmlFor="" > Choose a date: </label>
            <select id="select" name="" >
                <option value="volvo">25.10.2023.</option>
                <option value="saab">26.10.2023.</option>
                <option value="fiat">28.10.2023.</option>
                <option value="audi">30.10.2023.</option>
                
            </select> <br /><br />
            <label htmlFor="" > Choose a zone: </label>
            <select id="select" name="" >
                <option value="saab">STANDARD - 1500 din</option>
                <option value="fiat">VIP - 3000 din</option>
                <option value="audi">PREMIUM - 4000 din</option>
                
            </select>
            <p> Additional informations: </p>
        </div>
        
        <button className="btn" onClick={() => {
          navigate("/reservation")
        }} > RESERVATION </button> <br />
        
        <button className="btn" onClick={() => {
          navigate("/changeReservation")
        }} > CHANGE YOUR RESERVATION </button> <br />
        
        <button className="btn" onClick={() => {
          navigate("/cancelReservation")
        }} > CANCEL YOUR RESERVATION </button>
        
        
        
        
        
    </div>

    
  )
}

export default ConcertCard